'use strict'
function myName(){
    console.log('My name is Andrey')
}
console.log('Start')
setTimeout(myName, 2000)
let a = 'abc'
console.log('variable a is a ', typeof(a))
let b = 11
let c = 27
console.log('c yelds to b is ', Boolean(b === c))
const button = {
    width: 200,
    text: 'Buy'
}
const redButton = {
    ...button, 
    color: 'red'
}
console.table(redButton)
const newPost = (post, addedAt = Date()) => ({
    ... post,
    addedAt
})
console.table(newPost(redButton))