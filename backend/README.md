# TruEstate Backend

## Overview
Backend API for the Retail Sales Management System. Provides RESTful endpoints for searching, filtering, sorting, and paginating sales transaction data.

## Tech Stack
- Node.js
- Express.js
- csv-parser

## Setup Instructions

1. Install dependencies:
```bash
npm install
```

2. Ensure the CSV dataset file (`truestate_assignment_dataset.csv`) is in the root directory (one level up from backend).

3. Start the server:
```bash
npm start
```

For development with auto-reload:
```bash
npm run dev
```

The server will run on `http://localhost:5000`

## API Endpoints

### GET /api/sales
Get paginated sales data with search, filters, sorting, and pagination.

**Query Parameters:**
- `search` (string): Search query for customer name or phone number
- `sortBy` (string): Sort field - 'date', 'quantity', or 'customerName'
- `sortOrder` (string): 'asc' or 'desc'
- `page` (number): Page number (default: 1)
- `pageSize` (number): Items per page (default: 10)
- `regions` (array): Filter by customer regions
- `genders` (array): Filter by gender
- `categories` (array): Filter by product categories
- `tags` (array): Filter by product tags
- `paymentMethods` (array): Filter by payment methods
- `ageMin` (number): Minimum age
- `ageMax` (number): Maximum age
- `dateStart` (string): Start date (YYYY-MM-DD)
- `dateEnd` (string): End date (YYYY-MM-DD)

### GET /api/sales/filters
Get all available filter options (regions, genders, categories, tags, payment methods, age range, date range).

