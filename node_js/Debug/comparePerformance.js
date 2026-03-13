// Inefficient recursive Fibonacci function
function inefficientFibonacci(n) {
  if (n <= 1) return n;
  return inefficientFibonacci(n - 1) + inefficientFibonacci(n - 2);
}

// More efficient iterative Fibonacci function
function efficientFibonacci(n) {
  if (n <= 1) return n;

  let a = 0, b = 1, temp;
  for (let i = 2; i <= n; i++) {
    temp = a + b;
    a = b;
    b = temp;
  }

  return b;
}

// Compare the performance
function comparePerformance(n) {
  console.log(`Calculating Fibonacci(${n})`);

  // Time the inefficient version
  const inefficientStart = process.hrtime.bigint();
  const inefficientResult = inefficientFibonacci(n);
  const inefficientEnd = process.hrtime.bigint();
  const inefficientTime = Number(inefficientEnd - inefficientStart) / 1_000_000; // in ms

  // Time the efficient version
  const efficientStart = process.hrtime.bigint();
  const efficientResult = efficientFibonacci(n);
  const efficientEnd = process.hrtime.bigint();
  const efficientTime = Number(efficientEnd - efficientStart) / 1_000_000; // in ms

  console.log(`Inefficient: ${inefficientResult} (${inefficientTime.toFixed(2)} ms)`);
  console.log(`Efficient: ${efficientResult} (${efficientTime.toFixed(2)} ms)`);
  console.log(`Speedup: ${Math.round(inefficientTime / efficientTime)}x`);
}

// Run the comparison
comparePerformance(30);