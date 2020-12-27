async function createApiGateway(AWS){
    AWS.config.region = 'us-east-1';
    const apig = new AWS.APIGateway({apiVersion: '2015/07/09',
    profile: 'pasley_hill'});
    const params = {
        name: "Simple PetStore (node.js SDK)",
        binaryMediaTypes: [
            '*'
        ],
        description: "Demo API created using the AWS SDK for node.js",
        version: "0.00.001"
    };
    const restResponse = await apig.createRestApi(params).promise();
    const resource = await apig.getResources({ 
        restApiId:  restResponse.restApiId
    });
    

    return response;
}

module.exports = { createApiGateway };