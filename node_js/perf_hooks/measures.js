import { performance } from 'perf_hooks';

// Create a start mark
performance.mark('start');

// Simulate some work
let result = 0;
for (let i = 0; i < 10000000; i++) {
  result += Math.sqrt(i);
}

// Create an end mark
performance.mark('end');

// Create a measure between the two marks
performance.measure('processTime', 'start', 'end');

// Get the measure
const measure = performance.getEntriesByName('processTime')[0];
console.log(`Process took ${measure.duration.toFixed(2)} milliseconds`);

// Clear marks and measures
performance.clearMarks();
performance.clearMeasures();
