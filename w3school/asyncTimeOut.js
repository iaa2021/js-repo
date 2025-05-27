async function myDisplay() {
  let myPromise = new Promise(function(resolve) {
    setTimeout(function() {resolve("I love You !!");}, 4000);
  });
  console.log(await myPromise);
}

myDisplay();
function myDisplayer(some) {
  console.log(some);
}

async function myFunction() {return "Hello from async function.";}

myFunction().then(
  function(value) {myDisplayer(value);},
  function(error) {myDisplayer(error);}
);