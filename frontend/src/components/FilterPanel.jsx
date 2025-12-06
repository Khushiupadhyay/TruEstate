import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import '../styles/FilterPanel.css';

const FilterPanel = ({ filterOptions, filters, onFilterChange, onClearFilters }) => {
  const [expandedSections, setExpandedSections] = useState({
    region: true,
    gender: true,
    category: true,
    tags: false,
    payment: true,
    age: false,
    date: false
  });

  if (!filterOptions) {
    return <div className="filter-panel-loading">Loading filters...</div>;
  }

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const hasActiveFilters = () => {
    return (
      filters.regions.length > 0 ||
      filters.genders.length > 0 ||
      filters.categories.length > 0 ||
      filters.tags.length > 0 ||
      filters.paymentMethods.length > 0 ||
      (filters.ageRange.min !== null && filters.ageRange.min !== filterOptions.ageRange.min) ||
      (filters.ageRange.max !== null && filters.ageRange.max !== filterOptions.ageRange.max) ||
      filters.dateRange.start ||
      filters.dateRange.end
    );
  };

  const FilterSection = ({ title, sectionKey, children }) => (
    <motion.div 
      className="filter-section"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <button 
        className="filter-section-header"
        onClick={() => toggleSection(sectionKey)}
      >
        <span>{title}</span>
        <motion.svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          animate={{ rotate: expandedSections[sectionKey] ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <polyline points="6 9 12 15 18 9"></polyline>
        </motion.svg>
      </button>
      <AnimatePresence>
        {expandedSections[sectionKey] && (
          <motion.div
            className="filter-section-content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );

  const MultiSelectFilter = ({ options, selected, onChange, filterKey }) => (
    <div className="multi-select-filter">
      {options.map((option) => {
        const isSelected = selected.includes(option);
        return (
          <motion.button
            key={option}
            className={`filter-chip ${isSelected ? 'selected' : ''}`}
            onClick={() => onChange(filterKey, option)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2 }}
          >
            {option}
            {isSelected && (
              <motion.span
                className="checkmark"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              >
                ✓
              </motion.span>
            )}
          </motion.button>
        );
      })}
    </div>
  );

  return (
    <motion.div 
      className="filter-panel"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <div className="filter-panel-header">
        <h2>Filters</h2>
        {hasActiveFilters() && (
          <motion.button
            className="clear-filters-button"
            onClick={onClearFilters}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            Clear All
          </motion.button>
        )}
      </div>

      <FilterSection title="Customer Region" sectionKey="region">
        <MultiSelectFilter
          options={filterOptions.regions}
          selected={filters.regions}
          onChange={onFilterChange}
          filterKey="regions"
        />
      </FilterSection>

      <FilterSection title="Gender" sectionKey="gender">
        <MultiSelectFilter
          options={filterOptions.genders}
          selected={filters.genders}
          onChange={onFilterChange}
          filterKey="genders"
        />
      </FilterSection>

      <FilterSection title="Product Category" sectionKey="category">
        <MultiSelectFilter
          options={filterOptions.categories}
          selected={filters.categories}
          onChange={onFilterChange}
          filterKey="categories"
        />
      </FilterSection>

      <FilterSection title="Tags" sectionKey="tags">
        <MultiSelectFilter
          options={filterOptions.tags}
          selected={filters.tags}
          onChange={onFilterChange}
          filterKey="tags"
        />
      </FilterSection>

      <FilterSection title="Payment Method" sectionKey="payment">
        <MultiSelectFilter
          options={filterOptions.paymentMethods}
          selected={filters.paymentMethods}
          onChange={onFilterChange}
          filterKey="paymentMethods"
        />
      </FilterSection>

      <FilterSection title="Age Range" sectionKey="age">
        <div className="range-filter">
          <div className="range-input-group">
            <label>Min Age</label>
            <input
              type="number"
              min={filterOptions.ageRange.min}
              max={filterOptions.ageRange.max}
              value={filters.ageRange.min || ''}
              onChange={(e) => onFilterChange('ageRange', { 
                min: e.target.value ? parseInt(e.target.value) : null,
                max: filters.ageRange.max
              })}
              placeholder={filterOptions.ageRange.min}
            />
          </div>
          <div className="range-input-group">
            <label>Max Age</label>
            <input
              type="number"
              min={filterOptions.ageRange.min}
              max={filterOptions.ageRange.max}
              value={filters.ageRange.max || ''}
              onChange={(e) => onFilterChange('ageRange', { 
                min: filters.ageRange.min,
                max: e.target.value ? parseInt(e.target.value) : null
              })}
              placeholder={filterOptions.ageRange.max}
            />
          </div>
        </div>
      </FilterSection>

      <FilterSection title="Date Range" sectionKey="date">
        <div className="range-filter">
          <div className="range-input-group">
            <label>Start Date</label>
            <input
              type="date"
              min={filterOptions.dateRange.min}
              max={filterOptions.dateRange.max}
              value={filters.dateRange.start || ''}
              onChange={(e) => onFilterChange('dateRange', { 
                start: e.target.value || null,
                end: filters.dateRange.end
              })}
            />
          </div>
          <div className="range-input-group">
            <label>End Date</label>
            <input
              type="date"
              min={filterOptions.dateRange.min}
              max={filterOptions.dateRange.max}
              value={filters.dateRange.end || ''}
              onChange={(e) => onFilterChange('dateRange', { 
                start: filters.dateRange.start,
                end: e.target.value || null
              })}
            />
          </div>
        </div>
      </FilterSection>
    </motion.div>
  );
};

export default FilterPanel;

