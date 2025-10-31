 const dns = require('dns');

// Look up a domain name
dns.lookup('example.com', (err, address, family) => {
  if (err) {
    console.error('Lookup error:', err);
    return;
  }
  console.log(`IP address: ${address}`);
  console.log(`IP version: IPv${family}`);
});