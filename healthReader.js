// healthReader.js
const fs = require('fs').promises;

async function healthMetricsCounter(filePath) {
  try {
    // Read the file
    const data = await fs.readFile(filePath, 'utf-8');
    
    // Convert JSON string to JavaScript object
    const healthData = JSON.parse(data);
    
    // Count entries in the metrics array
    const count = healthData.metrics.length;
    
    console.log(`Total health entries: ${count}`);
    return { count, data: healthData };
    
  } catch (error) {
    console.error('Error reading health data:', error.message);
    throw error;
  }
}

module.exports = { healthMetricsCounter };