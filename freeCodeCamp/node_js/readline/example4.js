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

  console.log(`Hello, dear ${name}!`);

  const number = await myQuestion('Enter a number: ');
  
  let num = parseInt(number, 10);
    while(Number.isNaN(num)) {
    console.log('Please enter a valid number.');
    const newNumber = await myQuestion('Enter a number: ');
    num = parseInt(newNumber, 10); 
  }
    
    console.log(`You entered the number: ${num}`);
    console.log(`The square of ${num} is: ${num * num}`);

  const city = await myQuestion('What city do you live in? ');
    console.log(`You live in ${city}.`);
    rl.close();
}

main();
