import { db } from "./db";
import { transactions } from "@shared/schema";
import { format, subDays } from "date-fns";

const REGIONS = ["North", "South", "East", "West", "Central"];
const CATEGORIES = ["Clothing", "Electronics", "Home & Decor", "Beauty", "Footwear"];
const PAYMENT_METHODS = ["Credit Card", "Debit Card", "UPI", "Cash"];
const ORDER_STATUSES = ["Completed", "Pending", "Cancelled"];
const TAGS = ["Premium", "Sale", "New Arrival", "Bulk", "Gift"];
const NAMES = [
  "Neha Yadav", "Aditya Rajput", "Avan Singh", "Rahul Sharma", "Priya Patel", 
  "Amit Kumar", "Sneha Gupta", "Vikram Malhotra", "Anjali Verma", "Rohan Das",
  "Kavya Reddy", "Arjun Nair", "Ishita Mehta", "Karan Singh", "Diya Kapoor"
];

const PRODUCTS = [
  { name: "Cotton T-Shirt", brand: "Zara", category: "Clothing" },
  { name: "Wireless Earbuds", brand: "Sony", category: "Electronics" },
  { name: "LED Table Lamp", brand: "Philips", category: "Home & Decor" },
  { name: "Face Cream", brand: "Lakme", category: "Beauty" },
  { name: "Running Shoes", brand: "Nike", category: "Footwear" },
  { name: "Denim Jeans", brand: "Levis", category: "Clothing" },
  { name: "Smart Watch", brand: "Apple", category: "Electronics" },
  { name: "Wall Clock", brand: "Seiko", category: "Home & Decor" },
  { name: "Lipstick", brand: "Maybelline", category: "Beauty" },
  { name: "Casual Sneakers", brand: "Puma", category: "Footwear" },
];

function generateTransactionData(count: number) {
  const data = [];
  
  for (let i = 0; i < count; i++) {
    const product = PRODUCTS[Math.floor(Math.random() * PRODUCTS.length)];
    const quantity = Math.floor(Math.random() * 5) + 1;
    const pricePerUnit = (Math.floor(Math.random() * 5000) + 500).toString();
    const discountPercentage = (Math.random() * 20).toFixed(2);
    const totalAmount = (parseFloat(pricePerUnit) * quantity).toFixed(2);
    const discountAmount = (parseFloat(totalAmount) * parseFloat(discountPercentage) / 100).toFixed(2);
    const finalAmount = (parseFloat(totalAmount) - parseFloat(discountAmount)).toFixed(2);
    
    data.push({
      transactionId: `TXN${Math.floor(10000000 + Math.random() * 90000000)}`,
      date: format(subDays(new Date(), Math.floor(Math.random() * 90)), 'yyyy-MM-dd'),
      customerId: `CUST${Math.floor(1000 + Math.random() * 9000)}`,
      customerName: NAMES[Math.floor(Math.random() * NAMES.length)],
      phoneNumber: `+91 ${Math.floor(7000000000 + Math.random() * 2999999999)}`,
      gender: Math.random() > 0.5 ? "Female" : "Male",
      age: Math.floor(Math.random() * 50) + 18,
      region: REGIONS[Math.floor(Math.random() * REGIONS.length)],
      customerType: Math.random() > 0.3 ? "Regular" : "Premium",
      productId: `PROD${Math.floor(1000 + Math.random() * 9000)}`,
      productName: product.name,
      brand: product.brand,
      productCategory: product.category,
      tags: [TAGS[Math.floor(Math.random() * TAGS.length)]],
      quantity,
      pricePerUnit,
      discountPercentage,
      totalAmount,
      finalAmount,
      paymentMethod: PAYMENT_METHODS[Math.floor(Math.random() * PAYMENT_METHODS.length)],
      orderStatus: ORDER_STATUSES[Math.floor(Math.random() * ORDER_STATUSES.length)],
      deliveryType: Math.random() > 0.5 ? "Home Delivery" : "Store Pickup",
      storeId: `STORE${Math.floor(100 + Math.random() * 900)}`,
      storeLocation: `${REGIONS[Math.floor(Math.random() * REGIONS.length)]} Branch`,
      salespersonId: `EMP${Math.floor(100 + Math.random() * 900)}`,
      employeeName: NAMES[Math.floor(Math.random() * NAMES.length)],
    });
  }
  
  return data;
}

async function seed() {
  console.log("Seeding database...");
  
  const existingCount = await db.select().from(transactions);
  if (existingCount.length > 0) {
    console.log(`Database already has ${existingCount.length} transactions. Skipping seed.`);
    return;
  }
  
  const seedData = generateTransactionData(150);
  
  console.log(`Inserting ${seedData.length} transactions...`);
  await db.insert(transactions).values(seedData);
  
  console.log("Database seeded successfully!");
}

seed()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("Error seeding database:", error);
    process.exit(1);
  });
