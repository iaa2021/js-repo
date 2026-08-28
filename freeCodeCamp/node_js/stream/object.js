import { Readable, Writable, Transform } from 'stream';
const objectReadable = new Readable({
    objectMode: true,
    read() {
        this.push({ name: 'Alice', age: 30 });
        this.push({ name: 'Bob', age: 25 });
        this.push(null); // No more data
    } });

const objectTransform = new Transform({
    objectMode: true,
    transform(chunk, encoding, callback) {
        chunk.transformed = true;
        chunk.timestamp = new Date();
        this.push(chunk);
        callback();
    } });

const objectWritable = new Writable({
    objectMode: true,
    write(chunk, encoding, callback) {
        console.log('Received object:', chunk);
        callback();
    } });

objectReadable.pipe(objectTransform).pipe(objectWritable);
objectReadable.push({ name: 'Charlie', age: 28 });
objectReadable.push({ name: 'Diana', age: 32 });
objectReadable.push(null); // No more data
objectReadable.on('data', (chunk) => {
    console.log('Readable emitted:', chunk);
});
objectReadable.on('end', () => {
    console.log('Readable stream ended.');
});