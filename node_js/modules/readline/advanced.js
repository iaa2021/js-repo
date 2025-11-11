 const readline = require('readline');
const fs = require('fs');

// Create an interface with advanced options
const rl = readline.createInterface({
  input: fs.createReadStream('input.txt'), // Read from file
  output: process.stdout, // Write to console
  terminal: false, // Input is not a terminal
  historySize: 100, // Larger history
  removeHistoryDuplicates: true, // Don't store duplicate commands
  prompt: 'CLI> ', // Custom prompt
  crlfDelay: Infinity, // Handle all CR/LF as single line break
  escapeCodeTimeout: 200 // Faster escape code detection
});

// Handle each line from the file
rl.on('line', (line) => {
  console.log(`Processing: ${line}`);
});

// Handle end of file
rl.on('close', () => {
  console.log('Finished processing file');
});