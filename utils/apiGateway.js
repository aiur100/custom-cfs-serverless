const defaultRegion = "us-east-1";
async function updateApiGatewayName(restApiId,newName,AWS){
    try{
        const apig = new AWS.APIGateway({
            apiVersion: '2015/07/09'
        });
        const params = {
            restApiId, 
            patchOperations: [
                {
                    op: "replace",
                    path: "/name",
                    value: newName
                }
            ]
         };
        return await apigateway.updateRestApi(params).promise();
    }
    catch(error){
        return Promise.reject(error);
    }
}

async function createApiGateway(apiConfig){
    try{
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

        const deploymentResponse = await apig.createDeployment({
            restApiId: restResponse.id,
            stageName: stage
        }).promise();

        console.log(deploymentResponse);
        return restResponse;
    }
    catch(error){
        console.trace(error);
        return Promise.reject(error);
    }
}

async function doesApiAlreadyExists(name,AWS){
    try{
        AWS.config.region = 'us-east-1';
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
    catch(error){
        return Promise.reject(error);
    }
}

async function findApi(name,AWS){
    try{
        const apig = new AWS.APIGateway({
            apiVersion: '2015/07/09'
        });
        let page = null;
        do{
            const params = { limit: 100, position: page };
            const response = await apig.getRestApis(params).promise();
            const apiItem = response.items.find( api => api.name === name );
            if(apiItem){
                return apiItem;
            }
            page = response.position;
        }while(page);
        return null;
    }
    catch(error){
        return Promise.reject(error);
    }
}

async function deleteApi(restApiId,AWS){
    try{
        const apig = new AWS.APIGateway({
            apiVersion: '2015/07/09'
        });
        await apig.deleteRestApi({
            restApiId:restApiId
        }).promise();
    }
    catch(error){
        return Promise.reject(error);
    }
}

function executeApiUrl(restApiId,stage){
    return `https://${restApiId}.execute-api.${defaultRegion}.amazonaws.com/${stage}`;
}

module.exports = { createApiGateway, doesApiAlreadyExists,findApi,deleteApi,executeApiUrl };