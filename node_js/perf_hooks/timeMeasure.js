 import { performance } from 'perf_hooks';
 
// Get the current high-resolution time
const startTime = performance.now();

// Perform some operation
let sum = 0;
for (let i = 0; i < 1000000; i++) {
  sum += i;
}

// Get the end time
const endTime = performance.now();

// Calculate and display the elapsed time in milliseconds
console.log(`Operation took ${(endTime - startTime).toFixed(2)} milliseconds`);