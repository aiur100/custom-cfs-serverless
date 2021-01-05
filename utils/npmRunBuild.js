module.exports.npmRunBuild = (apiUrl) => {
   return new Promise((resolve,reject) => {
        const { spawn } = require('child_process');
        const job = spawn('bash', ['build.sh',apiUrl]);
        
        job.stdout.on('data', (data) => {
            console.log(`stdout: ${data}`);
        });
        
        job.stderr.on('data', (data) => {
            console.error(`stderr: ${data.toString('utf8')}`);
        });
        
        job.on('close', (code) => {
            console.log(`child process exited with code ${code}`);
            return resolve(code);
        });
   });
}
