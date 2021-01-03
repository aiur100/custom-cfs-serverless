function buildResponse(statusCode = 200, body, headers = null) {
    let corsHeaders = {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*", // Required for CORS support to work
        "Access-Control-Allow-Credentials": true // Required for cookies, authorization headers with HTTPS
    };
    return {
        statusCode,
        body: JSON.stringify(body),
        headers: {...corsHeaders, ...headers }
    }
}

module.exports = { buildResponse };