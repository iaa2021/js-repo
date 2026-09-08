import readline from 'readline';
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('What is your name? ', (name) => {
    rl.question('Enter a number: ', (number) => {
    //const num = parseInt(number);
    const num = Number(number);
    console.log(`Hello, dear ${name}!`);
    console.log(`You entered the number: ${num}`);
    console.log(`The square of ${num} is: ${num * num}`);
    rl.close();
    });   
}); // put one question inside another question to get the name and number from the user.