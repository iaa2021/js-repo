import { performance, PerformanceObserver } from 'perf_hooks';
import { performance: perf } from 'process';

class MemoryMonitor {
  constructor() {
    this.leakThreshold = 10 * 1024 * 1024; // 10MB
    this.checkInterval = 10000; // 10 seconds
    this.interval = null;
    this.lastMemoryUsage = process.memoryUsage();
    this.leakDetected = false;
    
    // Set up performance observer for GC events
    const obs = new PerformanceObserver((items) => {
      items.getEntries().forEach((entry) => {
        if (entry.name === 'gc') {
          this.checkMemoryLeak();
        }
      });
    });
    obs.observe({ entryTypes: ['gc'] });
  }
  
  start() {
    console.log('Memory monitoring started');
    this.interval = setInterval(() => this.checkMemoryLeak(), this.checkInterval);
  }
  
  stop() {
    if (this.interval) {
      clearInterval(this.interval);
      console.log('Memory monitoring stopped');
    }
  }
  
  checkMemoryLeak() {
    const current = process.memoryUsage();
    const heapDiff = current.heapUsed - this.lastMemoryUsage.heapUsed;
    
    if (heapDiff > this.leakThreshold) {
      this.leakDetected = true;
      console.warn(`⚠️  Possible memory leak detected: Heap increased by ${(heapDiff / 1024 / 1024).toFixed(2)}MB`);
      console.log('Memory snapshot:', {
        rss: this.formatMemory(current.rss),
        heapTotal: this.formatMemory(current.heapTotal),
        heapUsed: this.formatMemory(current.heapUsed),
        external: this.formatMemory(current.external)
      });
      
      // Take a heap snapshot if needed
      if (process.env.NODE_ENV === 'development') {
        this.takeHeapSnapshot();
      }
    }
    
    this.lastMemoryUsage = current;
  }
  
  formatMemory(bytes) {
    return `${(bytes / 1024 / 1024).toFixed(2)}MB`;
  }
  
  takeHeapSnapshot() {
    const heapdump = require('heapdump');
    const filename = `heapdump-${Date.now()}.heapsnapshot`;
    heapdump.writeSnapshot(filename, (err, filename) => {
      if (err) {
        console.error('Failed to take heap snapshot:', err);
      } else {
        console.log(`Heap snapshot written to ${filename}`);
      }
    });
  }
}

// Usage example
const monitor = new MemoryMonitor();
monitor.start();

// Simulate a memory leak
const leaks = [];
setInterval(() => {
  for (let i = 0; i < 1000; i++) {
    leaks.push(new Array(1000).fill('*'.repeat(100)));
  }
}, 1000);

// Stop monitoring after 1 minute
setTimeout(() => {
  monitor.stop();
  console.log('Memory monitoring completed');
}, 60000);
