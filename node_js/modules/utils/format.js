const util = require('util');

// Basic formatting
const formatted = util.format('Hello, %s!', 'World');
console.log(formatted); // 'Hello, World!'

// Multiple placeholders
const multiFormatted = util.format(
  'My name is %s. I am %d years old and I love %s.',
  'Kai',
  30,
  'Node.js'
);
console.log(multiFormatted);
// 'My name is Kai. I am 30 years old and I love Node.js.'

// Available specifiers
const specifiers = util.format(
  'String: %s, Number: %d, JSON: %j, Character: %c',
  'hello',
  42,
  { name: 'Object' },
  65  // ASCII code for 'A'
);
console.log(specifiers);

// Extra arguments are concatenated with spaces
const extra = util.format('Hello', 'World', 'from', 'Node.js');
console.log(extra); // 'Hello World from Node.js'
