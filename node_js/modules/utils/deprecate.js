 const util = require('util');

// Original function
function oldFunction(x, y) {
  return x + y;
}

// Deprecate the function
const deprecatedFunction = util.deprecate(
  oldFunction,
  'oldFunction() is deprecated. Use newFunction() instead.',
  'DEP0001'
);

// New function
function newFunction(x, y) {
  return x + y;
}

// Using the deprecated function will show a warning
console.log('Result:', deprecatedFunction(5, 10));

// Using the new function
console.log('Result:', newFunction(5, 10));
