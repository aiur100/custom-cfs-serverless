async function createApiGateway(AWS,lambdaArn){

    AWS.config.region = 'us-east-1';

    const apig = new AWS.APIGateway({
        apiVersion: '2015/07/09'
    });

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
    console.log(resourceCreate);

    const methodResponse = await apig.putMethod({
        restApiId: restResponse.id,
        resourceId: parent.id,
        httpMethod: 'GET',
        authorizationType: 'NONE',
        requestParameters: {
            "method.request.querystring.long" : false,
            "method.request.querystring.lat" : false,
        }
    }).promise();

    console.log(methodResponse);

    const putMethodR = await apig.putMethodResponse({
        restApiId: restResponse.id,
        resourceId: parent.id,
        httpMethod: 'GET',
        statusCode: 200
    }).promise();

    console.log(putMethodR);

    const putIntegration = await apig.putIntegration({
        estApiId: restResponse.id,
        resourceId: parent.id,
        httpMethod: 'GET',
        type: "AWS",
        integrationHttpMethod: "POST",
    })


    {"application/json":"{\"greeter\":\"$input.params('greeter')\"}"}

    //return response;
}

module.exports = { createApiGateway };