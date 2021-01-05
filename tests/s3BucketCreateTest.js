(async function(){

    const { s3Create, copyFolder } = require("../utils/s3utils");
    const AWS = require("aws-sdk");
    const response = await s3Create("dev-testing-website-1",AWS);
    console.log(response);


    copyFolder("./spa/build","dev-testing-website-1");


})();