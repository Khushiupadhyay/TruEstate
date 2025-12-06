import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertTransactionSchema, type TransactionFilters } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  
  app.get("/api/transactions", async (req, res) => {
    try {
      const filters: TransactionFilters = {
        search: req.query.search as string,
        region: req.query.region as string,
        gender: req.query.gender as string,
        ageMin: req.query.ageMin ? parseInt(req.query.ageMin as string) : undefined,
        ageMax: req.query.ageMax ? parseInt(req.query.ageMax as string) : undefined,
        productCategory: req.query.productCategory as string,
        paymentMethod: req.query.paymentMethod as string,
        dateFrom: req.query.dateFrom as string,
        dateTo: req.query.dateTo as string,
        tags: req.query.tags ? (Array.isArray(req.query.tags) ? req.query.tags as string[] : [req.query.tags as string]) : undefined,
        sortBy: req.query.sortBy as "date" | "customerName" | "quantity" | "totalAmount" | undefined,
        sortOrder: req.query.sortOrder as "asc" | "desc" | undefined,
        page: req.query.page ? parseInt(req.query.page as string) : 1,
        limit: req.query.limit ? parseInt(req.query.limit as string) : 10,
      };

      const result = await storage.getTransactions(filters);
      res.json(result);
    } catch (error) {
      console.error("Error fetching transactions:", error);
      res.status(500).json({ error: "Failed to fetch transactions" });
    }
  });

  app.get("/api/transactions/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const transaction = await storage.getTransaction(id);
      
      if (!transaction) {
        return res.status(404).json({ error: "Transaction not found" });
      }
      
      res.json(transaction);
    } catch (error) {
      console.error("Error fetching transaction:", error);
      res.status(500).json({ error: "Failed to fetch transaction" });
    }
  });

  app.post("/api/transactions", async (req, res) => {
    try {
      const validatedData = insertTransactionSchema.parse(req.body);
      const transaction = await storage.createTransaction(validatedData);
      res.status(201).json(transaction);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Invalid transaction data", details: error.errors });
      }
      console.error("Error creating transaction:", error);
      res.status(500).json({ error: "Failed to create transaction" });
    }
  });

  app.post("/api/transactions/bulk", async (req, res) => {
    try {
      const transactions = z.array(insertTransactionSchema).parse(req.body);
      const createdTransactions = await storage.createTransactionsBulk(transactions);
      res.status(201).json(createdTransactions);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Invalid transaction data", details: error.errors });
      }
      console.error("Error creating transactions:", error);
      res.status(500).json({ error: "Failed to create transactions" });
    }
  });

  app.delete("/api/transactions", async (req, res) => {
    try {
      await storage.deleteAllTransactions();
      res.status(204).send();
    } catch (error) {
      console.error("Error deleting transactions:", error);
      res.status(500).json({ error: "Failed to delete transactions" });
    }
  });

  app.get("/api/stats", async (req, res) => {
    try {
      const filters: TransactionFilters = {
        search: req.query.search as string,
        region: req.query.region as string,
        gender: req.query.gender as string,
        ageMin: req.query.ageMin ? parseInt(req.query.ageMin as string) : undefined,
        ageMax: req.query.ageMax ? parseInt(req.query.ageMax as string) : undefined,
        productCategory: req.query.productCategory as string,
        paymentMethod: req.query.paymentMethod as string,
        dateFrom: req.query.dateFrom as string,
        dateTo: req.query.dateTo as string,
        tags: req.query.tags ? (Array.isArray(req.query.tags) ? req.query.tags as string[] : [req.query.tags as string]) : undefined,
      };

      const result = await storage.getTransactions({ ...filters, page: 1, limit: 100000 });
      
      const stats = {
        totalUnits: result.data.reduce((acc, t) => acc + (t.quantity || 0), 0),
        totalAmount: result.data.reduce((acc, t) => acc + parseFloat(t.totalAmount as string || "0"), 0),
        totalDiscount: result.data.reduce((acc, t) => {
          const total = parseFloat(t.totalAmount as string || "0");
          const final = parseFloat(t.finalAmount as string || "0");
          return acc + (total - final);
        }, 0),
        transactionCount: result.total,
      };

      res.json(stats);
    } catch (error) {
      console.error("Error calculating stats:", error);
      res.status(500).json({ error: "Failed to calculate stats" });
    }
  });

  return httpServer;
}
