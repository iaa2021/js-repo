var rnb = Math.floor(Math.random() * 20)
console.log(rnb)
function rangeNB(ourMax, ourMin) {
    var rangeNB1 = Math.floor(Math.random() * (ourMax - ourMin + 1)) + ourMin
    return rangeNB1
} // random integer in initiated range
console.log(rangeNB(40,50)) 

const MATH_CONSTANS =  {
    PI : 3.14
}
Object.freeze(MATH_CONSTANS)
try{
    MATH_CONSTANS.PI = 99
} catch(ex){
    console.log(ex)
}
console.log(MATH_CONSTANS.PI)
const sum = (() => {
    return function sum(... args){
        return args.reduce((a,b) => a + b, 0)
    }
})()
console.log(sum(1, 2, 3, 4, 5))
const LOCAL_FORECAST = {
    today : { min : 72, max : 83 },
    tomorrow : { min : 73.3, max : 85.7 }
}
function getForecast(forecast) {
    return forecast.tomorrow.max
}
console.log(getForecast(LOCAL_FORECAST))