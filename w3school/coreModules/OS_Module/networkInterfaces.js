 const os = require('os');

// Get network interfaces
const networkInterfaces = os.networkInterfaces();
console.log('Network Interfaces:');
console.log(JSON.stringify(networkInterfaces, null, 2));

// Iterate through network interfaces
Object.keys(networkInterfaces).forEach((interfaceName) => {
  console.log(`\nInterface: ${interfaceName}`);

  networkInterfaces[interfaceName].forEach((interface) => {
    console.log(` Address Family: ${interface.family}`);
    console.log(` IP Address: ${interface.address}`);
    console.log(` Netmask: ${interface.netmask}`);
    if (interface.mac) {
      console.log(` MAC Address: ${interface.mac}`);
    }
    console.log(` Internal: ${interface.internal ? 'Yes' : 'No'}`);
  });
});

// Function to get primary IPv4 address (non-internal)
function getPrimaryIPv4Address() {
  const interfaces = os.networkInterfaces();
  for (const name of Object.keys(interfaces)) {
    for (const interface of interfaces[name]) {
      // Skip internal and non-IPv4 addresses
      if (!interface.internal && interface.family === 'IPv4') {
        return interface.address;
      }
    }
  }
  return 'No IPv4 address found';
}

console.log(`\nPrimary IPv4 Address: ${getPrimaryIPv4Address()}`);