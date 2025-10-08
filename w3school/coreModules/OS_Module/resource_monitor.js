 const os = require('os');

function monitorResources() {
  console.clear(); // Clear console for a cleaner display

  const now = new Date().toLocaleTimeString();
  console.log(`======= RESOURCE MONITOR (${now}) =======`);

  // CPU Usage
  const cpus = os.cpus();
  console.log(`\nCPU Cores: ${cpus.length}`);

  // Calculate CPU usage (this is approximate since we need two measurements)
  const cpuUsage = cpus.map((cpu, index) => {
    const total = Object.values(cpu.times).reduce((acc, tv) => acc + tv, 0);
    const idle = cpu.times.idle;
    const usage = ((total - idle) / total * 100).toFixed(1);
    return `Core ${index}: ${usage}% used`;
  });

  console.log(cpuUsage.join('\n'));

  // Memory Usage
  const totalMem = os.totalmem();
  const freeMem = os.freemem();
  const usedMem = totalMem - freeMem;

  console.log('\nMemory Usage:');
  console.log(`Total: ${formatBytes(totalMem)}`);
  console.log(`Used: ${formatBytes(usedMem)} (${(usedMem / totalMem * 100).toFixed(1)}%)`);
  console.log(`Free: ${formatBytes(freeMem)} (${(freeMem / totalMem * 100).toFixed(1)}%)`);

  // System Uptime
  console.log(`\nSystem Uptime: ${formatUptime(os.uptime())}`);

  // Process Info
  console.log('\nProcess Information:');
  console.log(`PID: ${process.pid}`);
  console.log(`Memory Usage: ${formatBytes(process.memoryUsage().rss)}`);
  console.log(`User: ${os.userInfo().username}`);
}

function formatBytes(bytes) {
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  if (bytes === 0) return '0 Bytes';
  const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
  return `${(bytes / Math.pow(1024, i)).toFixed(2)} ${sizes[i]}`;
}

function formatUptime(seconds) {
  const days = Math.floor(seconds / (60 * 60 * 24));
  const hours = Math.floor((seconds % (60 * 60 * 24)) / (60 * 60));
  const minutes = Math.floor((seconds % (60 * 60)) / 60);
  const secs = Math.floor(seconds % 60);

  return `${days}d ${hours}h ${minutes}m ${secs}s`;
}

// Initial display
monitorResources();

// Update every second (note: in a real application, you might not want
// to update this frequently as it uses CPU resources)
const intervalId = setInterval(monitorResources, 1000);

// In a real application, you would need to handle cleanup:
// clearInterval(intervalId);

// For this example, we'll run for 10 seconds then stop
console.log('Monitor will run for 10 seconds...');
setTimeout(() => {
  clearInterval(intervalId);
  console.log('\nResource monitoring stopped.');
}, 10000);
