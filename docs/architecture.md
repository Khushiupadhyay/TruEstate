# Architecture Document

## Backend Architecture

### Overview
The backend is built using Node.js with Express.js framework, following a clean MVC-like architecture pattern with clear separation of concerns.

### Folder Structure
```
backend/
├── src/
│   ├── controllers/     # Request handlers
│   │   └── sales.controller.js
│   ├── services/        # Business logic
│   │   ├── data.service.js
│   │   └── sales.service.js
│   ├── routes/          # API route definitions
│   │   └── sales.routes.js
│   └── index.js         # Application entry point
└── package.json
```

### Module Responsibilities

#### Controllers (`controllers/sales.controller.js`)
- Handle HTTP requests and responses
- Parse query parameters and request body
- Call appropriate service methods
- Return formatted JSON responses
- Handle errors and return appropriate status codes

#### Services

**Data Service (`services/data.service.js`)**
- Loads and parses CSV data on application startup
- Caches parsed data in memory for performance
- Provides utility functions to extract filter options
- Handles data transformation and type conversion

**Sales Service (`services/sales.service.js`)**
- Implements core business logic for data operations
- Search functionality (case-insensitive text matching)
- Filter application (multi-select and range-based)
- Sorting algorithms (date, quantity, customer name)
- Pagination logic
- Combines all operations in the correct order

#### Routes (`routes/sales.routes.js`)
- Defines API endpoints
- Maps HTTP methods to controller functions
- `/api/sales` - GET endpoint for sales data
- `/api/sales/filters` - GET endpoint for filter options

#### Entry Point (`index.js`)
- Initializes Express application
- Configures middleware (CORS, JSON parsing)
- Registers routes
- Starts HTTP server

### Data Flow

1. **Request Flow**:
   ```
   Client Request → Express Router → Controller → Service → Data Processing → Response
   ```

2. **Search Flow**:
   - Query parameter parsed in controller
   - Passed to sales service
   - Applied to dataset (case-insensitive matching)
   - Results returned

3. **Filter Flow**:
   - Multiple filter parameters parsed
   - Each filter type applied sequentially
   - Results filtered progressively
   - Final filtered dataset returned

4. **Sort Flow**:
   - Sort field and order extracted
   - Dataset sorted using appropriate comparator
   - Sorted results returned

5. **Pagination Flow**:
   - Page number and size extracted
   - Data sliced based on pagination parameters
   - Pagination metadata calculated
   - Paginated results and metadata returned

### Performance Considerations
- CSV data loaded once and cached in memory
- Filtering and sorting performed in-memory for fast response times
- Efficient array operations using native JavaScript methods
- No database overhead for read operations

## Frontend Architecture

### Overview
The frontend is built using React 18 with Vite as the build tool. The application follows a component-based architecture with clear separation between UI components, business logic, and data fetching.

### Folder Structure
```
frontend/
├── src/
│   ├── components/      # React components
│   │   ├── SearchBar.jsx
│   │   ├── FilterPanel.jsx
│   │   ├── SalesTable.jsx
│   │   ├── SortDropdown.jsx
│   │   └── Pagination.jsx
│   ├── services/         # API communication
│   │   └── api.service.js
│   ├── styles/          # CSS stylesheets
│   │   ├── index.css
│   │   ├── App.css
│   │   └── [component].css
│   ├── App.jsx          # Main application component
│   └── main.jsx         # Application entry point
├── public/              # Static assets
└── package.json
```

### Component Responsibilities

#### App Component (`App.jsx`)
- Main application container
- Manages global state (search, filters, sort, pagination)
- Coordinates between components
- Handles data fetching and loading states
- Error handling

#### SearchBar Component
- Renders search input field
- Handles user input
- Debounced search updates
- Clear button functionality
- Visual feedback and animations

#### FilterPanel Component
- Displays all available filters
- Multi-select filter chips
- Range inputs for age and date
- Collapsible filter sections
- Clear all filters functionality
- Visual indicators for active filters

#### SalesTable Component
- Displays sales data in tabular format
- Formats currency, dates, and numbers
- Status badges with color coding
- Responsive table design
- Empty state handling
- Row animations

#### SortDropdown Component
- Dropdown menu for sort options
- Visual indication of current sort
- Toggle between ascending/descending
- Smooth animations

#### Pagination Component
- Page navigation controls
- Page number indicators
- Previous/Next buttons
- Pagination info display
- Responsive design

### Service Layer

#### API Service (`services/api.service.js`)
- Centralized API communication
- Axios instance configuration
- Query string building from filter objects
- Error handling and transformation
- Request/response interceptors (if needed)

### State Management

The application uses React's built-in state management:
- **Local State**: Component-specific state (e.g., dropdown open/close)
- **Lifted State**: Shared state in App component (filters, search, sort, pagination)
- **Derived State**: Computed values from props and state

### Data Flow

1. **Initial Load**:
   ```
   App mounts → Fetch filter options → Fetch sales data → Render components
   ```

2. **User Interaction Flow**:
   ```
   User Action → State Update → useEffect Trigger → API Call → State Update → Re-render
   ```

3. **Search Flow**:
   - User types in SearchBar
   - Search query state updated
   - useEffect triggers API call
   - Results filtered and displayed

4. **Filter Flow**:
   - User selects/deselects filter chips
   - Filter state updated
   - useEffect triggers API call with new filters
   - Results updated

5. **Sort Flow**:
   - User selects sort option
   - Sort state updated
   - useEffect triggers API call
   - Results sorted and displayed

6. **Pagination Flow**:
   - User clicks page number or navigation
   - Page state updated
   - useEffect triggers API call
   - New page of results displayed

### Styling Architecture

- **CSS Variables**: Centralized design tokens in `index.css`
- **Component Styles**: Separate CSS file for each component
- **Responsive Design**: Mobile-first approach with media queries
- **Animations**: Framer Motion for smooth transitions and interactions

### Performance Optimizations

- **Memoization**: React.memo for expensive components (if needed)
- **Lazy Loading**: Components loaded on demand
- **Efficient Re-renders**: Proper state management to minimize unnecessary renders
- **Smooth Animations**: Hardware-accelerated CSS transforms
- **Debouncing**: Search input debouncing (can be added)

## Integration Points

### API Communication
- RESTful API design
- JSON request/response format
- Query parameters for filters and pagination
- Error handling with user-friendly messages

### Data Synchronization
- State synchronized between frontend and backend
- Filters, search, and sort parameters passed as query strings
- Pagination metadata returned from backend
- Real-time updates on user interactions

## Error Handling

### Backend
- Try-catch blocks in controllers
- Error logging to console
- Appropriate HTTP status codes
- User-friendly error messages

### Frontend
- Error state management
- Visual error indicators
- Graceful degradation
- Loading states during API calls

## Future Enhancements

1. **Caching**: Implement Redis for frequently accessed data
2. **Database**: Migrate from CSV to database for better scalability
3. **Authentication**: Add user authentication and authorization
4. **Export**: Add CSV/PDF export functionality
5. **Analytics**: Add data visualization and analytics
6. **Real-time Updates**: WebSocket support for live data updates
7. **Advanced Search**: Full-text search with Elasticsearch
8. **Performance**: Implement virtual scrolling for large datasets

