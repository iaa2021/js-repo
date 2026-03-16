import assert from "assert";
import http from "http";
import app  from './app.js';

// Start the server
const server = app.listen(8081);

// Make a request to the API
http.get('http://localhost:8081/users', (res) => {
  let data = '';
  
  res.on('data', (chunk) => {
    data += chunk;
  });
  
  res.on('end', () => {
    const users = JSON.parse(data);
    
    // Verify the response
    assert.strictEqual(res.statusCode, 200, 'Status code should be 200');
    assert.strictEqual(users.length, 2, 'Should return two users');
    assert.strictEqual(users[0].name, 'Alice', 'First user should be Alice');
    assert.strictEqual(users[1].name, 'Bob', 'Second user should be Bob');
    
    console.log('API test passed!');
    
    // Close the server
    server.close();
  });
}).on('error', (err) => {
  console.error('Test failed:', err);
  server.close();
});