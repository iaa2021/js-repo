import {spawn} from 'child_process';
const child = spawn('sleep', ['100']);
console.log(`Spawned child process with PID: ${child.pid}`);
setTimeout(() => {
    child.kill();
    console.log(`Killed child process with PID: ${child.pid}`);
}, 5000);