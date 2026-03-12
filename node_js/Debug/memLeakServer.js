//const http = require('http');
import http from 'http';
// This object will store data for each request (memory leak!)
const requestData = {};

const server = http.createServer((req, res) => {
  // Generate a unique request ID
  const requestId = Date.now() + Math.random().toString(36).substring(2, 15);

  // Store data in the global object (THIS IS THE MEMORY LEAK)
  requestData[requestId] = {
    url: req.url,
    method: req.method,
    headers: req.headers,
    timestamp: Date.now(),
    // Create a large object to make the leak more obvious
    payload: Buffer.alloc(1024 * 1024) // Allocate 1MB per request
  };

  // Log memory usage after each request
  const memoryUsage = process.memoryUsage();
  console.log(`Memory usage after request ${requestId}:`);
  console.log(`- Heap Used: ${Math.round(memoryUsage.heapUsed / 1024 / 1024)} MB`);
  console.log(`- Request count: ${Object.keys(requestData).length}`);

  res.end('Request processed');
});

server.listen(8081);