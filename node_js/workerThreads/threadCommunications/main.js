 //main.js
import { Worker } from 'worker_threads';

// Create a worker
const worker = new Worker('./message_worker.js');

// Send messages to the worker
worker.postMessage('Hello worker!');
worker.postMessage({ type: 'task', data: [1, 2, 3, 4, 5] });

// Receive messages from the worker
worker.on('message', (message) => {
  console.log('Main thread received:', message);
});

// Handle worker completion
worker.on('exit', (code) => {
  console.log(`Worker exited with code ${code}`);
});