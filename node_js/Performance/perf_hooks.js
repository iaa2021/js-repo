 import { performance, PerformanceObserver }  from 'perf_hooks';

// Create a performance observer
const obs = new PerformanceObserver((items) => {
  items.getEntries().forEach((entry) => {
    console.log(`${entry.name}: ${entry.duration.toFixed(2)}ms`);
  });
});

// Subscribe to performance events
obs.observe({ entryTypes: ['measure'] });

// Mark the beginning of an operation
performance.mark('start');

// Simulate some work
const data = [];
for (let i = 0; i < 1000000; i++) {
  data.push(i * i);
}

// Mark the end and measure
performance.mark('end');
performance.measure('Data processing time', 'start', 'end');

// Clean up marks
performance.clearMarks();
