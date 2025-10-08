const os = require('os');

function getSystemInfo() {
  const info = {
    os: {
      type: os.type(),
      platform: os.platform(),
      architecture: os.arch(),
      release: os.release(),
      hostname: os.hostname(),
      uptime: formatUptime(os.uptime())
    },
    user: {
      username: os.userInfo().username,
      homedir: os.homedir(),
      tempdir: os.tmpdir()
    },
    memory: {
      total: formatBytes(os.totalmem()),
      free: formatBytes(os.freemem()),
      usage: `${((1 - os.freemem() / os.totalmem()) * 100).toFixed(2)}%`
    },
    cpu: {
      model: os.cpus()[0].model,
      cores: os.cpus().length,
      speed: `${os.cpus()[0].speed} MHz`
    }
  };

  return info;
}

function formatUptime(seconds) {
  const days = Math.floor(seconds / (60 * 60 * 24));
  const hours = Math.floor((seconds % (60 * 60 * 24)) / (60 * 60));
  const minutes = Math.floor((seconds % (60 * 60)) / 60);
  const secs = Math.floor(seconds % 60);

  return `${days}d ${hours}h ${minutes}m ${secs}s`;
}

function formatBytes(bytes) {
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  if (bytes === 0) return '0 Bytes';
  const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
  return `${(bytes / Math.pow(1024, i)).toFixed(2)} ${sizes[i]}`;
}

// Display the system information dashboard
const systemInfo = getSystemInfo();
console.log('======= SYSTEM INFORMATION DASHBOARD =======');
console.log(JSON.stringify(systemInfo, null, 2));

// Display in a more formatted way
console.log('\n======= FORMATTED SYSTEM INFORMATION =======');
console.log(`OS: ${systemInfo.os.type} (${systemInfo.os.platform} ${systemInfo.os.architecture})`);
console.log(`Version: ${systemInfo.os.release}`);
console.log(`Hostname: ${systemInfo.os.hostname}`);
console.log(`Uptime: ${systemInfo.os.uptime}`);
console.log(`User: ${systemInfo.user.username}`);
console.log(`Home Directory: ${systemInfo.user.homedir}`);
console.log(`CPU: ${systemInfo.cpu.model}`);
console.log(`Cores: ${systemInfo.cpu.cores}`);
console.log(`Speed: ${systemInfo.cpu.speed}`);
console.log(`Memory Total: ${systemInfo.memory.total}`);
console.log(`Memory Free: ${systemInfo.memory.free}`);
console.log(`Memory Usage: ${systemInfo.memory.usage}`);