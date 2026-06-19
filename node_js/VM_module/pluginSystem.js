import vm from 'vm';
import fs from 'fs';
import path from 'path';

class PluginSystem {
  constructor() {
    this.plugins = new Map();
    this.api = {
      version: '1.0.0',
      registerHook: this.registerHook.bind(this),
      utils: {
        add: (a, b) => a + b,
        multiply: (a, b) => a * b,
        formatDate: (date) => new Date(date).toLocaleDateString()
      }
    };
    
    this.hooks = {
      init: [],
      process: [],
      shutdown: []
    };
  }
  
  // Register a plugin hook
  registerHook(hookName, callback) {
    if (this.hooks[hookName]) {
      this.hooks[hookName].push(callback);
      console.log(`Registered ${hookName} hook`);
    } else {
      console.error(`Invalid hook name: ${hookName}`);
    }
  }
  
  // Load a plugin from file
  loadPlugin(pluginName, pluginCode) {
    try {
      console.log(`Loading plugin: ${pluginName}`);
      
      // Create a sandbox for this plugin
      const sandbox = {
        console: {
          log: (msg) => console.log(`[${pluginName}] ${msg}`),
          error: (msg) => console.error(`[${pluginName}] ${msg}`)
        },
        setTimeout,
        clearTimeout,
        api: this.api
      };
      
      // Create context and run the plugin code
      const context = vm.createContext(sandbox);
      vm.runInContext(pluginCode, context);
      
      // Store the loaded plugin
      this.plugins.set(pluginName, {
        name: pluginName,
        sandbox
      });
      
      console.log(`Successfully loaded plugin: ${pluginName}`);
    } catch (err) {
      console.error(`Error loading plugin ${pluginName}:`, err.message);
    }
  }
  
  // Run all hooks of a specific type
  async runHooks(hookName, data) {
    console.log(`Running ${hookName} hooks...`);
    
    for (const hook of this.hooks[hookName]) {
      try {
        const result = await hook(data);
        console.log(`Hook result:`, result);
      } catch (err) {
        console.error(`Error in ${hookName} hook:`, err.message);
      }
    }
  }
  
  // Load all plugins from a directory
  loadPluginsFromDirectory(directory) {
    try {
      const files = fs.readdirSync(directory);
      
      for (const file of files) {
        if (file.endsWith('.js')) {
          const pluginName = path.basename(file, '.js');
          const pluginPath = path.join(directory, file);
          const pluginCode = fs.readFileSync(pluginPath, 'utf8');
          
          this.loadPlugin(pluginName, pluginCode);
        }
      }
    } catch (err) {
      console.error('Error loading plugins directory:', err.message);
    }
  }
  
  // Run the plugin system
  async run(data) {
    await this.runHooks('init', data);
    await this.runHooks('process', data);
    await this.runHooks('shutdown', data);
  }
}

// Example plugin code (normally this would be in a separate file)
const examplePlugin = `
// Register initialization hook
api.registerHook('init', async (data) => {
  console.log('Plugin initializing with data:', data);
  return 'Initialization complete';
});

// Register processing hook
api.registerHook('process', async (data) => {
  console.log('Processing data');
  return {
    processed: true,
    sum: api.utils.add(data.x, data.y),
    product: api.utils.multiply(data.x, data.y),
    date: api.utils.formatDate(new Date())
  };
});

// Register shutdown hook
api.registerHook('shutdown', async () => {
  console.log('Plugin shutting down');
  return 'Shutdown complete';
});

console.log('Plugin loaded with API version', api.version);
`;

// Create and run the plugin system
(async () => {
  const system = new PluginSystem();
  
  // Load plugins
  system.loadPlugin('example', examplePlugin);
  
  // You could also load from a directory
  // system.loadPluginsFromDirectory('./plugins');
  
  // Run the system
  await system.run({ x: 5, y: 10 });
})();