console.log("Hello, World!")
console.log("My first message!")
c = 10
console.log('variable c = ', c)
b = null
console.log('variable b = ', b) 
Object(d = c) // init a reference
console.log('object d = ', d)
const someObj = {
    a: 10,
    r: true, 
    c
}// another way of reference's init
console.log('object someObj = ', someObj.a,', ', someObj.r)
const copyOfSomeObj = someObj
console.log('copyOfSomeObj = ', copyOfSomeObj.a,', ', copyOfSomeObj.r)
copyOfSomeObj.k = 'abc'
console.log('copyOfSomeObj with new k = ', copyOfSomeObj.a, copyOfSomeObj.r, copyOfSomeObj.k )
function a() {
    console.log('Hey there')
}
a()
const newFunct = (l, m) =>{
    console.log("Hello, with new function")
    const i = l + m
    console.log(i)
    return i
}
let u = newFunct(7, 8)
console.dir(someObj)
console.log(someObj)
const strSomeObj = JSON.stringify(someObj)
console.log(strSomeObj)
console.log(JSON.parse(strSomeObj))
console.dir(newFunct)