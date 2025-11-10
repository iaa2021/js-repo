 const util = require('util');

// Basic usage
const obj = {
  name: 'John',
  age: 30,
  hobbies: ['reading', 'coding'],
  address: {
    city: 'New York',
    country: 'USA'
  },
  toString() {
    return `${this.name}, ${this.age}`;
  }
};

// Default inspection
console.log(util.inspect(obj));

// Custom options
console.log(util.inspect(obj, {
  colors: true, // Add ANSI color codes
  depth: 0, // Only inspect the first level
  showHidden: true, // Show non-enumerable properties
  compact: false, // Don't format objects on a single line
  showProxy: true, // Show proxy details
  maxArrayLength: 3, // Limit array elements displayed
  breakLength: 50, // Line break after 50 characters
  sorted: true // Sort object properties alphabetically
}));

// Circular references
const circular = { name: 'Circular' };
circular.self = circular;
console.log(util.inspect(circular));
