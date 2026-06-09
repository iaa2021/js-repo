import { performance, PerformanceObserver } from 'perf_hooks';

// Set up the observer
const obs = new PerformanceObserver((items) => {
  items.getEntries().forEach((entry) => {
    console.log(`${entry.name}: ${entry.duration.toFixed(2)}ms`);
  });
});
obs.observe({ entryTypes: ['measure'] });

// Function that returns a promise
function fetchData(delay) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ data: 'Sample data' });
    }, delay);
  });
}

// Function to process data
function processData(data) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ processed: data.data.toUpperCase() });
    }, 200);
  });
}

// Measure Promise chain
async function run() {
  performance.mark('fetchStart');
  
  const data = await fetchData(300);
  
  performance.mark('fetchEnd');
  performance.mark('processStart');
  
  const processed = await processData(data);
  
  performance.mark('processEnd');
  
  // Create measures
  performance.measure('Fetch Data', 'fetchStart', 'fetchEnd');
  performance.measure('Process Data', 'processStart', 'processEnd');
  performance.measure('Total Operation', 'fetchStart', 'processEnd');
  
  console.log('Result:', processed);
}

run().finally(() => {
  // Clear after execution
  performance.clearMarks();
  performance.clearMeasures();
});