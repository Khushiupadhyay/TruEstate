import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import csv from 'csv-parser';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let salesData = [];
let isDataLoaded = false;

/**
 * Load and parse CSV data
 */
export const loadData = async () => {
  if (isDataLoaded) {
    return salesData;
  }

  return new Promise((resolve, reject) => {
    const results = [];
    // Try multiple possible paths for the CSV file
    const possiblePaths = [
      path.join(__dirname, '../../../truestate_assignment_dataset.csv'),
      path.join(process.cwd(), 'truestate_assignment_dataset.csv'),
      path.join(process.cwd(), '../truestate_assignment_dataset.csv')
    ];
    
    let csvPath = possiblePaths[0];
    // Use the first path that exists, or default to the first one
    for (const p of possiblePaths) {
      if (fs.existsSync(p)) {
        csvPath = p;
        break;
      }
    }

    fs.createReadStream(csvPath)
      .pipe(csv())
      .on('data', (data) => {
        // Parse numeric fields
        const parsed = {
          ...data,
          Age: parseInt(data.Age) || 0,
          Quantity: parseInt(data.Quantity) || 0,
          'Price per Unit': parseFloat(data['Price per Unit']) || 0,
          'Discount Percentage': parseFloat(data['Discount Percentage']) || 0,
          'Total Amount': parseFloat(data['Total Amount']) || 0,
          'Final Amount': parseFloat(data['Final Amount']) || 0,
        };
        results.push(parsed);
      })
      .on('end', () => {
        salesData = results;
        isDataLoaded = true;
        console.log(`Loaded ${salesData.length} sales records`);
        resolve(salesData);
      })
      .on('error', (error) => {
        reject(error);
      });
  });
};

/**
 * Get all unique values for filter options
 */
export const getFilterOptions = () => {
  const regions = [...new Set(salesData.map(item => item['Customer Region']).filter(Boolean))];
  const genders = [...new Set(salesData.map(item => item.Gender).filter(Boolean))];
  const categories = [...new Set(salesData.map(item => item['Product Category']).filter(Boolean))];
  const paymentMethods = [...new Set(salesData.map(item => item['Payment Method']).filter(Boolean))];
  
  // Extract all unique tags
  const allTags = new Set();
  salesData.forEach(item => {
    if (item.Tags) {
      item.Tags.split(',').forEach(tag => {
        allTags.add(tag.trim());
      });
    }
  });
  
  const ages = salesData.map(item => item.Age).filter(age => age > 0);
  const minAge = Math.min(...ages);
  const maxAge = Math.max(...ages);
  
  const dates = salesData.map(item => item.Date).filter(Boolean);
  const minDate = dates.length > 0 ? dates.sort()[0] : null;
  const maxDate = dates.length > 0 ? dates.sort().reverse()[0] : null;

  return {
    regions: regions.sort(),
    genders: genders.sort(),
    categories: categories.sort(),
    tags: Array.from(allTags).sort(),
    paymentMethods: paymentMethods.sort(),
    ageRange: { min: minAge, max: maxAge },
    dateRange: { min: minDate, max: maxDate }
  };
};

export { salesData };

