 import { Worker } from 'worker_threads';

// Function to create a new worker
function runWorker(workerData) {
  return new Promise((resolve, reject) => {
    // Create a new worker
    const worker = new Worker('./worker.js', { workerData });
    
    // Listen for messages from the worker
    worker.on('message', resolve);
    
    // Listen for errors
    worker.on('error', reject);
    
    // Listen for worker exit
    worker.on('exit', (code) => {
      if (code !== 0) {
        reject(new Error(`Worker stopped with exit code ${code}`));
      }
    });
  });
}

// Run the worker
async function run() {
  try {
    // Send data to the worker and get the result
    const result = await runWorker('Hello from main thread!');
    console.log('Worker result:', result);
  } catch (err) {
    console.error('Worker error:', err);
  }
}

run().catch(err => console.error(err));