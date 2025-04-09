const getData = (url) =>
    new Promise((resolve, reject) =>
fetch(url)
.then(response => response.json())//  returns promise
.then(json => resolve(json))
.catch(error => reject(error))) // in error's case 

export default getData