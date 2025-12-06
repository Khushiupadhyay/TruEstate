import { addDays, subDays, format } from "date-fns";

// Types based on requirements
export interface Transaction {
  id: string;
  date: string;
  customerId: string;
  customerName: string;
  phoneNumber: string;
  gender: "Male" | "Female" | "Other";
  age: number;
  region: string;
  productCategory: string;
  productName: string;
  tags: string[];
  quantity: number;
  pricePerUnit: number;
  discount: number;
  totalAmount: number;
  paymentMethod: "Credit Card" | "Debit Card" | "UPI" | "Cash";
  status: "Completed" | "Pending" | "Cancelled";
}

// Constants for generation
const REGIONS = ["North", "South", "East", "West", "Central"];
const CATEGORIES = ["Clothing", "Electronics", "Home & Decor", "Beauty", "Footwear"];
const PAYMENT_METHODS = ["Credit Card", "Debit Card", "UPI", "Cash"];
const TAGS = ["Premium", "Sale", "New Arrival", "Bulk", "Gift"];
const NAMES = [
  "Neha Yadav", "Aditya Rajput", "Avan Singh", "Rahul Sharma", "Priya Patel", 
  "Amit Kumar", "Sneha Gupta", "Vikram Malhotra", "Anjali Verma", "Rohan Das"
];

// Helper to generate random data
const generateData = (count: number): Transaction[] => {
  const data: Transaction[] = [];
  
  for (let i = 0; i < count; i++) {
    const price = Math.floor(Math.random() * 5000) + 500;
    const qty = Math.floor(Math.random() * 5) + 1;
    const discount = Math.floor(Math.random() * 500);
    
    data.push({
      id: Math.floor(1000000 + Math.random() * 9000000).toString(),
      date: format(subDays(new Date(), Math.floor(Math.random() * 30)), 'yyyy-MM-dd'),
      customerId: `CUST${Math.floor(1000 + Math.random() * 9000)}`,
      customerName: NAMES[Math.floor(Math.random() * NAMES.length)],
      phoneNumber: `+91 ${Math.floor(7000000000 + Math.random() * 2999999999)}`,
      gender: Math.random() > 0.5 ? "Female" : "Male",
      age: Math.floor(Math.random() * 40) + 18,
      region: REGIONS[Math.floor(Math.random() * REGIONS.length)],
      productCategory: CATEGORIES[Math.floor(Math.random() * CATEGORIES.length)],
      productName: `Product ${i}`,
      tags: [TAGS[Math.floor(Math.random() * TAGS.length)]],
      quantity: qty,
      pricePerUnit: price,
      discount: discount,
      totalAmount: (price * qty) - discount,
      paymentMethod: PAYMENT_METHODS[Math.floor(Math.random() * PAYMENT_METHODS.length)] as any,
      status: "Completed"
    });
  }
  
  return data.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};

// Export static mock data
export const MOCK_TRANSACTIONS = generateData(100);

// Stats calculation helper
export const calculateStats = (transactions: Transaction[]) => {
  return {
    totalUnits: transactions.reduce((acc, curr) => acc + curr.quantity, 0),
    totalAmount: transactions.reduce((acc, curr) => acc + curr.totalAmount, 0),
    totalDiscount: transactions.reduce((acc, curr) => acc + curr.discount, 0),
    transactionCount: transactions.length
  };
};
