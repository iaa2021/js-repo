var myArray = [10, 'Bill', 24, "Hello world"];
console.log(myArray)
myArray.forEach((el) => {console.log(el)})
myArray[2] = 'Anna'
console.log(myArray)
myArray.unshift(557)
myArray.push('Jane')
console.log(myArray)
console.log(JSON.stringify(myArray))
function testEqual(value){
    if( value === 12){
        console.log("equal");
    }
    else{
        console.log("not equal");
    }
}
testEqual(12)