# Vault - Retail Sales Management System

## Overview

Vault is a full-stack retail sales management system designed to handle advanced search, filtering, sorting, and pagination of sales transactions. The application provides a comprehensive dashboard for viewing and analyzing retail sales data. Built as a modern web application with a React-based frontend and Express.js backend, it uses PostgreSQL for data persistence through Drizzle ORM.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework & Build System**
- **React 18 with TypeScript** - Provides type-safe component development and modern React features
- **Vite** - Fast development server with hot module replacement (HMR) and optimized production builds
- **Wouter** - Lightweight client-side routing library (smaller alternative to React Router)

**UI & Styling**
- **Shadcn/ui Component Library** - Built on Radix UI primitives for accessible, customizable components
- **Tailwind CSS** - Utility-first CSS framework with custom configuration using "new-york" design style
- **Custom CSS Variables** - Theme system supporting light/dark modes
- **Typography** - Plus Jakarta Sans and Inter font stack

**State Management**
- **TanStack Query (React Query)** - Server state management with built-in caching, background refetching, and data synchronization
- **React Hooks** - Local component state using useState and useMemo
- **React Hook Form with Zod** - Form state management with schema validation

**Code Organization**
- Path aliases (@/, @shared/, @assets/) for clean imports
- Component-based architecture with clear separation: layout components, sales-specific features, and reusable UI primitives
- Responsive design with mobile-first approach

### Backend Architecture

**Server Framework**
- **Express.js** - Minimalist web framework for Node.js
- **Node.js with ES Modules** - Modern JavaScript module system
- **Custom Middleware** - Request logging and error handling

**API Design**
- **RESTful API** - All endpoints under `/api` prefix
- **Transaction Endpoints** - Support comprehensive filtering via query parameters including:
  - Text search (customer name, phone number)
  - Demographic filters (region, gender, age range)
  - Product filters (category, tags)
  - Payment method filtering
  - Date range filtering
  - Sorting (by date, customer name, quantity, total amount)
  - Pagination (page number and limit)

**Data Layer**
- **Drizzle ORM** - Type-safe ORM for PostgreSQL with schema-first approach
- **PostgreSQL** - Primary database for persistent storage
- **Schema Location** - Shared schema definitions in `/shared/schema.ts` for type consistency between frontend and backend
- **Database Operations** - Storage abstraction layer (`server/storage.ts`) implementing interface-based repository pattern

**Build System**
- **esbuild** - Fast JavaScript bundler for server code
- **Bundle Optimization** - Selective dependency bundling (allowlist) to reduce cold start times by minimizing file system operations
- **Production Build** - Compiles to single CommonJS file in `dist/index.cjs`

### Database Schema

**Users Table**
- Authentication and user management
- Fields: id (UUID), username, password

**Transactions Table**
- Comprehensive sales transaction records with 25+ fields including:
  - Transaction identification (id, transactionId, date)
  - Customer details (customerId, customerName, phoneNumber, gender, age, region, customerType)
  - Product information (productId, productName, brand, productCategory, tags array)
  - Sales data (quantity, pricePerUnit, discountPercentage, totalAmount, finalAmount)
  - Operational details (paymentMethod, orderStatus, deliveryType)
  - Store information (storeId, storeLocation, salespersonId, employeeName)
  - Metadata (createdAt timestamp)

**Data Seeding**
- Seed script (`server/seed.ts`) for generating sample transaction data
- Realistic data generation with predefined constants for regions, categories, payment methods, etc.

## External Dependencies

### Core Framework Dependencies
- **express** - Web application framework
- **drizzle-orm** - TypeScript ORM for PostgreSQL
- **pg** - PostgreSQL client for Node.js
- **zod** - Schema validation library
- **drizzle-zod** - Integration between Drizzle and Zod for schema validation

### Frontend Libraries
- **react** & **react-dom** - UI library
- **@tanstack/react-query** - Server state management
- **wouter** - Client-side routing
- **react-hook-form** - Form state management
- **@hookform/resolvers** - Validation resolver for React Hook Form
- **date-fns** - Date manipulation utilities

### UI Component Libraries (Radix UI)
- Extensive set of accessible headless components:
  - Dialog, Dropdown Menu, Popover, Select, Tooltip
  - Accordion, Tabs, Checkbox, Radio Group
  - Table, Card, Button, Input components
- **class-variance-authority** - Component variant utilities
- **clsx** & **tailwind-merge** - Utility for merging CSS classes

### Development Tools
- **vite** - Build tool and dev server
- **@vitejs/plugin-react** - React support for Vite
- **tsx** - TypeScript execution for Node.js
- **typescript** - Type checking
- **@tailwindcss/vite** - Tailwind integration for Vite

### Replit-Specific Integrations
- **@replit/vite-plugin-runtime-error-modal** - Error overlay for development
- **@replit/vite-plugin-cartographer** - Development navigation tool
- **@replit/vite-plugin-dev-banner** - Development environment banner

### Build & Deployment
- **drizzle-kit** - Database migrations and schema management
- **esbuild** - JavaScript bundler for server code
- **postcss** & **autoprefixer** - CSS processing

### Session Management
- **connect-pg-simple** - PostgreSQL session store for Express

### Additional Utilities
- **nanoid** - Unique ID generation
- **lucide-react** - Icon library
- **cmdk** - Command menu component
- **embla-carousel-react** - Carousel component