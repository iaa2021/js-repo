 const { setTimeout } = require('timers/promises');

async function delayedGreeting() {
  console.log('Starting...');

  // Wait for 2 seconds
  await setTimeout(2000);

  console.log('After 2 seconds');

  // Wait for 1 second with a value
  const result = await setTimeout(1000, 'Hello, World!');

  console.log('After 1 more second:', result);
}

delayedGreeting().catch(console.error);
