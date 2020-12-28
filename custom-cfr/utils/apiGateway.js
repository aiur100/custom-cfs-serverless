async function createApiGateway(apiConfig){
    const {
        AWS,
        lambdaArn,
        role,
        stage,
        apiName
    } = apiConfig; 

    AWS.config.region = 'us-east-1';

    const apig = new AWS.APIGateway({
        apiVersion: '2015/07/09'
    });

    const params = {
        name: apiName,
        description: "Demo API for weather in Tulsa OK"
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
        pathPart: '{proxy+}'
    }).promise();
    
    console.log(resourceCreate);

    const methodResponse = await apig.putMethod({
        restApiId: restResponse.id,
        resourceId: resourceCreate.id,
        httpMethod: 'ANY',
        authorizationType: 'NONE'
    }).promise();

    console.log(methodResponse);

    /*
    const putMethodR = await apig.putMethodResponse({
        restApiId: restResponse.id,
        resourceId: resourceCreate.id,
        httpMethod: 'ANY',
        statusCode: "200"
    }).promise();

    console.log(putMethodR);
    */

    const putIntegration = await apig.putIntegration({
        restApiId: restResponse.id,
        resourceId: resourceCreate.id,
        httpMethod: 'ANY',
        type: "AWS_PROXY",
        integrationHttpMethod: "POST",
        credentials: role,
        uri: `arn:aws:apigateway:us-east-1:lambda:path/2015-03-31/functions/${lambdaArn}/invocations`
    }).promise();

    console.log(putIntegration);

    /*
    const putIntegrationResponse = await apig.putIntegrationResponse({
        restApiId: restResponse.id,
        resourceId: resourceCreate.id,
        httpMethod: 'GET',
        statusCode: "200",
        selectionPattern: ""
    }).promise();

    console.log(putIntegrationResponse);
    

    const putIntErroResponse = await apig.putIntegrationResponse({
        restApiId: restResponse.id,
        resourceId: resourceCreate.id,
        httpMethod: 'GET',
        statusCode: "500",
        selectionPattern: ""
    }).promise();

    console.log(putIntegrationResponse);
    */

    const deploymentResponse = await apig.createDeployment({
        restApiId: restResponse.id,
        stageName: stage
    }).promise();

    console.log(deploymentResponse);
    //return response;
}

async function doesApiAlreadyExists(name,AWS){
    const apig = new AWS.APIGateway({
		apiVersion: '2015/07/09'
    });

    let page = null;
	do{
		const params = { limit: 100, position: page };
        const response = await apig.getRestApis(params).promise();
        if( Array.isArray(response.items) && 
            response.items.length > 0 && 
            response.items.some( api => api.name === name )  )
        {
            
            return true; 
        }
        page = response.position;
		
    }while(page);
    
    return false;
}

module.exports = { createApiGateway, doesApiAlreadyExists };