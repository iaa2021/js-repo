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
    r: true 
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
const newFunct = () =>{
    console.log("Hello, with new function")
}
newFunct()
