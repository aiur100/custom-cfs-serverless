const util = require('util');
const exec = util.promisify(require('child_process').exec);

module.exports.npmRunBuild = async () => {
    const data = await exec('cd spa && pwd && cd ..');
    console.log("PWD: ",data.stdout);
    if(data.stderr)
        return Promise.reject(stderr);

   // const { stdout, stderr } = await exec('cd spa && npm run build');
    const { stdout, stderr } = await exec('bash ./build.sh');
    if (stderr) {
        return Promise.reject(stderr);
    }
    console.log(stdout);
    return stdout;
}