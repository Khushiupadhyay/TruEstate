import { type User, type InsertUser, type Transaction, type InsertTransaction, type TransactionFilters, type PaginatedResponse } from "@shared/schema";
import { randomUUID } from "crypto";
import { db } from "./db";
import { eq, and, or, gte, lte, ilike, sql, desc, asc, arrayContains } from "drizzle-orm";
import { users, transactions } from "@shared/schema";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  getTransactions(filters: TransactionFilters): Promise<PaginatedResponse<Transaction>>;
  getTransaction(id: number): Promise<Transaction | undefined>;
  createTransaction(transaction: InsertTransaction): Promise<Transaction>;
  createTransactionsBulk(transactions: InsertTransaction[]): Promise<Transaction[]>;
  deleteAllTransactions(): Promise<void>;
}

export class DatabaseStorage implements IStorage {
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }

  async getTransactions(filters: TransactionFilters): Promise<PaginatedResponse<Transaction>> {
    const page = filters.page || 1;
    const limit = filters.limit || 10;
    const offset = (page - 1) * limit;

    const conditions = [];

    if (filters.search) {
      conditions.push(
        or(
          ilike(transactions.customerName, `%${filters.search}%`),
          ilike(transactions.phoneNumber, `%${filters.search}%`)
        )
      );
    }

    if (filters.region) {
      conditions.push(eq(transactions.region, filters.region));
    }

    if (filters.gender) {
      conditions.push(eq(transactions.gender, filters.gender));
    }

    if (filters.ageMin && filters.ageMax) {
      conditions.push(
        and(
          gte(transactions.age, filters.ageMin),
          lte(transactions.age, filters.ageMax)
        )
      );
    } else if (filters.ageMin) {
      conditions.push(gte(transactions.age, filters.ageMin));
    } else if (filters.ageMax) {
      conditions.push(lte(transactions.age, filters.ageMax));
    }

    if (filters.productCategory) {
      conditions.push(eq(transactions.productCategory, filters.productCategory));
    }

    if (filters.paymentMethod) {
      conditions.push(eq(transactions.paymentMethod, filters.paymentMethod));
    }

    if (filters.dateFrom) {
      conditions.push(gte(transactions.date, filters.dateFrom));
    }

    if (filters.dateTo) {
      conditions.push(lte(transactions.date, filters.dateTo));
    }

    if (filters.tags && filters.tags.length > 0) {
      conditions.push(arrayContains(transactions.tags, filters.tags));
    }

    const whereClause = conditions.length > 0 ? and(...conditions) : undefined;

    let orderBy;
    if (filters.sortBy) {
      const column = {
        date: transactions.date,
        customerName: transactions.customerName,
        quantity: transactions.quantity,
        totalAmount: transactions.totalAmount,
      }[filters.sortBy];

      orderBy = filters.sortOrder === "asc" ? asc(column) : desc(column);
    } else {
      orderBy = desc(transactions.date);
    }

    const [data, countResult] = await Promise.all([
      db
        .select()
        .from(transactions)
        .where(whereClause)
        .orderBy(orderBy)
        .limit(limit)
        .offset(offset),
      db
        .select({ count: sql<number>`count(*)::int` })
        .from(transactions)
        .where(whereClause),
    ]);

    const total = countResult[0]?.count || 0;
    const totalPages = Math.ceil(total / limit);

    return {
      data,
      total,
      page,
      limit,
      totalPages,
    };
  }

  async getTransaction(id: number): Promise<Transaction | undefined> {
    const [transaction] = await db.select().from(transactions).where(eq(transactions.id, id));
    return transaction || undefined;
  }

  async createTransaction(transaction: InsertTransaction): Promise<Transaction> {
    const [newTransaction] = await db
      .insert(transactions)
      .values(transaction)
      .returning();
    return newTransaction;
  }

  async createTransactionsBulk(transactionList: InsertTransaction[]): Promise<Transaction[]> {
    if (transactionList.length === 0) return [];
    
    const newTransactions = await db
      .insert(transactions)
      .values(transactionList)
      .returning();
    return newTransactions;
  }

  async deleteAllTransactions(): Promise<void> {
    await db.delete(transactions);
  }
}

export const storage = new DatabaseStorage();
