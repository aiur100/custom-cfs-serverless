(async function(){

    const { s3Create, deleteBucket, copyFolder } = require("../utils/s3utils");
    const AWS = require("aws-sdk");
    const credentials = new AWS.SharedIniFileCredentials({
        profile: 'pasley_hill_admin'
    });
	AWS.config.credentials = credentials;
	AWS.config.region = 'us-east-1';
   // const response = await s3Create("prod-tulsa-weather-app",AWS);
   // console.log(response);

    await deleteBucket("prod-tulsa-weather-app",AWS);


})();