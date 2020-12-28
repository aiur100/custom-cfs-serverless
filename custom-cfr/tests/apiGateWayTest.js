const g = require('../utils/apiGateway');
const AWS = require('aws-sdk');

(async function(){
    
    const credentials = new AWS.SharedIniFileCredentials({
        profile: 'pasley_hill_admin'
    });
    AWS.config.credentials = credentials;
    const accountId = "474597462976";
    const lambdaArn = `arn:aws:lambda:us-east-1:${accountId}:function:weather-dev-weatherApi`

    await g.createApiGateway(AWS,lambdaArn);

})();