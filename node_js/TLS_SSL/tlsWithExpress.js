import express from 'express';
import https from 'https';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Recreate __filename and __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create Express app
const app = express();

// Define routes
app.get('/', (req, res) => {
  res.send('<h1>Secure Express App</h1><p>This connection is encrypted using TLS.</p>');
});

app.get('/api/data', (req, res) => {
  res.json({
    message: 'This is sensitive data',
    timestamp: new Date()
  });
});

// HTTPS server options
const options = {
  key: fs.readFileSync(path.join(__dirname, 'server-key.pem')),
  cert: fs.readFileSync(path.join(__dirname, 'server-cert.pem'))
};

// Create HTTPS server with Express app
const port = 8443;
https.createServer(options, app).listen(port, () => {
  console.log(`Secure Express app running on port ${port}`);
});