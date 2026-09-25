import {spawn} from 'child_process';
const gitProcess = spawn('git', ['status']);
gitProcess.stdout.on('data', (data) => {
    console.log(`stdout: ${data}`);
    process.stdout.write(data);
});

gitProcess.stderr.on('data', (data) => {
    console.error(`stderr: ${data}`);
});

gitProcess.on('close', (code, signal) => {
    console.log(`git process exited with code ${code} and signal ${signal}`);
});