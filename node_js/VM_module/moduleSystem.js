import vm from 'vm';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class VMModuleSystem {
  constructor(basePath = '.') {
    this.basePath = path.resolve(basePath);
    this.cache = new Map();
    this.context = vm.createContext({
      module: { exports: {} },
      exports: {},
      console: console,
      require: this.require.bind(this),
      __dirname: this.basePath,
      __filename: path.join(this.basePath, 'main.js')
    });
  }
  
  require(modulePath) {
    // Handle core modules
    if (require.resolve.paths(modulePath) === null) {
      return require(modulePath);
    }
    
    // Resolve the module path
    const resolvedPath = this.resolveModule(modulePath);
    
    // Check cache
    if (this.cache.has(resolvedPath)) {
      return this.cache.get(resolvedPath).exports;
    }
    
    // Create new module
    const module = { exports: {} };
    this.cache.set(resolvedPath, module);
    
    try {
      // Read and execute the module
      const code = fs.readFileSync(resolvedPath, 'utf8');
      const wrapper = `(function(module, exports, require, __dirname, __filename) {${code}\n})`;
      
      const script = new vm.Script(wrapper, {
        filename: resolvedPath,
        lineOffset: 0,
        displayErrors: true
      });
      
      const localRequire = (path) => this.require(path);
      localRequire.resolve = (request) => this.resolveModule(request, resolvedPath);
      
      script.runInNewContext({
        module: module,
        exports: module.exports,
        require: localRequire,
        __dirname: path.dirname(resolvedPath),
        __filename: resolvedPath
      });
      
      return module.exports;
    } catch (err) {
      this.cache.delete(resolvedPath);
      throw err;
    }
  }
  
  resolveModule(request, parentPath) {
    try {
      // Try to resolve as a file
      if (request.startsWith('./') || request.startsWith('../')) {
        const resolved = path.resolve(path.dirname(parentPath || this.basePath), request);
        
        // Try with .js extension
        try {
          const stats = fs.statSync(resolved + '.js');
          if (stats.isFile()) return resolved + '.js';
        } catch (e) {}
        
        // Try as directory with index.js
        try {
          const indexPath = path.join(resolved, 'index.js');
          const stats = fs.statSync(indexPath);
          if (stats.isFile()) return indexPath;
        } catch (e) {}
        
        // Try as file without extension
        try {
          const stats = fs.statSync(resolved);
          if (stats.isFile()) return resolved;
        } catch (e) {}
      }
      
      // Try to resolve as a module
      try {
        return require.resolve(request);
      } catch (e) {
        throw new Error(`Cannot find module '${request}'`);
      }
    } catch (err) {
      throw new Error(`Cannot find module '${request}': ${err.message}`);
    }
  }
  
  runFile(filePath) {
    const absolutePath = path.resolve(this.basePath, filePath);
    return this.require(absolutePath);
  }
}

// Example usage
const moduleSystem = new VMModuleSystem(__dirname);

try {
  // This will execute the file in the VM with the custom module system
  moduleSystem.runFile('example-module.js');
} catch (err) {
  console.error('Module execution failed:', err);
}