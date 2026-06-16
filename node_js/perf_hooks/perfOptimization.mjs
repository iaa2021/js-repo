import { Worker, isMainThread, parentPort, workerData } from 'worker_threads';
import { performance, PerformanceObserver } from 'perf_hooks';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
if (isMainThread) {
  // Main thread
  function runWorker(data) {
    return new Promise((resolve, reject) => {
      const start = performance.now();
      
      const worker = new Worker(__filename, {
        workerData: data
      });
      
      worker.on('message', (result) => {
        const duration = performance.now() - start;
        resolve({
          ...result,
          duration: `${duration.toFixed(2)}ms`
        });
      });
      
      worker.on('error', reject);
      worker.on('exit', (code) => {
        if (code !== 0) {
          reject(new Error(`Worker stopped with exit code ${code}`));
        }
      });
    });
  }
  
  // Example usage
  async function main() {
    try {
      const result = await runWorker({
        task: 'processData',
        data: Array(1000000).fill().map((_, i) => i)
      });
      
      console.log('Worker result:', result);
    } catch (err) {
      console.error('Worker error:', err);
    }
  }
  
  main();
} else {
  // Worker thread
  function processData(data) {
    // Simulate CPU-intensive work
    return data.map(x => Math.sqrt(x) * Math.PI);
  }
  
  try {
    const result = processData(workerData.data);
    parentPort.postMessage({
      task: workerData.task,
      resultLength: result.length,
      sample: result.slice(0, 5)
    });
  } catch (err) {
    parentPort.postMessage({ error: err.message });
  }
}