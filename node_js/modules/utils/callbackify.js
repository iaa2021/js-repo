 const util = require('util');

// A Promise-based function
async function fetchUserData(id) {
  if (!id) {
    throw new Error('ID is required');
  }
  
  // Simulate API request
  return {
    id,
    name: `User ${id}`,
    email: `user${id}@example.com`
  };
}

// Convert to callback-based
const fetchUserDataCallback = util.callbackify(fetchUserData);

// Using the callback-based function
fetchUserDataCallback(1, (err, user) => {
  if (err) {
    console.error('Error:', err);
    return;
  }
  
  console.log('User data:', user);
});

// Error handling
fetchUserDataCallback(null, (err, user) => {
  if (err) {
    console.error('Error occurred:', err.message);
    return;
  }
  
  console.log('User data:', user); // This won't execute
});