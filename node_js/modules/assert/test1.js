const assert = require('assert');

// This will pass
assert(true);
assert(1);
assert('string');
assert({});

try {
  // This will throw an AssertionError
  assert(false, 'This value is not truthy');
} catch (err) {
  console.error(`Error: ${err.message}`);
}

try {
  // These will also throw errors
  assert(0);
  assert('');
  assert(null);
  assert(undefined);
} catch (err) {
  console.error(`Error: ${err.message}`);
}