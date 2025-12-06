import { getSalesData, getFilterOptionsService } from '../services/sales.service.js';

/**
 * Get paginated sales data with search, filters, and sorting
 */
export const getSales = async (req, res) => {
  try {
    const {
      search = '',
      sortBy = 'date',
      sortOrder = 'desc',
      page = 1,
      pageSize = 10
    } = req.query;

    // Parse filters from query string
    const filters = {};
    
    if (req.query.regions) {
      filters.regions = Array.isArray(req.query.regions) 
        ? req.query.regions 
        : [req.query.regions];
    }
    
    if (req.query.genders) {
      filters.genders = Array.isArray(req.query.genders)
        ? req.query.genders
        : [req.query.genders];
    }
    
    if (req.query.categories) {
      filters.categories = Array.isArray(req.query.categories)
        ? req.query.categories
        : [req.query.categories];
    }
    
    if (req.query.tags) {
      filters.tags = Array.isArray(req.query.tags)
        ? req.query.tags
        : [req.query.tags];
    }
    
    if (req.query.paymentMethods) {
      filters.paymentMethods = Array.isArray(req.query.paymentMethods)
        ? req.query.paymentMethods
        : [req.query.paymentMethods];
    }
    
    if (req.query.ageMin || req.query.ageMax) {
      filters.ageRange = {};
      if (req.query.ageMin) {
        filters.ageRange.min = parseInt(req.query.ageMin);
      }
      if (req.query.ageMax) {
        filters.ageRange.max = parseInt(req.query.ageMax);
      }
    }
    
    if (req.query.dateStart || req.query.dateEnd) {
      filters.dateRange = {};
      if (req.query.dateStart) {
        filters.dateRange.start = req.query.dateStart;
      }
      if (req.query.dateEnd) {
        filters.dateRange.end = req.query.dateEnd;
      }
    }

    const result = await getSalesData({
      search,
      filters,
      sortBy,
      sortOrder,
      page: parseInt(page),
      pageSize: parseInt(pageSize)
    });

    res.json(result);
  } catch (error) {
    console.error('Error fetching sales data:', error);
    res.status(500).json({ 
      error: 'Internal server error', 
      message: error.message 
    });
  }
};

/**
 * Get filter options
 */
export const getFilters = async (req, res) => {
  try {
    const options = await getFilterOptionsService();
    res.json(options);
  } catch (error) {
    console.error('Error fetching filter options:', error);
    res.status(500).json({ 
      error: 'Internal server error', 
      message: error.message 
    });
  }
};

