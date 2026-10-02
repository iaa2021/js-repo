import tls from 'tls';
import readline from 'readline';
import fs from 'fs';
import path from 'path';
import { PORT } from './config.js';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const options = {
  host: 'localhost',
  port: PORT,
  key: fs.readFileSync(path.join(__dirname, 'certs', 'client-key.pem')),
  cert: fs.readFileSync(path.join(__dirname, 'certs', 'client-cert.pem')),
  ca: [fs.readFileSync(path.join(__dirname, 'certs', 'server-cert.pem'))],
  rejectUnauthorized: true,
};
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: 'myTLSChat> ',
});
const client = tls.connect(PORT, options, () => {
  console.log('Connected to the TLS chat server.');
  rl.prompt();
});

client.setEncoding('utf8');
rl.on('line', (line) => {
  const message = line.trim();
    if (message.toLowerCase() === 'exit') {
    client.end();
    rl.close(); return;
  }
  rl.prompt();
    client.write(message);
});
client.on('data', (data) => {
  console.log(data.toString().trim());
    rl.prompt();
});
rl.on('close', () => {
  console.log('Exiting the chat client.');
  client.end();
});
client.on('end', () => {
  console.log('Disconnected from the TLS chat server.');
  rl.close();
});
client.on('error', (err) => {
  console.error('Error:', err.message);
  rl.close();
});
  
