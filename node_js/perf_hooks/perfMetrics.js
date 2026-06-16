import { performance, PerformanceObserver, PerformanceEntry }from 'perf_hooks';

class PerformanceTracker {
  constructor() {
    this.metrics = new Map();
    this.observers = new Map();
    
    // Set up default observer for custom metrics
    this.setupDefaultObserver();
  }
  
  setupDefaultObserver() {
    const obs = new PerformanceObserver((items) => {
      items.getEntries().forEach((entry) => {
        if (!this.metrics.has(entry.name)) {
          this.metrics.set(entry.name, []);
        }
        this.metrics.get(entry.name).push(entry);
        
        // Log detailed metrics
        this.logMetric(entry);
      });
    });
    
    obs.observe({ entryTypes: ['measure'] });
    this.observers.set('default', obs);
  }
  
  startTimer(name) {
    performance.mark(`${name}-start`);
  }
  
  endTimer(name, attributes = {}) {
    performance.mark(`${name}-end`);
    performance.measure(name, {
      start: `${name}-start`,
      end: `${name}-end`,
      ...attributes
    });
    
    // Clean up marks
    performance.clearMarks(`${name}-start`);
    performance.clearMarks(`${name}-end`);
  }
  
  logMetric(entry) {
    const { name, duration, startTime, entryType, detail } = entry;
    console.log(`📊 [${new Date().toISOString()}] ${name}: ${duration.toFixed(2)}ms`);
    
    if (detail) {
      console.log('   Details:', JSON.stringify(detail, null, 2));
    }
  }
  
  getMetrics(name) {
    return this.metrics.get(name) || [];
  }
  
  getStats(name) {
    const metrics = this.getMetrics(name);
    if (metrics.length === 0) return null;
    
    const durations = metrics.map(m => m.duration);
    const sum = durations.reduce((a, b) => a + b, 0);
    const avg = sum / durations.length;
    
    return {
      count: durations.length,
      total: sum,
      average: avg,
      min: Math.min(...durations),
      max: Math.max(...durations),
      p90: this.percentile(durations, 90),
      p95: this.percentile(durations, 95),
      p99: this.percentile(durations, 99)
    };
  }
  
  percentile(arr, p) {
    if (!arr.length) return 0;
    const sorted = [...arr].sort((a, b) => a - b);
    const pos = (sorted.length - 1) * p / 100;
    const base = Math.floor(pos);
    const rest = pos - base;
    
    if (sorted[base + 1] !== undefined) {
      return sorted[base] + rest * (sorted[base + 1] - sorted[base]);
    } else {
      return sorted[base];
    }
  }
}

// Usage example
const tracker = new PerformanceTracker();

// Track a simple operation
tracker.startTimer('database-query');
setTimeout(() => {
  tracker.endTimer('database-query', {
    detail: {
      query: 'SELECT * FROM users',
      params: { limit: 100 },
      success: true
    }
  });
  
  // Get statistics
  console.log('Stats:', tracker.getStats('database-query'));
}, 200);