import { performance } from 'perf_hooks';

// For accurate benchmarking, perform multiple runs
function benchmark(fn, iterations = 1000) {
  // Warm-up run (for JIT optimization)
  fn();
  
  const times = [];
  
  for (let i = 0; i < iterations; i++) {
    const start = performance.now();
    fn();
    const end = performance.now();
    times.push(end - start);
  }
  
  // Calculate statistics
  times.sort((a, b) => a - b);
  
  const sum = times.reduce((a, b) => a + b, 0);
  const avg = sum / times.length;
  const median = times[Math.floor(times.length / 2)];
  const min = times[0];
  const max = times[times.length - 1];
  
  return {
    average: avg,
    median: median,
    min: min,
    max: max,
    samples: times.length
  };
}

// Example usage
function testFunction() {
  // Function to benchmark
  let x = 0;
  for (let i = 0; i < 10000; i++) {
    x += i;
  }
  return x;
}

const results = benchmark(testFunction);
console.log('Benchmark Results:');
console.log(`  Samples: ${results.samples}`);
console.log(`  Average: ${results.average.toFixed(4)}ms`);
console.log(`  Median: ${results.median.toFixed(4)}ms`);
console.log(`  Min: ${results.min.toFixed(4)}ms`);
console.log(`  Max: ${results.max.toFixed(4)}ms`);