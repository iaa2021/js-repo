 const util = require('util');
const fs = require('fs');

// Convert fs.readFile from callback-based to Promise-based
const readFilePromise = util.promisify(fs.readFile);

// Now we can use it with async/await or Promise chaining
async function readFileExample() {
  try {
    // Using the promisified function
    const data = await readFilePromise('package.json', 'utf8');
    console.log('File content:', data.substring(0, 100) + '...');
    
    // Error handling with try/catch
    return 'File read successfully';
  } catch (err) {
    console.error('Error reading file:', err.message);
    return 'Error reading file';
  }
}

readFileExample().then(result => {
  console.log('Result:', result);
});