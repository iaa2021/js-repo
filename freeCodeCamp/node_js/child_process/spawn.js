import {spawn} from 'child_process';
const child = spawn('ls', ['-la']);
child.stdout.on('data', (data) => {
    console.log(`stdout: ${data}`);
});

child.stderr.on('data', (data) => {
    console.error(`stderr: ${data}`);
});

child.on('close', (code, signal) => {
    console.log(`child process exited with code ${code} and signal ${signal}`);
});