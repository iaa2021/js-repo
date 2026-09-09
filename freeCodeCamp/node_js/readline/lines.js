import readline from 'readline';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
console.log('Enter some text (type "exit" to quit):');

rl.on('line', (input) => {
  if (input.trim().toLowerCase() === 'exit') {
    console.log('Exiting...');
    rl.close();
  } else {
    console.log(`You entered: ${input}`);
  }
});