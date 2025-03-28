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
for (let index = 0; index < 10; index++) {
    console.log(index * index, ', ');
}