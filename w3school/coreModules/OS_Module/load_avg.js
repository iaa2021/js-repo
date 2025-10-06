const os = require('os');

// Get load averages
const loadAverages = os.loadavg();
console.log('System Load Averages (1, 5, 15 min):', loadAverages);

// On Linux/Unix, load average represents the average system load over the last 1, 5, and 15 minutes
// The values represent the number of processes in the system run queue
const [oneMin, fiveMin, fifteenMin] = loadAverages;
const cpuCount = os.cpus().length;

console.log(`1-minute load average: ${oneMin.toFixed(2)} (${(oneMin / cpuCount * 100).toFixed(1)}% of ${cpuCount} cores)`);
console.log(`5-minute load average: ${fiveMin.toFixed(2)}`);
console.log(`15-minute load average: ${fifteenMin.toFixed(2)}`);

// Example: Check if system is under heavy load
const isSystemOverloaded = oneMin > cpuCount * 1.5;
if (isSystemOverloaded) {
  console.warn('Warning: System is under heavy load!');
} else {
  console.log('System load is normal');
}