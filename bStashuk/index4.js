const someObj = {
    a: 10,
    r: true, 
    c: 'black'
}
for( key in someObj){
    console.log(key,':', someObj[key])
    if(someObj[key] === 'black')
        someObj[key] = 'green'
}
let myArray = [1, 2, 3]
for(key in myArray){
    console.log(key, '-', myArray[key])
}
console.table(someObj)
Object.keys(someObj).forEach(element => {
    console.log(element, someObj[element])
}); // using keys method
Object.values(someObj).forEach(element => {
    console.log(element)
}); // using values method
const myString = 'Hello world.'
for( key of myString ){
    console.log(key)
}
let jsText = JSON.stringify(someObj);
console.log(jsText);
someObj1 = JSON.parse(jsText);
console.log(someObj1);