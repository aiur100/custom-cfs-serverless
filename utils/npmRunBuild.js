const util = require('util');
const exec = util.promisify(require('child_process').exec);

module.exports.npmRunBuild = async () => {
    const { stdout, stderr } = await exec('cd spa && npm run build');
    if (stderr) {
        return Promise.reject(stderr);
    }
    console.log(stdout);
    return stdout;
}