/**
 * This is a Promise based (async await) 
 * version of what AWS has as the cfn_response 
 * module
 * */

const SUCCESS = "SUCCESS";
const FAILED = "FAILED";
 
/**
 * 
 * @param {*} event 
 * @param {*} context 
 * @param {*} responseStatus 
 * @param {*} responseData 
 * @param {*} physicalResourceId 
 */
 async function asyncResponse(event, context, responseStatus, responseData, physicalResourceId) {
    const responseBody = JSON.stringify({
        Status: responseStatus,
        Reason: responseData.Value+": See the details in CloudWatch Log Stream: " + context.logStreamName,
        PhysicalResourceId: physicalResourceId || context.logStreamName,
        StackId: event.StackId,
        RequestId: event.RequestId,
        LogicalResourceId: event.LogicalResourceId,
        Data: responseData
    });
 
    console.log("Response body to be sent:\n", responseBody);
    const fetch = require("node-fetch");
    
    const options = {
        method: "PUT",
        body: responseBody,
        headers: {
            "content-type": "",
            "content-length": responseBody.length
        }
    };
    const response = await fetch(event.ResponseURL,options);

    if(!response.ok){
        console.error("cfn response error:",response.statusText);
        throw response.statusText;
    }

    console.log("Response received:\n", response.status);
}

module.exports = { asyncResponse,SUCCESS,FAILED };