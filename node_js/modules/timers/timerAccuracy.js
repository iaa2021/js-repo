 const desiredDelay = 100; // 100ms
const start = Date.now();

setTimeout(() => {
  const actualDelay = Date.now() - start;
  console.log(`Desired delay: ${desiredDelay}ms`);
  console.log(`Actual delay: ${actualDelay}ms`);
  console.log(`Difference: ${actualDelay - desiredDelay}ms`);
}, desiredDelay);