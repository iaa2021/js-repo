import {Buffer} from 'buffer';
import fs from 'fs/promises';
// Create a buffer from a string
const myStrBuffer = Buffer.from("freeCodeCamp");
console.log(myStrBuffer);
// Create a buffer from an array of numbers
const myNumBuffer = Buffer.from([
  70, 82, 69, 69, 67, 79, 68, 69, 67, 65, 77, 80,
]);
console.log(myNumBuffer);
console.log("With toString() method");
console.log(myStrBuffer.toString());
console.log(myNumBuffer.toString());
const someBuffer = Buffer.alloc(10);
console.log(someBuffer);
someBuffer.write("Hello fCC");
console.log(someBuffer); 
console.log(someBuffer.toString()); 
let myMessage = "Hello, my dear friends. All of you!"
const myBuffer = Buffer.alloc(myMessage.length);
myBuffer.write(myMessage);
console.log(myBuffer.toString());
const myImgBuffer = await fs.readFile("cables.jpg");
console.log("My image:", myImgBuffer);
console.log("Image size:", myImgBuffer.length, "bytes");