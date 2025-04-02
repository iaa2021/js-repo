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