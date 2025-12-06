import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import '../styles/FilterDropdowns.css';

const FilterDropdowns = ({ filterOptions, filters, onFilterChange }) => {
  const [openDropdown, setOpenDropdown] = useState(null);

  if (!filterOptions) {
    return <div className="filter-dropdowns-loading">Loading filters...</div>;
  }

  const handleDropdownToggle = (dropdown) => {
    setOpenDropdown(openDropdown === dropdown ? null : dropdown);
  };

  const handleMultiSelect = (filterType, value) => {
    const currentValues = filters[filterType] || [];
    if (currentValues.includes(value)) {
      onFilterChange(filterType, currentValues.filter(v => v !== value));
    } else {
      onFilterChange(filterType, [...currentValues, value]);
    }
  };

  const Dropdown = ({ label, filterKey, options, type = 'multi' }) => {
    const isOpen = openDropdown === filterKey;
    const selectedValues = filters[filterKey] || [];
    const displayText = selectedValues.length > 0 
      ? `${label} (${selectedValues.length})` 
      : label;

    return (
      <div className="filter-dropdown-wrapper">
        <button
          className={`filter-dropdown ${isOpen ? 'open' : ''} ${selectedValues.length > 0 ? 'active' : ''}`}
          onClick={() => handleDropdownToggle(filterKey)}
        >
          <span>{displayText}</span>
          <motion.svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <polyline points="6 9 12 15 18 9"></polyline>
          </motion.svg>
        </button>
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="filter-dropdown-menu"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {options.map((option) => {
                const isSelected = selectedValues.includes(option);
                return (
                  <button
                    key={option}
                    className={`filter-option ${isSelected ? 'selected' : ''}`}
                    onClick={() => handleMultiSelect(filterKey, option)}
                  >
                    <span className="checkbox">
                      {isSelected && (
                        <motion.svg
                          width="12"
                          height="12"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="3"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                        >
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </motion.svg>
                      )}
                    </span>
                    <span>{option}</span>
                  </button>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  };

  const RangeDropdown = ({ label, filterKey, min, max, type = 'number', onFilterChange: handleRangeChange }) => {
    const isOpen = openDropdown === filterKey;
    // For dateRange, use start/end; for ageRange, use min/max
    const isDateRange = filterKey === 'dateRange';
    const range = filters[filterKey] || (isDateRange ? { start: null, end: null } : { min: null, max: null });
    const hasValue = isDateRange 
      ? (range.start !== null || range.end !== null)
      : (range.min !== null || range.max !== null);
    const displayText = hasValue 
      ? `${label} (${isDateRange ? (range.start || min) : (range.min !== null ? range.min : min)} - ${isDateRange ? (range.end || max) : (range.max !== null ? range.max : max)})` 
      : label;

    return (
      <div className="filter-dropdown-wrapper">
        <button
          className={`filter-dropdown ${isOpen ? 'open' : ''} ${hasValue ? 'active' : ''}`}
          onClick={() => handleDropdownToggle(filterKey)}
        >
          <span>{displayText}</span>
          <motion.svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <polyline points="6 9 12 15 18 9"></polyline>
          </motion.svg>
        </button>
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="filter-dropdown-menu range-menu"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <div className="range-inputs">
                <div className="range-input-group">
                  <label>{isDateRange ? 'Start' : 'Min'}</label>
                  <input
                    type={type}
                    min={min}
                    max={max}
                    value={isDateRange ? (range.start || '') : (range.min !== null ? range.min : '')}
                    onChange={(e) => {
                      const value = e.target.value ? (type === 'number' ? parseInt(e.target.value) : e.target.value) : null;
                      if (isDateRange) {
                        handleRangeChange(filterKey, { ...range, start: value });
                      } else {
                        handleRangeChange(filterKey, { ...range, min: value });
                      }
                    }}
                    placeholder={min}
                  />
                </div>
                <div className="range-input-group">
                  <label>{isDateRange ? 'End' : 'Max'}</label>
                  <input
                    type={type}
                    min={min}
                    max={max}
                    value={isDateRange ? (range.end || '') : (range.max !== null ? range.max : '')}
                    onChange={(e) => {
                      const value = e.target.value ? (type === 'number' ? parseInt(e.target.value) : e.target.value) : null;
                      if (isDateRange) {
                        handleRangeChange(filterKey, { ...range, end: value });
                      } else {
                        handleRangeChange(filterKey, { ...range, max: value });
                      }
                    }}
                    placeholder={max}
                  />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  };

  return (
    <div className="filter-dropdowns">
      <Dropdown
        label="Customer Region"
        filterKey="regions"
        options={filterOptions.regions}
      />
      <Dropdown
        label="Gender"
        filterKey="genders"
        options={filterOptions.genders}
      />
      <RangeDropdown
        label="Age Range"
        filterKey="ageRange"
        min={filterOptions.ageRange.min}
        max={filterOptions.ageRange.max}
        type="number"
        onFilterChange={onFilterChange}
      />
      <Dropdown
        label="Product Category"
        filterKey="categories"
        options={filterOptions.categories}
      />
      <Dropdown
        label="Tags"
        filterKey="tags"
        options={filterOptions.tags}
      />
      <Dropdown
        label="Payment Method"
        filterKey="paymentMethods"
        options={filterOptions.paymentMethods}
      />
      <RangeDropdown
        label="Date"
        filterKey="dateRange"
        min={filterOptions.dateRange.min}
        max={filterOptions.dateRange.max}
        type="date"
        onFilterChange={onFilterChange}
      />
    </div>
  );
};

export default FilterDropdowns;

