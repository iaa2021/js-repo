import { performance, PerformanceObserver } from 'perf_hooks';

// Create a performance observer
const obs = new PerformanceObserver((items) => {
  // Process all entries
  const entries = items.getEntries();
  entries.forEach((entry) => {
    console.log(`Name: ${entry.name}, Type: ${entry.entryType}, Duration: ${entry.duration.toFixed(2)}ms`);
  });
});

// Subscribe to specific entry types
obs.observe({ entryTypes: ['measure', 'mark'] });

// First task
performance.mark('task1Start');
// Simulate work
setTimeout(() => {
  performance.mark('task1End');
  performance.measure('Task 1', 'task1Start', 'task1End');
  
  // Second task
  performance.mark('task2Start');
  setTimeout(() => {
    performance.mark('task2End');
    performance.measure('Task 2', 'task2Start', 'task2End');
    
    // Clean up
    performance.clearMarks();
    performance.clearMeasures();
    obs.disconnect();
  }, 1000);
}, 1000);