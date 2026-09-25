process.on('message', (message) => {
    console.log(`Received message from parent: ${message}`);
    process.send('Hello from child process, dear parent!');
});