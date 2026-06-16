import vm from 'vm';

// Create a context object
const context = { x: 2 };

// Compile and run a script in the context
vm.createContext(context);
vm.runInContext('x = x * 2; y = 10;', context);

// Inspect the modified context
console.log(context); // Outputs: { x: 4, y: 10 }