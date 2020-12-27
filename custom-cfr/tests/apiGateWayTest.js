const g = require('../utils/apiGateway');
const AWS = require('aws-sdk');

(async function(){
    
    const credentials = new AWS.SharedIniFileCredentials({profile: 'pasley_hill'});
    AWS.config.credentials = credentials;

    await g.createApiGateway(AWS);

})();