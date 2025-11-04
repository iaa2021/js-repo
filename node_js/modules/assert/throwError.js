const assert = require('assert');

// Function that throws an error
function throwingFunction() {
  throw new Error('Error thrown');
}

// This will pass
assert.throws(throwingFunction);

// Check for a specific error message
assert.throws(
  throwingFunction,
  /Error thrown/,
  'Unexpected error message'
);

// Check for a specific error type
assert.throws(
  throwingFunction,
  Error,
  'Wrong error type'
);

// Check with a validation function
assert.throws(
  throwingFunction,
  function(err) {
    return err instanceof Error && /thrown/.test(err.message);
  },
  'Error validation failed'
);

try {
  // This will throw an AssertionError
  assert.throws(() => {
    // This function doesn't throw
    return 'no error';
  }, 'Expected function to throw');
} catch (err) {
  console.error(`Error: ${err.message}`);
}
