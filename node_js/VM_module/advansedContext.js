import vm from 'vm';
import util from 'util';

// Create a custom context with specific global variables
const context = {
  console: {
    log: (...args) => {
      // Custom console.log implementation
      process.stdout.write('Custom Log: ' + util.format(...args) + '\n');
    },
    error: console.error,
    warn: console.warn,
    info: console.info
  },
  // Add custom utilities
  utils: {
    formatDate: () => new Date().toISOString(),
    generateId: () => Math.random().toString(36).substr(2, 9)
  },
  // Add a safe require function
  require: (moduleName) => {
    const allowedModules = ['path', 'url', 'util'];
    if (!allowedModules.includes(moduleName)) {
      throw new Error(`Module '${moduleName}' is not allowed`);
    }
    return require(moduleName);
  }
};

// Contextify the object
vm.createContext(context);

// Run code in the custom context
const code = `
  console.log('Current time:', utils.formatDate());
  console.log('Generated ID:', utils.generateId());
  
  try {
    const fs = require('fs'); // This will throw an error
  } catch (err) {
    console.error('Security error:', err.message);
  }
  
  // This will work as it's an allowed module
  const path = require('path');
  console.log('Current directory:', path.dirname('/path/to/file.txt'));
`;

try {
  vm.runInContext(code, context, { filename: 'custom-context.js' });
} catch (err) {
  console.error('Script execution failed:', err);
}