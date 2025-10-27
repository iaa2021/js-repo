const crypto = require('crypto');

// Generate random bytes
const randomBytes = crypto.randomBytes(16);
console.log('Random bytes:', randomBytes.toString('hex'));

// Generate a random string (Base64)
const randomString = crypto.randomBytes(32).toString('base64');
console.log('Random string:', randomString);

// Generate a random number between 1 and 100
function secureRandomNumber(min, max) {
  // Ensure we have enough randomness
  const range = max - min + 1;
  const bytesNeeded = Math.ceil(Math.log2(range) / 8);
  const maxValue = 256 ** bytesNeeded;

  // Generate random bytes and convert to a number
  const randomBytes = crypto.randomBytes(bytesNeeded);
  const randomValue = randomBytes.reduce((acc, byte, i) => {
    return acc + byte * (256 ** i);
  }, 0);

  // Scale to our range and shift by min
  return min + Math.floor((randomValue * range) / maxValue);
}

// Example: Generate 5 random numbers
for (let i = 0; i < 5; i++) {
  console.log(`Random number ${i+1}:`, secureRandomNumber(1, 100));
}