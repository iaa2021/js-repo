const assert = require('assert');

// This will pass
assert.doesNotThrow(() => {
  return 'no error';
});

try {
  // This will throw the original error
  assert.doesNotThrow(() => {
    throw new Error('This will be thrown');
  }, 'Unexpected error');
} catch (err) {
  console.error(`Error: ${err.message}`);
}