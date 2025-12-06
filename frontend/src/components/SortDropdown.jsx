import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import '../styles/SortDropdown.css';

const SortDropdown = ({ sortBy, sortOrder, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const sortOptions = [
    { value: 'date', label: 'Date' },
    { value: 'quantity', label: 'Quantity' },
    { value: 'customerName', label: 'Customer Name' }
  ];

  const handleSelect = (option) => {
    onChange(option);
    setIsOpen(false);
  };

  const currentLabel = sortOptions.find(opt => opt.value === sortBy)?.label || 'Date';
  const orderIcon = sortOrder === 'asc' ? '↑' : '↓';

  return (
    <div className="sort-dropdown-container">
      <motion.button
        className="sort-button"
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <span>Sort: {currentLabel} {orderIcon}</span>
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
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="sort-dropdown-menu"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {sortOptions.map((option) => (
              <motion.button
                key={option.value}
                className={`sort-option ${sortBy === option.value ? 'active' : ''}`}
                onClick={() => handleSelect(option.value)}
                whileHover={{ x: 4 }}
                whileTap={{ scale: 0.95 }}
              >
                {option.label}
                {sortBy === option.value && (
                  <span className="sort-order-indicator">{orderIcon}</span>
                )}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SortDropdown;

