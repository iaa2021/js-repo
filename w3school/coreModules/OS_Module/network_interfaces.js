const os = require('os');

// Get network interfaces information
const networkInterfaces = os.networkInterfaces();

console.log('Network Interfaces:');

// Iterate over each network interface
Object.entries(networkInterfaces).forEach(([name, addresses]) => {
  console.log(`\nInterface: ${name}`);
  addresses.forEach((address) => {
    console.log(`- Family: ${address.family}`);
    console.log(` Address: ${address.address}`);
    console.log(` Netmask: ${address.netmask}`);
    console.log(` MAC: ${address.mac || 'N/A'}`);
    console.log(` Internal: ${address.internal}`);
  });
});

// Example: Find the first non-internal IPv4 address
function getLocalIpAddress() {
  const interfaces = os.networkInterfaces();
  for (const name of Object.keys(interfaces)) {
    for (const iface of interfaces[name]) {
      if (iface.family === 'IPv4' && !iface.internal) {
        return iface.address;
      }
    }
  }
  return '127.0.0.1'; // Fallback to localhost
}

const localIp = getLocalIpAddress();
console.log(`\nLocal IP Address: ${localIp}`);