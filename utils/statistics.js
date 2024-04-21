function calculateStatistics(values) {
    const count = values.length;
    const average = calculateAverage(values);
    const max = Math.max(...values);
    const min = Math.min(...values);
    const stdDev = calculateStandardDeviation(values);
    
    return { count, average, max, min, stdDev };
  }
  
  function calculateAverage(values) {
    const sum = values.reduce((acc, curr) => acc + curr, 0);
    return sum / values.length;
  }
  
  function calculateStandardDeviation(values) {
    const avg = calculateAverage(values);
    const variance = values.reduce((acc, curr) => acc + Math.pow(curr - avg, 2), 0) / values.length;
    return Math.sqrt(variance);
  }
  
  module.exports = { calculateStatistics };
  