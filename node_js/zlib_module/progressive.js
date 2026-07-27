import zlib from 'zlib';
import { Transform } from 'stream';
import { Readable } from 'stream';

class ProgressTracker extends Transform {
  constructor(options = {}) {
    super(options);
    this.processedBytes = 0;
    this.startTime = Date.now();
  }
  
  _transform(chunk, encoding, callback) {
    this.processedBytes += chunk.length;
    const elapsed = (Date.now() - this.startTime) / 1000;
    const rate = (this.processedBytes / 1024 / 1024 / elapsed).toFixed(2);
    
    process.stdout.write(`\rProcessed: ${(this.processedBytes / 1024 / 1024).toFixed(2)} MB | ` +
                       `Rate: ${rate} MB/s`);
    
    this.push(chunk);
    callback();
  }
}

// Simulate processing a large file
function processLargeFile() {
  const gzip = zlib.createGzip({ level: 6 });
  const progress = new ProgressTracker();
  
  // Generate 100MB of random data
  const data = Buffer.alloc(1024 * 1024 * 100);
  
  // Create a readable stream from buffer
  
  const readable = Readable.from(data);
  
  console.log('Starting compression...');
  
  readable
    .pipe(progress)
    .pipe(gzip)
    .pipe(process.stdout);
    
  gzip.on('end', () => {
    console.log('\nCompression complete!');
  });
}

// Uncomment to run (creates a large file)
processLargeFile();