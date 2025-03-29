const fnWithError = () =>{
    throw new Error('Some error')
}
try {
    fnWithError()
} catch (error) {
    console.error(error)
    console.log(error.message)
}
console.log('Continue...')
let myArray = [1, 2, 3]
console.table(myArray)
const myArray1 = new Array(1, 'a', 'abc', 4, 7)
console.dir( myArray1)
myArray1.push('abc')
console.log(myArray)
myArray1.unshift('xyz')
console.log(myArray1)
myArray.forEach(element => { 
    console.log(element * 3)
});
const newArray = myArray.map((el) => {
    return el * 10
})
console.log(newArray)
// instead of arrow function anonimus function statement can be used
// const newArray = myArray.map(function(el) {
//   return el * 10
//})