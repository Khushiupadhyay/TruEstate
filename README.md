# TruEstate - Retail Sales Management System

## Overview
A comprehensive Retail Sales Management System built with modern web technologies. The system provides advanced search, filtering, sorting, and pagination capabilities for managing large-scale sales transaction data. The application features a beautiful, responsive UI with smooth animations and an intuitive user experience.
<img width="1890" height="847" alt="image" src="https://github.com/user-attachments/assets/888b9acd-fd67-4c7d-9295-7a44a70d620f" />


## Tech Stack
- **Frontend**: React 18, Vite, Framer Motion (animations), Axios
- **Backend**: Node.js, Express.js, csv-parser
- **Styling**: CSS3 with custom properties and modern design patterns

## Search Implementation Summary
Full-text search is implemented across Customer Name and Phone Number fields. The search is case-insensitive and performs real-time filtering as the user types. The search functionality works seamlessly with filters, sorting, and pagination, maintaining state across all operations.

## Filter Implementation Summary
Multi-select filtering is implemented for Customer Region, Gender, Product Category, Tags, and Payment Method. Range-based filtering is available for Age and Date fields. All filters work independently and in combination, with a "Clear All" option to reset all active filters. Filter state is preserved during search, sorting, and pagination operations.

## Sorting Implementation Summary
Sorting is implemented for Date (newest first by default), Quantity, and Customer Name (A-Z). Users can toggle between ascending and descending order by clicking the same sort option. The sorting preserves active search queries and filter selections.

## Pagination Implementation Summary
Pagination is implemented with 10 items per page. The system includes Previous/Next navigation buttons and page number indicators. Pagination state is maintained across search, filter, and sort operations, automatically resetting to page 1 when filters or search change.

## Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Backend Setup
1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Ensure the CSV dataset file (`truestate_assignment_dataset.csv`) is in the root directory (one level up from backend).

4. Start the backend server:
```bash
npm start
```

The backend will run on `http://localhost:5000`

### Frontend Setup
1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The frontend will run on `http://localhost:3000`

### Production Build
To build the frontend for production:
```bash
cd frontend
npm run build
```

The built files will be in the `frontend/dist` directory.

## Project Structure
```
root/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── services/
│   │   ├── routes/
│   │   └── index.js
│   ├── package.json
│   └── README.md
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── services/
│   │   ├── styles/
│   │   └── App.jsx
│   ├── package.json
│   └── README.md
├── docs/
│   └── architecture.md
└── README.md
```

