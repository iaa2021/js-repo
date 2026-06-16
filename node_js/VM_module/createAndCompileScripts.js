import vm from 'vm';

// Compile the script once
const script = new vm.Script('x += 40; let z = 30;');

// Create multiple contexts
const context1 = { x: 10 };
const context2 = { x: 20 };

// Contextify the objects
vm.createContext(context1);
vm.createContext(context2);

// Run the same script in different contexts
script.runInContext(context1);
script.runInContext(context2);

console.log(context1); // Outputs: { x: 50, z: 30 }
console.log(context2); // Outputs: { x: 60, z: 30 }
