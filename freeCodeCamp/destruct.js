const stats = {
    max : 56.78,
    stand_dev : 4.34,
    mode : 34.54,
    min : -0.75,
    average : 35.85
}
const half = (() =>{
    return function half({max, min}){
        return (max + min)/2.0
    }
})()
console.table(stats)
console.log(half(stats))
const persona = {
    name: "Zodiac Hasbro",
    age: 56
}
const greeting = `Hello, my name is ${persona.name}!\nI am ${persona.age}`
console.log(greeting)
/* const createPerson = (fname, myAge, gender) =>{
    return {
    fname: fname,
    myAge: myAge,
    gender: gender
    }
    } */
const createPerson = (fname, myAge, gender) => ({fname, myAge, gender}) 
const myObj = (createPerson('iaa', 59, 'mail'))
console.table(myObj)