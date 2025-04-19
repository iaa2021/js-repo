var rnb = Math.floor(Math.random() * 20)
console.log(rnb)
function rangeNB(ourMax, ourMin) {
    var rangeNB1 = Math.floor(Math.random() * (ourMax - ourMin + 1)) + ourMin
    return rangeNB1
} // random integer in initiated range
console.log(rangeNB(40,50)) 