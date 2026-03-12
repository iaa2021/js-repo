//const http = require('http');
import http from 'http';
// This object will store data for each request
const requestData = {};

const server = http.createServer((req, res) => {
  const requestId = Date.now() + Math.random().toString(36).substring(2, 15);


  // Store data in the global object
  requestData[requestId] = {
    url: req.url,
    method: req.method,
    timestamp: Date.now()
  };

  // Clean up after the response is sent (FIX FOR THE MEMORY LEAK)
  res.on('finish', () => {
    delete requestData[requestId];
    console.log(`Cleaned up request ${requestId}`);
  });

  res.end('Request processed');
});

server.listen(8081);