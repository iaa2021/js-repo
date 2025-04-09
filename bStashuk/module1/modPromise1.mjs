import getData from "./modPromise.mjs";
getData('https://jsonplaceholder.typicode.com/guide/')
.then(data => console.log(data))
.catch(error => console.log(error))