import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000
});

/**
 * Build query string from filters object
 */
const buildQueryString = (params) => {
  const queryParams = new URLSearchParams();
  
  if (params.search) {
    queryParams.append('search', params.search);
  }
  
  if (params.sortBy) {
    queryParams.append('sortBy', params.sortBy);
  }
  
  if (params.sortOrder) {
    queryParams.append('sortOrder', params.sortOrder);
  }
  
  if (params.page) {
    queryParams.append('page', params.page);
  }
  
  if (params.pageSize) {
    queryParams.append('pageSize', params.pageSize);
  }
  
  // Add array filters
  if (params.filters.regions && params.filters.regions.length > 0) {
    params.filters.regions.forEach(region => {
      queryParams.append('regions', region);
    });
  }
  
  if (params.filters.genders && params.filters.genders.length > 0) {
    params.filters.genders.forEach(gender => {
      queryParams.append('genders', gender);
    });
  }
  
  if (params.filters.categories && params.filters.categories.length > 0) {
    params.filters.categories.forEach(category => {
      queryParams.append('categories', category);
    });
  }
  
  if (params.filters.tags && params.filters.tags.length > 0) {
    params.filters.tags.forEach(tag => {
      queryParams.append('tags', tag);
    });
  }
  
  if (params.filters.paymentMethods && params.filters.paymentMethods.length > 0) {
    params.filters.paymentMethods.forEach(method => {
      queryParams.append('paymentMethods', method);
    });
  }
  
  // Age range
  if (params.filters.ageRange) {
    if (params.filters.ageRange.min !== null && params.filters.ageRange.min !== undefined) {
      queryParams.append('ageMin', params.filters.ageRange.min);
    }
    if (params.filters.ageRange.max !== null && params.filters.ageRange.max !== undefined) {
      queryParams.append('ageMax', params.filters.ageRange.max);
    }
  }
  
  // Date range
  if (params.filters.dateRange) {
    if (params.filters.dateRange.start) {
      queryParams.append('dateStart', params.filters.dateRange.start);
    }
    if (params.filters.dateRange.end) {
      queryParams.append('dateEnd', params.filters.dateRange.end);
    }
  }
  
  return queryParams.toString();
};

/**
 * Get sales data with filters, search, sorting, and pagination
 */
export const getSalesData = async (options = {}) => {
  try {
    const queryString = buildQueryString({
      search: options.search || '',
      sortBy: options.sortBy || 'date',
      sortOrder: options.sortOrder || 'desc',
      page: options.page || 1,
      pageSize: options.pageSize || 10,
      filters: options.filters || {}
    });
    
    const response = await api.get(`/sales?${queryString}`);
    return response.data;
  } catch (error) {
    console.error('API Error:', error);
    throw new Error(error.response?.data?.message || 'Failed to fetch sales data');
  }
};

/**
 * Get filter options
 */
export const getFilterOptions = async () => {
  try {
    const response = await api.get('/sales/filters');
    return response.data;
  } catch (error) {
    console.error('API Error:', error);
    throw new Error(error.response?.data?.message || 'Failed to fetch filter options');
  }
};

