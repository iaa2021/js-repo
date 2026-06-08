import { performance, monitorEventLoopDelay } from 'perf_hooks';

// 1. Date.now() - millisecond precision
const dateStart = Date.now();
const dateEnd = Date.now();
console.log(`Date.now() difference: ${dateEnd - dateStart}ms`);

// 2. process.hrtime() - nanosecond precision
const hrStart = process.hrtime();
const hrEnd = process.hrtime(hrStart);
console.log(`process.hrtime() difference: ${hrEnd[0]}s ${hrEnd[1]}ns`);

// 3. performance.now() - microsecond precision
const perfStart = performance.now();
const perfEnd = performance.now();
console.log(`performance.now() difference: ${(perfEnd - perfStart).toFixed(6)}ms`);

// 4. Event loop delay monitoring (available in Node.js 12.0.0+)
const histogram = monitorEventLoopDelay({ resolution: 20 });
histogram.enable();

setTimeout(() => {
  histogram.disable();
  console.log('Event loop delay metrics:');
  console.log(`  Min: ${histogram.min}ns`);
  console.log(`  Max: ${histogram.max}ns`);
  console.log(`  Mean: ${histogram.mean.toFixed(2)}ns`);
  console.log(`  Stddev: ${histogram.stddev.toFixed(2)}ns`);
  console.log(`  Percentiles: 50=${histogram.percentile(50).toFixed(2)}ns, 99=${histogram.percentile(99).toFixed(2)}ns`);
}, 1000);