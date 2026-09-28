import tls from 'tls';
import fs from 'fs';
const options = {
    key : fs.readFileSync('./server-key.pem'),
    cert : fs.readFileSync('./server-cert.pem')
};
const server = tls.createServer(options, (socket) => {
    console.log('Tls client connected');
    socket.on('data', (data) => {
        console.log('Received data from client:', data.toString());
        socket.write(`Server response: ${data.toString()}`);
    });
    socket.on('end', () => {
        console.log('Tls client disconnected');
    });
});
server.listen(3000, () => {
    console.log('Tls server listening on port 3000');
});