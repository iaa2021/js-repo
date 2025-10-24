const buffer1 = Buffer.from('Hello');
const buffer2 = Buffer.from('Hello');
const buffer3 = Buffer.from('World');

console.log(buffer1.equals(buffer2));

console.log(buffer1.equals(buffer3));

console.log(buffer1 === buffer2)