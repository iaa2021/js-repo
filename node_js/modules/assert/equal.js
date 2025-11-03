const assert = require('assert');

// These will pass (coercive equality)
assert.equal(1, 1);
assert.equal('1', 1); // String is coerced to number
assert.equal(true, 1); // Boolean is coerced to number

try {
  // This will throw an error
  assert.equal(1, 2, '1 is not equal to 2');
} catch (err) {
  console.error(`Error: ${err.message}`);
}