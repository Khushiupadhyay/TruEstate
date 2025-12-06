import { motion } from 'framer-motion';
import '../styles/SummaryCards.css';

const SummaryCards = ({ data, pagination }) => {
  if (!data || data.length === 0) {
    return null;
  }

  // Calculate summary statistics
  const totalUnits = data.reduce((sum, item) => sum + (item.Quantity || 0), 0);
  const totalAmount = data.reduce((sum, item) => sum + (item['Total Amount'] || 0), 0);
  const totalDiscount = data.reduce((sum, item) => {
    const discount = ((item['Total Amount'] || 0) * (item['Discount Percentage'] || 0)) / 100;
    return sum + discount;
  }, 0);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="summary-cards">
      <motion.div
        className="summary-card"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        <div className="card-header">
          <h3>Total units sold</h3>
          <button className="info-button">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="16" x2="12" y2="12"></line>
              <line x1="12" y1="8" x2="12.01" y2="8"></line>
            </svg>
          </button>
        </div>
        <div className="card-value">{totalUnits}</div>
      </motion.div>

      <motion.div
        className="summary-card"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        <div className="card-header">
          <h3>Total Amount</h3>
          <button className="info-button">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="16" x2="12" y2="12"></line>
              <line x1="12" y1="8" x2="12.01" y2="8"></line>
            </svg>
          </button>
        </div>
        <div className="card-value">
          {formatCurrency(totalAmount)}
          {pagination && (
            <span className="card-subtext">({pagination.totalItems} SRs)</span>
          )}
        </div>
      </motion.div>

      <motion.div
        className="summary-card"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.3 }}
      >
        <div className="card-header">
          <h3>Total Discount</h3>
          <button className="info-button">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="16" x2="12" y2="12"></line>
              <line x1="12" y1="8" x2="12.01" y2="8"></line>
            </svg>
          </button>
        </div>
        <div className="card-value">
          {formatCurrency(totalDiscount)}
          {pagination && (
            <span className="card-subtext">({pagination.totalItems} SRs)</span>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default SummaryCards;

