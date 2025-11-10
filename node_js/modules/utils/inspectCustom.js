 const util = require('util');

// Class with custom inspection
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
    this._private = 'hidden information';
  }
  
  // Custom inspect method
  [util.inspect.custom](depth, options) {
    return `Person(${this.name}, ${this.age})`;
  }
}
const kai = new Person('Kai', 30);

// Custom inspection is used
console.log(util.inspect(kai)); // Person(Kai, 30)

// Directly using console.log also uses custom inspection
console.log(kai); // Person(Kai, 30)
