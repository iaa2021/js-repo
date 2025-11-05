 // Basic usage
setTimeout(() => {
  console.log('This message is displayed after 2 seconds');
}, 2000);

// With arguments
setTimeout((name) => {
  console.log(`Hello, ${name}!`);
}, 1000, 'World');

// Storing and clearing a timeout
const timeoutId = setTimeout(() => {
  console.log('This will never be displayed');
}, 5000);

// Cancel the timeout before it executes
clearTimeout(timeoutId);
console.log('Timeout has been cancelled');
// user inputs his name
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Enter your name: ', (name) => {
  rl.question('Enter your age: ', (age) => {
    setTimeout(() => {
      console.log(`Hello, ${name}! You are ${age} years old.`);
      rl.close();
    }, 2000); // wait 2 seconds
  });
});