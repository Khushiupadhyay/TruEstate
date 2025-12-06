import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, decimal, date, serial, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export const transactions = pgTable("transactions", {
  id: serial("id").primaryKey(),
  transactionId: text("transaction_id").notNull(),
  date: date("date").notNull(),
  customerId: text("customer_id").notNull(),
  customerName: text("customer_name").notNull(),
  phoneNumber: text("phone_number").notNull(),
  gender: text("gender").notNull(),
  age: integer("age").notNull(),
  region: text("region").notNull(),
  customerType: text("customer_type"),
  productId: text("product_id"),
  productName: text("product_name").notNull(),
  brand: text("brand"),
  productCategory: text("product_category").notNull(),
  tags: text("tags").array(),
  quantity: integer("quantity").notNull(),
  pricePerUnit: decimal("price_per_unit", { precision: 10, scale: 2 }).notNull(),
  discountPercentage: decimal("discount_percentage", { precision: 5, scale: 2 }),
  totalAmount: decimal("total_amount", { precision: 10, scale: 2 }).notNull(),
  finalAmount: decimal("final_amount", { precision: 10, scale: 2 }).notNull(),
  paymentMethod: text("payment_method").notNull(),
  orderStatus: text("order_status").notNull(),
  deliveryType: text("delivery_type"),
  storeId: text("store_id"),
  storeLocation: text("store_location"),
  salespersonId: text("salesperson_id"),
  employeeName: text("employee_name"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertTransactionSchema = createInsertSchema(transactions).omit({
  id: true,
  createdAt: true,
});

export type InsertTransaction = z.infer<typeof insertTransactionSchema>;
export type Transaction = typeof transactions.$inferSelect;

export interface TransactionFilters {
  search?: string;
  region?: string;
  gender?: string;
  ageMin?: number;
  ageMax?: number;
  productCategory?: string;
  tags?: string[];
  paymentMethod?: string;
  dateFrom?: string;
  dateTo?: string;
  sortBy?: "date" | "customerName" | "quantity" | "totalAmount";
  sortOrder?: "asc" | "desc";
  page?: number;
  limit?: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
