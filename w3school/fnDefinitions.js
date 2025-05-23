const myFn = Function('a', 'b', 'return a + b');
let x = myFn(5, 44);
console.log(x);
(function() {
    let y = 'Hello, world!';
    console.log(y);
})();//Self-Invoking Function, running without invoke
let text = myFn.toString();
console.log(text);
let c = (x, y = 10) => x + y;// an arrow function with default value
console.log(c(5));
function sum(...args) {
    let sum1 = 0;
    for (let arg of args) 
        {sum1 += arg;}
    return sum1;
  }
  
  let x1 = sum(4, 9, 16, 25, 29, 100, 66, 77);
  console.log(x1);