import process from 'process';
 
//console.log('Process env variables:', process.env);
console.log('Process env mode:', process.env.NODE_ENV);
console.log('Current working directory:', process.cwd());
console.log('Process shell:', process.env.SHELL);
console.log('Process arguments:', process.argv);
process.exitCode = 0; // Set the exit code to 0 (success)
process.on('exit', (code) => {
    console.log('Process is exiting with code:', code);
});