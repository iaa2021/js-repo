import vm from 'vm';
import { performance, PerformanceObserver } from 'perf_hooks';

// 1. Compile once, run many times
const expensiveCalculation = new vm.Script(`
  function calculate(n) {
    let result = 0;
    for (let i = 0; i < n; i++) {
      result += Math.sqrt(i) * Math.PI;
    }
    return result;
  }
  
  // Return the function reference
  calculate;
`);

// Create a context
const context = { Math };
vm.createContext(context);

// Run once to get the function
const calculate = expensiveCalculation.runInContext(context);

// Now we can call the function multiple times without recompiling
console.log('Result (n=1000):', calculate(1000));
console.log('Result (n=2000):', calculate(2000));

// 2. Use code caching for better performance
const cache = new Map();

function compileWithCache(code, filename) {
  if (cache.has(code)) {
    console.log(`Using cached script for ${filename}`);
    return cache.get(code);
  }
  
  console.log(`Compiling script for ${filename}`);
  const script = new vm.Script(code, {
    filename,
    cachedData: null, // Will be populated on first run
    produceCachedData: true
  });
  
  cache.set(code, script);
  return script;
}

// 3. Measure performance
function measurePerformance() {
  const obs = new PerformanceObserver((items) => {
    const entry = items.getEntries()[0];
    console.log(`\nExecution time for ${entry.name}: ${entry.duration.toFixed(2)}ms`);
    performance.clearMarks();
  });
  obs.observe({ entryTypes: ['measure'] });
  
  // Test with different script sizes
  const smallScript = new vm.Script('let sum = 0; for (let i = 0; i < 1000; i++) sum += i; sum;');
  const largeScript = new vm.Script(`
    function processData(data) {
      return data.map(x => ({
        ...x,
        processed: true,
        timestamp: Date.now(),
        hash: require('crypto').createHash('md5').update(JSON.stringify(x)).digest('hex')
      }));
    }
    
    // Process sample data
    const data = Array(1000).fill(null).map((_, i) => ({ id: i, value: Math.random() }));
    return processData(data);
  `);
  
  // Measure execution
  performance.mark('small-start');
  smallScript.runInThisContext();
  performance.mark('small-end');
  
  performance.mark('large-start');
  largeScript.runInThisContext();
  performance.mark('large-end');
  
  performance.measure('Small script execution', 'small-start', 'small-end');
  performance.measure('Large script execution', 'large-start', 'large-end');
}

// Run performance test
measurePerformance();

// 4. Reuse contexts for better performance
function createOptimizedContext() {
  const context = {
    // Only include what's necessary
    console: {
      log: console.log,
      error: console.error
    },
    // Add required globals
    setTimeout,
    clearTimeout,
    // Add custom utilities
    utils: {
      formatNumber: n => new Intl.NumberFormat().format(n),
      formatDate: d => d.toISOString()
    }
  };
  
  // Create context once
  vm.createContext(context);
  return context;
}

// Reuse the same context for multiple scripts
const sharedContext = createOptimizedContext();

// Run multiple scripts with the same context
function runWithSharedContext(code) {
  try {
    const script = new vm.Script(code);
    return script.runInContext(sharedContext);
  } catch (err) {
    console.error('Script execution failed:', err);
    throw err;
  }
}

// Example usage
const script1 = 'console.log("Script 1:", utils.formatNumber(1234567.89));';
const script2 = 'console.log("Script 2:", utils.formatDate(new Date()));';

runWithSharedContext(script1);
runWithSharedContext(script2);