const util = require('util');
const fs = require('fs');

// Convert callback-based fs.readFile to Promise-based
const readFile = util.promisify(fs.readFile);
// Format strings with placeholders
const greeting = util.format('Hello, %s! Today is %s', 'Developer', new Date().toDateString());
console.log(greeting);
// Inspect an object with custom options
const obj = {
  name: 'Test',
  nested: { a: 1, b: [2, 3] },
  fn: function() { return 'test'; }
};
console.log(util.inspect(obj, { colors: true, depth: 2 }));
// Use debug logging
const debug = util.debuglog('app');
debug('This will only show if NODE_DEBUG=app');
// Example of using promisify with async/await
async function readConfig() {
  try {
    const data = await readFile('package.json', 'utf8');
    console.log('Package name:', JSON.parse(data).name);
  } catch (err) {
    console.error('Error reading config:', err);
  }
}
readConfig();
