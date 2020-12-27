async function createApiGateway(AWS){
    AWS.config.region = 'us-east-1';
    const apig = new AWS.APIGateway({apiVersion: '2015/07/09',
    profile: 'pasley_hill'});
    const params = {
        name: "Weather API",
        binaryMediaTypes: [
            '*'
        ],
        description: "Demo API for weather in Tulsa OK",
        version: "0.00.001"
    };
    const restResponse = await apig.createRestApi(params).promise();
    const resource = await apig.getResources({ 
        restApiId:  restResponse.id
    }).promise();
    const parent = resource.items.find(r => r.path === "/");
    console.log(resource);
    const resourceCreate = await apig.createResource({
        restApiId: restResponse.id,
        parentId: parent.id,
        pathPart: 'weather'
    }).promise();

    const methodResponse = await apig.putMethod({
        restApiId: restResponse.id,
        parentId: parent.id,
        httpMethod: 'GET',
        authorizationType: 'NONE'
    }).promise();

    console.log(methodResponse);

    //return response;
}

module.exports = { createApiGateway };