import { salesData, loadData, getFilterOptions } from './data.service.js';

/**
 * Search in customer name and phone number (case-insensitive)
 */
const searchData = (data, searchQuery) => {
  if (!searchQuery || searchQuery.trim() === '') {
    return data;
  }

  const query = searchQuery.toLowerCase().trim();
  return data.filter(item => {
    const customerName = (item['Customer Name'] || '').toLowerCase();
    const phoneNumber = (item['Phone Number'] || '').toString();
    return customerName.includes(query) || phoneNumber.includes(query);
  });
};

/**
 * Apply filters to data
 */
const applyFilters = (data, filters) => {
  let filtered = [...data];

  // Region filter
  if (filters.regions && filters.regions.length > 0) {
    filtered = filtered.filter(item => 
      filters.regions.includes(item['Customer Region'])
    );
  }

  // Gender filter
  if (filters.genders && filters.genders.length > 0) {
    filtered = filtered.filter(item => 
      filters.genders.includes(item.Gender)
    );
  }

  // Age range filter
  if (filters.ageRange) {
    const { min, max } = filters.ageRange;
    if (min !== undefined && min !== null) {
      filtered = filtered.filter(item => item.Age >= min);
    }
    if (max !== undefined && max !== null) {
      filtered = filtered.filter(item => item.Age <= max);
    }
  }

  // Category filter
  if (filters.categories && filters.categories.length > 0) {
    filtered = filtered.filter(item => 
      filters.categories.includes(item['Product Category'])
    );
  }

  // Tags filter
  if (filters.tags && filters.tags.length > 0) {
    filtered = filtered.filter(item => {
      if (!item.Tags) return false;
      const itemTags = item.Tags.split(',').map(tag => tag.trim().toLowerCase());
      return filters.tags.some(filterTag => 
        itemTags.includes(filterTag.toLowerCase())
      );
    });
  }

  // Payment method filter
  if (filters.paymentMethods && filters.paymentMethods.length > 0) {
    filtered = filtered.filter(item => 
      filters.paymentMethods.includes(item['Payment Method'])
    );
  }

  // Date range filter
  if (filters.dateRange) {
    const { start, end } = filters.dateRange;
    if (start) {
      filtered = filtered.filter(item => item.Date >= start);
    }
    if (end) {
      filtered = filtered.filter(item => item.Date <= end);
    }
  }

  return filtered;
};

/**
 * Sort data
 */
const sortData = (data, sortBy, sortOrder = 'asc') => {
  const sorted = [...data];

  sorted.sort((a, b) => {
    let comparison = 0;

    switch (sortBy) {
      case 'date':
        comparison = new Date(a.Date) - new Date(b.Date);
        break;
      case 'quantity':
        comparison = a.Quantity - b.Quantity;
        break;
      case 'customerName':
        const nameA = (a['Customer Name'] || '').toLowerCase();
        const nameB = (b['Customer Name'] || '').toLowerCase();
        comparison = nameA.localeCompare(nameB);
        break;
      default:
        return 0;
    }

    return sortOrder === 'desc' ? -comparison : comparison;
  });

  return sorted;
};

/**
 * Paginate data
 */
const paginateData = (data, page = 1, pageSize = 10) => {
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginated = data.slice(startIndex, endIndex);
  const totalPages = Math.ceil(data.length / pageSize);

  return {
    data: paginated,
    pagination: {
      currentPage: page,
      pageSize,
      totalItems: data.length,
      totalPages,
      hasNextPage: page < totalPages,
      hasPreviousPage: page > 1
    }
  };
};

/**
 * Main service function to get filtered, sorted, and paginated sales data
 */
export const getSalesData = async (options = {}) => {
  // Ensure data is loaded
  await loadData();

  const {
    search = '',
    filters = {},
    sortBy = 'date',
    sortOrder = 'desc',
    page = 1,
    pageSize = 10
  } = options;

  // Apply search
  let result = searchData(salesData, search);

  // Apply filters
  result = applyFilters(result, filters);

  // Apply sorting
  result = sortData(result, sortBy, sortOrder);

  // Apply pagination
  const paginatedResult = paginateData(result, page, pageSize);

  return paginatedResult;
};

/**
 * Get filter options
 */
export const getFilterOptionsService = async () => {
  await loadData();
  return getFilterOptions();
};

