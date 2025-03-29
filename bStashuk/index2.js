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
myArray.push('abc')
console.log(myArray)
myArray.unshift('xyz')
console.log(myArray)
myArray.forEach(element => { 
    console.log(element * 3)
});