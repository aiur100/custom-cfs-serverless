const g = require('../utils/apiGateway');
const AWS = require('aws-sdk');

(async function(){
    
    const credentials = new AWS.SharedIniFileCredentials({
        profile: 'pasley_hill_admin'
    });
    AWS.config.credentials = credentials;
    const accountId = "474597462976";
    const apiName = "Weather API";
    const lambdaArn = `arn:aws:lambda:us-east-1:${accountId}:function:weather-3-dev-weatherApi`;
    const role = "arn:aws:iam::474597462976:role/weather-3-dev-ApigAwsProxyRole-KD5754N8T5SM";
    const apiConfig = {
        AWS,
        lambdaArn,
        role,
        apiName,
        stage: "dev"
    };
    
    await g.createApiGateway(apiConfig);

})();