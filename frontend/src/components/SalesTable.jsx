import { motion } from 'framer-motion';
import '../styles/SalesTable.css';

const SalesTable = ({ data }) => {
  if (!data || data.length === 0) {
    return (
      <motion.div 
        className="no-results"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="11" cy="11" r="8"></circle>
          <path d="m21 21-4.35-4.35"></path>
        </svg>
        <h3>No results found</h3>
        <p>Try adjusting your search or filters</p>
      </motion.div>
    );
  }

  const formatDate = (dateString) => {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    }).replace(/\//g, '-');
  };

  const formatPhone = (phone) => {
    if (!phone) return '-';
    const cleaned = phone.toString().replace(/\D/g, '');
    if (cleaned.length === 10) {
      return `+91 ${cleaned.slice(0, 5)} ${cleaned.slice(5)}`;
    }
    return phone;
  };

  return (
    <motion.div 
      className="sales-table-container"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="table-wrapper">
        <table className="sales-table">
          <thead>
            <tr>
              <th>Transaction ID</th>
              <th>Date</th>
              <th>Customer ID</th>
              <th>Customer name</th>
              <th>Phone Number</th>
              <th>Gender</th>
              <th>Age</th>
              <th>Product Category</th>
              <th>Quantity</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <motion.tr
                key={item['Transaction ID'] || index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2, delay: index * 0.01 }}
                className="table-row"
              >
                <td className="transaction-id">{item['Transaction ID'] || '-'}</td>
                <td>{formatDate(item.Date)}</td>
                <td className="customer-id">{item['Customer ID'] || '-'}</td>
                <td className="customer-name">{item['Customer Name'] || '-'}</td>
                <td className="phone-number">
                  {formatPhone(item['Phone Number'])}
                  {item['Phone Number'] && (
                    <svg 
                      width="14" 
                      height="14" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="2"
                      className="link-icon"
                    >
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                      <polyline points="15 3 21 3 21 9"></polyline>
                      <line x1="10" y1="14" x2="21" y2="3"></line>
                    </svg>
                  )}
                </td>
                <td>{item.Gender || '-'}</td>
                <td>{item.Age || '-'}</td>
                <td>
                  <span className="category-badge">{item['Product Category'] || '-'}</span>
                </td>
                <td className="quantity-cell">
                  {item.Quantity ? String(item.Quantity).padStart(2, '0') : '00'}
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};

export default SalesTable;
