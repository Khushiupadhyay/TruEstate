# Quick Start Guide

## Prerequisites
- Node.js v16 or higher
- npm or yarn

## Installation

1. **Install Backend Dependencies**
   ```bash
   cd backend
   npm install
   ```

2. **Install Frontend Dependencies**
   ```bash
   cd ../frontend
   npm install
   ```

   Or install all at once from root:
   ```bash
   npm run install:all
   ```

## Running the Application

### Option 1: Run Separately

**Terminal 1 - Backend:**
```bash
cd backend
npm start
```
Backend will run on `http://localhost:5000`

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```
Frontend will run on `http://localhost:3000`

### Option 2: Run Together (if concurrently is installed)
```bash
npm run dev
```

## Verify Installation

1. Backend health check: Visit `http://localhost:5000/api/health`
2. Frontend: Visit `http://localhost:3000`
3. You should see the TruEstate dashboard with filters and search

## Troubleshooting

### CSV File Not Found
- Ensure `truestate_assignment_dataset.csv` is in the root directory (same level as `backend` and `frontend` folders)

### Port Already in Use
- Backend: Change port in `backend/src/index.js` (default: 5000)
- Frontend: Change port in `frontend/vite.config.js` (default: 3000)

### CORS Errors
- Ensure backend is running before frontend
- Check that backend CORS is enabled (already configured)

## Production Build

```bash
cd frontend
npm run build
```

The production build will be in `frontend/dist/`

