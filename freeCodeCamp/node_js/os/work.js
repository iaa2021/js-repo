import os from 'os';

console.log('OS platform:', os.platform());
console.log('OS release:', os.release());
console.log('OS architecture:', os.arch());
console.log(os.type(), '\n', os.version());
console.log('CPU cores number:', os.cpus().length);
console.log('CPU cores:', os.cpus());
console.log('Total working time:', os.uptime());
const num = Math.pow(10, 9);
console.log('Total memory:', os.totalmem()/num, 'GB',
 '\nTotal free memory:', os.freemem()/num, 'GB');
console.log('Current userSelect: ', os.userInfo());
console.log('Current network interfaces: ', os.networkInterfaces());