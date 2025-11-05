const assert = require('assert');

try {
  // This always throws an AssertionError
  assert.fail('This test always fails');
} catch (err) {
  console.error(`Error: ${err.message}`);
}