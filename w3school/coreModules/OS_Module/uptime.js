 const os = require('os');

// Get system uptime in seconds
const uptime = os.uptime();
console.log(`System Uptime: ${uptime} seconds`);

// Format uptime in a more readable way
const uptimeDays = Math.floor(uptime / (60 * 60 * 24));
const uptimeHours = Math.floor((uptime % (60 * 60 * 24)) / (60 * 60));
const uptimeMinutes = Math.floor((uptime % (60 * 60)) / 60);
const uptimeSeconds = Math.floor(uptime % 60);

console.log(`System has been running for: ${uptimeDays} days,\
     ${uptimeHours} hours, ${uptimeMinutes} minutes, ${uptimeSeconds} seconds`);