import vm from 'vm';
import fs from 'fs';

// Create a sandbox with controlled access to core modules
const sandbox = {
  // Allow limited access to console
  console: {
    log: console.log,
    error: console.error
  },
  
  // Provide controlled access to fs module
  fs: {
    readFileSync: fs.readFileSync
  },
  
  // Custom utility
  util: {
    add: (a, b) => a + b,
    multiply: (a, b) => a * b
  },
  
  // No access to process, child_process, etc.
};

vm.createContext(sandbox);

// Run code with limited access
try {
  vm.runInContext(`
    // We can use the allowed methods
    console.log('Running in sandbox');
    console.log('2 + 3 =', util.add(2, 3));
    
    // Try to read a safe file
    try {
      const content = fs.readFileSync('example.txt', 'utf8');
      console.log('File content:', content);
    } catch (err) {
      console.error('File read error:', err.message);
    }
    
    // Try to access process (should fail)
    try {
      console.log('Process info:', process.version);
    } catch (err) {
      console.error('Cannot access process:', err.message);
    }
  `, sandbox);
} catch (err) {
  console.error('Sandbox execution failed:', err);
}