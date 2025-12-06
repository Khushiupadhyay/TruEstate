import { Transaction, TransactionFilters, PaginatedResponse } from "@shared/schema";

export interface Stats {
  totalUnits: number;
  totalAmount: number;
  totalDiscount: number;
  transactionCount: number;
}

export async function fetchTransactions(
  filters: TransactionFilters
): Promise<PaginatedResponse<Transaction>> {
  const params = new URLSearchParams();
  
  if (filters.search) params.append("search", filters.search);
  if (filters.region) params.append("region", filters.region);
  if (filters.gender) params.append("gender", filters.gender);
  if (filters.ageMin !== undefined) params.append("ageMin", filters.ageMin.toString());
  if (filters.ageMax !== undefined) params.append("ageMax", filters.ageMax.toString());
  if (filters.productCategory) params.append("productCategory", filters.productCategory);
  if (filters.paymentMethod) params.append("paymentMethod", filters.paymentMethod);
  if (filters.dateFrom) params.append("dateFrom", filters.dateFrom);
  if (filters.dateTo) params.append("dateTo", filters.dateTo);
  if (filters.tags && filters.tags.length > 0) {
    filters.tags.forEach(tag => params.append("tags", tag));
  }
  if (filters.sortBy) params.append("sortBy", filters.sortBy);
  if (filters.sortOrder) params.append("sortOrder", filters.sortOrder);
  if (filters.page) params.append("page", filters.page.toString());
  if (filters.limit) params.append("limit", filters.limit.toString());

  const response = await fetch(`/api/transactions?${params.toString()}`);
  
  if (!response.ok) {
    throw new Error("Failed to fetch transactions");
  }
  
  return response.json();
}

export async function fetchStats(filters: Omit<TransactionFilters, "page" | "limit" | "sortBy" | "sortOrder">): Promise<Stats> {
  const params = new URLSearchParams();
  
  if (filters.search) params.append("search", filters.search);
  if (filters.region) params.append("region", filters.region);
  if (filters.gender) params.append("gender", filters.gender);
  if (filters.ageMin !== undefined) params.append("ageMin", filters.ageMin.toString());
  if (filters.ageMax !== undefined) params.append("ageMax", filters.ageMax.toString());
  if (filters.productCategory) params.append("productCategory", filters.productCategory);
  if (filters.paymentMethod) params.append("paymentMethod", filters.paymentMethod);
  if (filters.dateFrom) params.append("dateFrom", filters.dateFrom);
  if (filters.dateTo) params.append("dateTo", filters.dateTo);
  if (filters.tags && filters.tags.length > 0) {
    filters.tags.forEach(tag => params.append("tags", tag));
  }

  const response = await fetch(`/api/stats?${params.toString()}`);
  
  if (!response.ok) {
    throw new Error("Failed to fetch stats");
  }
  
  return response.json();
}

export async function createTransaction(transaction: Omit<Transaction, "id" | "createdAt">): Promise<Transaction> {
  const response = await fetch("/api/transactions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(transaction),
  });
  
  if (!response.ok) {
    throw new Error("Failed to create transaction");
  }
  
  return response.json();
}

export async function bulkCreateTransactions(transactions: Omit<Transaction, "id" | "createdAt">[]): Promise<Transaction[]> {
  const response = await fetch("/api/transactions/bulk", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(transactions),
  });
  
  if (!response.ok) {
    throw new Error("Failed to create transactions");
  }
  
  return response.json();
}

export async function deleteAllTransactions(): Promise<void> {
  const response = await fetch("/api/transactions", {
    method: "DELETE",
  });
  
  if (!response.ok) {
    throw new Error("Failed to delete transactions");
  }
}
