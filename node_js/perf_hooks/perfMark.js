 import { performance } from 'perf_hooks';

// Create marks at specific points in your code
performance.mark('startProcess');

// Simulate some work
let result = 0;
for (let i = 0; i < 1000000; i++) {
  result += Math.sqrt(i);
}

// Create another mark
performance.mark('endProcess');

// Get all the marks
console.log(performance.getEntriesByType('mark'));

