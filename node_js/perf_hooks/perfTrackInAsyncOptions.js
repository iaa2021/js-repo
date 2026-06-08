import { performance, PerformanceObserver } from 'perf_hooks';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);


// Create observer for the measures
const obs = new PerformanceObserver((items) => {
  items.getEntries().forEach((entry) => {
    console.log(`${entry.name}: ${entry.duration.toFixed(2)}ms`);
  });
});
obs.observe({ entryTypes: ['measure'] });

// Measure async file read operation
performance.mark('readStart');

fs.readFile(__filename, (err, data) => {
  if (err) throw err;
  
  performance.mark('readEnd');
  performance.measure('File Read', 'readStart', 'readEnd');
  
  // Measure async processing time
  performance.mark('processStart');
  
  // Simulate processing the file data
  setTimeout(() => {
    const lines = data.toString().split('\n').length;
    
    performance.mark('processEnd');
    performance.measure('File Processing', 'processStart', 'processEnd');
    
    console.log(`File has ${lines} lines`);
    
    // Clean up
    performance.clearMarks();
    performance.clearMeasures();
  }, 100);
});