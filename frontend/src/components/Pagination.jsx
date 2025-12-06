import { motion } from 'framer-motion';
import '../styles/Pagination.css';

const Pagination = ({ pagination, onPageChange }) => {
  if (!pagination) return null;

  const { currentPage, totalPages, hasNextPage, hasPreviousPage, totalItems } = pagination;

  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;
    
    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 5; i++) {
          pages.push(i);
        }
      } else if (currentPage >= totalPages - 2) {
        for (let i = totalPages - 4; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        for (let i = currentPage - 2; i <= currentPage + 2; i++) {
          pages.push(i);
        }
      }
    }
    
    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <motion.div 
      className="pagination-container"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="pagination-info">
        Showing page {currentPage} of {totalPages} ({totalItems} total items)
      </div>
      
      <div className="pagination-controls">
        <motion.button
          className="pagination-button"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={!hasPreviousPage}
          whileHover={hasPreviousPage ? { scale: 1.05 } : {}}
          whileTap={hasPreviousPage ? { scale: 0.95 } : {}}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
          Previous
        </motion.button>

        <div className="page-numbers">
          {pageNumbers.map((page) => (
            <motion.button
              key={page}
              className={`page-number ${currentPage === page ? 'active' : ''}`}
              onClick={() => onPageChange(page)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.2 }}
            >
              {page}
            </motion.button>
          ))}
        </div>

        <motion.button
          className="pagination-button"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={!hasNextPage}
          whileHover={hasNextPage ? { scale: 1.05 } : {}}
          whileTap={hasNextPage ? { scale: 0.95 } : {}}
        >
          Next
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </motion.button>
      </div>
    </motion.div>
  );
};

export default Pagination;

