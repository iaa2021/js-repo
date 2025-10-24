const fs = require('fs');

// Write buffer to file
const writeBuffer = Buffer.from('Hello, Node.js!');
fs.writeFile('buffer.txt', writeBuffer, (err) => {
  if (err) throw err;
  console.log('File written successfully');

  // Read file into buffer
  fs.readFile('buffer.txt', (err, data) => {
    if (err) throw err;
    
    // 'data' is a buffer
    console.log('Read buffer:', data);
    console.log('Buffer content:', data.toString());

    // Read only part of the file into a buffer
    const smallBuffer = Buffer.alloc(5);
    fs.open('buffer.txt', 'r', (err, fd) => {
      if (err) throw err;

      // Read 5 bytes starting at position 7
      fs.read(fd, smallBuffer, 0, 5, 7, (err, bytesRead, buffer) => {
        if (err) throw err;

        console.log('Partial read:', buffer.toString());
        // Output: Node.

        fs.close(fd, (err) => {
          if (err) throw err;
        });
      });
    });
  });
});
