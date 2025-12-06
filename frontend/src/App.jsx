import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Sidebar from './components/Sidebar';
import SearchBar from './components/SearchBar';
import FilterDropdowns from './components/FilterDropdowns';
import SummaryCards from './components/SummaryCards';
import SalesTable from './components/SalesTable';
import SortDropdown from './components/SortDropdown';
import Pagination from './components/Pagination';
import { getSalesData, getFilterOptions } from './services/api.service';
import './styles/App.css';

function App() {
  const [salesData, setSalesData] = useState([]);
  const [filterOptions, setFilterOptions] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Search state
  const [searchQuery, setSearchQuery] = useState('');

  // Filter state
  const [filters, setFilters] = useState({
    regions: [],
    genders: [],
    categories: [],
    tags: [],
    paymentMethods: [],
    ageRange: { min: null, max: null },
    dateRange: { start: null, end: null }
  });

  // Sort state
  const [sortBy, setSortBy] = useState('customerName');
  const [sortOrder, setSortOrder] = useState('asc');

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [pagination, setPagination] = useState(null);

  const pageSize = 10;

  // Load filter options on mount
  useEffect(() => {
    const loadFilterOptions = async () => {
      try {
        const options = await getFilterOptions();
        setFilterOptions(options);
      } catch (err) {
        console.error('Error loading filter options:', err);
      }
    };
    loadFilterOptions();
  }, []);

  // Fetch sales data when filters, search, sort, or page changes
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const result = await getSalesData({
          search: searchQuery,
          filters,
          sortBy,
          sortOrder,
          page: currentPage,
          pageSize
        });
        setSalesData(result.data);
        setPagination(result.pagination);
      } catch (err) {
        setError(err.message || 'Failed to fetch sales data');
        console.error('Error fetching sales data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [searchQuery, filters, sortBy, sortOrder, currentPage]);

  const handleSearch = (query) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
    setCurrentPage(1);
  };

  const handleSortChange = (newSortBy) => {
    if (sortBy === newSortBy) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(newSortBy);
      setSortOrder('asc');
    }
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="app">
      <Sidebar />
      <main className="main-content">
        <div className="content-header">
          <h1>Sales Management System</h1>
          <div className="header-actions">
            <SearchBar onSearch={handleSearch} value={searchQuery} />
          </div>
        </div>

        <div className="filters-row">
          <FilterDropdowns
            filterOptions={filterOptions}
            filters={filters}
            onFilterChange={handleFilterChange}
          />
          <SortDropdown 
            sortBy={sortBy} 
            sortOrder={sortOrder} 
            onChange={handleSortChange} 
          />
        </div>

        {!loading && !error && (
          <SummaryCards data={salesData} pagination={pagination} />
        )}

        {loading && (
          <motion.div 
            className="loading-container"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="spinner"></div>
            <p>Loading sales data...</p>
          </motion.div>
        )}

        {error && (
          <motion.div 
            className="error-container"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <p>Error: {error}</p>
            <p className="error-hint">Make sure the backend server is running on port 5000</p>
          </motion.div>
        )}

        {!loading && !error && (
          <>
            <SalesTable data={salesData} />
            {pagination && (
              <Pagination
                pagination={pagination}
                onPageChange={handlePageChange}
              />
            )}
          </>
        )}
      </main>
    </div>
  );
}

export default App;
