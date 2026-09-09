import readline from 'readline';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function myQuestion(query) {
  return new Promise((resolve) => {
    rl.question(query, resolve);
  });
}

async function main() {
  const name = await myQuestion('What is your name? ');
  console.log(`Hello, ${name}!`);
  console.log('This is a simple command-line interface (CLI) example.');
  console.log('Type a command or "exit" to quit, "greet" to be greeted,\
    "time" for current time, "date" for today\'s date):');
    rl.on('line', (input) => {
        switch (input.trim().toLocaleLowerCase()) {
            case 'exit':
                console.log('Exiting the CLI. Goodbye!');
                rl.close();
                break;
            case 'greet':
                console.log(`Hello, ${name}! Nice to meet you!`);
                break;
            case 'time':
                console.log(`Current time is: ${new Date().toLocaleTimeString()}`);
                break;
            case 'date':
                console.log(`Today's date is: ${new Date().toLocaleDateString()}`);
                break;
            default:
                console.log(`Unknown command: ${input}. Please try again.`);
        }
    });
}

main();