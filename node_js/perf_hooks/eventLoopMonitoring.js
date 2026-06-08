import { monitorEventLoopDelay } from 'perf_hooks'

// Create a histogram
const histogram = monitorEventLoopDelay({ resolution: 10 });

// Enable monitoring
histogram.enable();

// Simulate load on the event loop
const operations = [];
for (let i = 0; i < 10; i++) {
  operations.push(new Promise((resolve) => {
    setTimeout(() => {
      // Simulate CPU-intensive work
      let sum = 0;
      for (let j = 0; j < 10000000; j++) {
        sum += j;
      }
      resolve(sum);
    }, 100);
  }));
}

// After all operations complete
Promise.all(operations).then(() => {
  // Disable monitoring
  histogram.disable();
  
  // Print statistics
  console.log('Event Loop Delay Statistics:');
  console.log(`  Min: ${histogram.min}ns`);
  console.log(`  Max: ${histogram.max}ns`);
  console.log(`  Mean: ${histogram.mean.toFixed(2)}ns`);
  console.log(`  Stddev: ${histogram.stddev.toFixed(2)}ns`);
  
  // Percentiles
  console.log('\nPercentiles:');
  [1, 10, 50, 90, 99, 99.9].forEach((p) => {
    console.log(`  p${p}: ${histogram.percentile(p).toFixed(2)}ns`);
  });
});