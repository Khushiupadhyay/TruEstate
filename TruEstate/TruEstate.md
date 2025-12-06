# Vault - Retail Sales Management System

## Overview

Vault is a full-stack retail sales management system built to handle advanced search, filtering, sorting, and pagination of sales transactions. The application provides a comprehensive dashboard for viewing and analyzing retail sales data with support for multiple filters including customer demographics, product categories, payment methods, and date ranges.

The system is designed as a modern web application with a React-based frontend and an Express.js backend, utilizing PostgreSQL for data persistence through Drizzle ORM.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework & Build System**
- **React 18** with TypeScript for type-safe component development
- **Vite** as the build tool and development server, providing fast HMR and optimized production builds
- **Wouter** for lightweight client-side routing
- **TanStack Query (React Query)** for server state management, caching, and data synchronization

**UI Component System**
- **Shadcn/ui** component library built on Radix UI primitives for accessible, customizable components
- **Tailwind CSS** with custom configuration for styling, utilizing the "new-york" design style
- **Custom CSS variables** for theming with support for light/dark modes
- Font stack: Plus Jakarta Sans and Inter for typography

**State Management Approach**
- Server state managed via React Query with custom query client configuration
- Local component state using React hooks (useState, useMemo)
- Form state handled through React Hook Form with Zod validation

**Key Design Decisions**
- Path aliases (@/, @shared/, @assets/) for clean imports across the codebase
- Component-based architecture with separation of concerns (layout, sales features, UI primitives)
- Responsive design with mobile-first approach

### Backend Architecture

**Server Framework**
- **Express.js** as the HTTP server framework
- **Node.js** runtime with ES modules support
- Custom middleware for request logging and error handling

**API Design**
- RESTful API endpoints under `/api` prefix
- Transaction endpoints support comprehensive filtering via query parameters:
  - Text search (customer name, phone number)
  - Demographic filters (region, gender, age range)
  - Product filters (category, tags)
  - Operational filters (payment method, date range)
  - Sorting and pagination
- Response format includes pagination metadata (total count, page info)

**Database Layer**
- **Drizzle ORM** for type-safe database queries and schema management
- Schema-first approach with automatic TypeScript type inference
- Query builder using Drizzle's chainable API with operators (eq, ilike, gte, lte, arrayContains)
- Database migrations managed through drizzle-kit

**Build & Deployment Strategy**
- Separate build processes for client (Vite) and server (esbuild)
- Client builds to `dist/public` for static file serving
- Server bundles dependencies (allowlist-based) to reduce cold start times
- Production mode serves pre-built static files with fallback to index.html

**Development Environment**
- Vite middleware integration for HMR during development
- Separate development ports (5000 for client, backend serves API)
- Replit-specific plugins for development experience (cartographer, dev banner, error overlay)

### Data Model

**Transaction Entity**
The core data model centers around transactions with comprehensive fields:
- Customer information (ID, name, phone, demographics)
- Product details (ID, name, brand, category, tags)
- Sales data (quantity, pricing, discounts, amounts)
- Operational data (payment method, order status, delivery type, store/employee info)
- Timestamps for record creation

**Schema Design Choices**
- Serial primary key for database-managed IDs
- Separate transaction ID field for business logic
- Decimal types for monetary values (precision 10, scale 2)
- Array type for tags to support multiple product classifications
- Text fields with appropriate constraints for categorical data

### External Dependencies

**Database**
- **PostgreSQL 16** as the relational database
- Connection via `pg` driver with connection pooling
- Database provisioning required via `DATABASE_URL` environment variable

**UI Libraries**
- **Radix UI** suite for headless, accessible UI primitives (accordion, dialog, dropdown, select, etc.)
- **Lucide React** for icon system
- **date-fns** for date manipulation and formatting
- **class-variance-authority** and **clsx** for conditional styling

**Validation & Type Safety**
- **Zod** for runtime schema validation
- **drizzle-zod** for automatic schema-to-Zod conversions
- **TypeScript** for compile-time type checking

**Development Tools**
- **tsx** for TypeScript execution in development
- **Replit plugins** for enhanced development experience (vite-plugin-runtime-error-modal, vite-plugin-cartographer, vite-plugin-dev-banner)
- Custom meta images plugin for OpenGraph image handling

**Session Management**
- **express-session** with PostgreSQL store (connect-pg-simple) for persistent sessions
- User authentication schema defined but authentication routes not fully implemented

**Production Considerations**
- Environment-based configuration (NODE_ENV)
- Autoscale deployment target on Replit
- Port configuration (5000 internal, 80 external)
- Static file serving with SPA fallback routing