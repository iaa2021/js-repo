 import tls from 'tls';
import fs from 'fs';

let savedSession;

// =========================
// Server Options
// =========================
const serverOptions = {
    // Server identity
    key: fs.readFileSync('server-key.pem'),
    cert: fs.readFileSync('server-cert.pem'),

    // Trusted CA
    ca: fs.readFileSync('ca-cert.pem'),

    // TLS versions
    minVersion: 'TLSv1.2',
    maxVersion: 'TLSv1.3',

    // Cipher suites (TLS 1.2)
    ciphers:
        'ECDHE-RSA-AES128-GCM-SHA256:' +
        'ECDHE-RSA-AES256-GCM-SHA384',

    honorCipherOrder: true,

    // Require client certificate
    requestCert: true,
    rejectUnauthorized: true,

    // ALPN (HTTP/2 vs HTTP/1.1 example)
    ALPNProtocols: ['h2', 'http/1.1'],

    // Session timeout
    sessionTimeout: 300
};

// =========================
// Create Server
// =========================
const server = tls.createServer(serverOptions, (socket) => {

    console.log('\n=== Client Connected ===');

    console.log('Authorized:', socket.authorized);

    if (!socket.authorized)
        console.log(socket.authorizationError);

    console.log('Protocol:', socket.getProtocol());

    console.log('Cipher:', socket.getCipher());

    console.log('ALPN:', socket.alpnProtocol);

    console.log('Remote Address:', socket.remoteAddress);

    const cert = socket.getPeerCertificate();

    if (cert.subject)
        console.log('Client CN:', cert.subject.CN);

    socket.write('Hello secure client!\n');

    socket.on('data', data => {
        console.log('Client says:', data.toString());
    });

    socket.on('error', err => {
        console.error(err.message);
    });

    socket.on('close', () => {
        console.log('Client disconnected');
    });
});

server.on('tlsClientError', err => {
    console.error('TLS Error:', err.message);
});

server.listen(8443, () => {
    console.log('TLS server listening on port 8443');

    startClient();
});

// =========================
// Client
// =========================
function startClient() {

    const clientOptions = {

        // Client identity
        key: fs.readFileSync('client-key.pem'),
        cert: fs.readFileSync('client-cert.pem'),

        // Trusted CA
        ca: fs.readFileSync('ca-cert.pem'),

        // Host
        host: 'localhost',
        port: 8443,

        // Certificate hostname
        servername: 'localhost',

        // TLS versions
        minVersion: 'TLSv1.2',
        maxVersion: 'TLSv1.3',

        // Verify certificate
        rejectUnauthorized: true,

        // ALPN
        ALPNProtocols: ['h2', 'http/1.1'],

        // Optional session reuse
        session: savedSession,

        // Custom hostname verification
        checkServerIdentity(hostname, cert) {

            console.log('\nChecking certificate...');

            if (hostname !== cert.subject.CN) {
                return new Error(
                    `Hostname ${hostname} != ${cert.subject.CN}`
                );
            }

            return undefined;
        }
    };

    const client = tls.connect(clientOptions, () => {

        console.log('\n=== Connected to Server ===');

        console.log('Authorized:', client.authorized);

        console.log('Protocol:', client.getProtocol());

        console.log('Cipher:', client.getCipher());

        console.log('ALPN:', client.alpnProtocol);

        client.write('Hello TLS server!');
    });

    // Save TLS session for reuse
    client.on('session', session => {
        console.log('TLS session received.');
        savedSession = session;
    });

    client.on('data', data => {
        console.log('Server:', data.toString());
    });

    client.on('error', err => {
        console.error(err.message);
    });

    client.on('close', () => {
        console.log('Connection closed');
        server.close();
    });
}