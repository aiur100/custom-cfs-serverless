//const util = require('util');
//const exec = util.promisify(require('child_process').exec);

module.exports.npmRunBuild = () => {
   return new Promise((resolve,reject) => {
        const { spawn } = require('child_process');
        const top = spawn('bash', ['build.sh']);
        
        top.stdout.on('data', (data) => {
            console.log(`stdout: ${data}`);
        });
        
        top.stderr.on('data', (data) => {
            console.error(`stderr: ${data.toString('utf8')}`);
            //return reject(data.toString('utf8'));
        });
        
        top.on('close', (code) => {
            console.log(`child process exited with code ${code}`);
            return resolve(code);
        });
   });
}
