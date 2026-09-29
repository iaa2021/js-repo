import tls from 'tls';
import fs from 'fs';
const socket = tls.connect({ port: 3000, 
    host: 'localhost', 
    ca: [fs.readFileSync('./server-cert.pem')]
 }, () => {
    console.log('Connected to TLS server');
    
    socket.write('GET / HTTP/1.1\r\n' + 
    'Host: localhost\r\n' +
    'Connection: close\r\n' +
    '\r\n');
});
socket.on('secureConnect', () => {
        console.log('TLS handshake completed');
    });
socket.on('secureConnect', () => {
    const sertificate = socket.getPeerCertificate();
    if (sertificate) {
        console.log('Server certificate:', JSON.stringify(sertificate, null, 2));
    } else {
        console.log('No server certificate available');
    }
});
socket.on('secureConnect', () => {
    const cipher = socket.getCipher();
    console.log('Cipher used for the connection:', cipher);
});
socket.on('secureConnect', () => {
    console.log('Authorized:',socket.authorized);
});
socket.on('data', (data) => {
    console.log('Received data from server:', data.toString());
});
socket.on('error', (err) => {
    console.error('Error connecting to TLS server:', err);
});
socket.on('end', () => {
    console.log('Disconnected from TLS server');
});