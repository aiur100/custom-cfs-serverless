(async function(){

	const AWS = require('aws-sdk');
	const g = require('../utils/apiGateway');
	const credentials = new AWS.SharedIniFileCredentials({
        profile: 'pasley_hill'
    });
	AWS.config.credentials = credentials;
	AWS.config.region = 'us-east-1';
	
	const exists = await g.findApi("Weather API",AWS);

	console.log(exists);


})();