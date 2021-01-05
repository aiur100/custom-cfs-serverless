/**
 * If a given bucket doesn't exist, this will create
 * that bucket.  
 * 
 * Returns true if a bucket was created. 
 * Returns false if it was not.  This is not an error, 
 * this just means it already exists. 
 * 
 * @param {*} Bucket 
 * @param {*} AWS 
 */
async function s3Create(Bucket,AWS){
    let bucketExists = true;
    const s3 = new AWS.S3();
    try{
        let response = await s3.headBucket({ Bucket }).promise();
    }
    catch(error){
        if(error.code === "NotFound"){
            console.info(`S3 Bucket ${Bucket} not found`);
            bucketExists = false;
        }
        else{
            console.error(`An error occurred checking Bucket ${Bucket} existence`,{error});
            return Promise.reject(error);
        }
    }
    if(!bucketExists){
        console.info(`Creating Bucket ${Bucket}...`);
        try{
            await s3.createBucket({ 
                Bucket,
                ACL : 'public-read'
            }).promise();
            console.info(`Bucket ${Bucket} created!`);
            console.info(`Bucket ${Bucket} being configured for web-hosting...`);
            const websiteBucketResponse = await s3.putBucketWebsite({
                Bucket,
                WebsiteConfiguration: {
                    ErrorDocument: {
                        Key: 'error.html'
                    },
                    IndexDocument: {
                        Suffix: 'index.html'
                    },
                }
            }).promise();
            console.info(`Bucket ${Bucket} configured for web-hosting!`,
                JSON.stringify(websiteBucketResponse,null,2)
            );
        }
        catch(error){
            console.error(`An error occurred creating Bucket ${Bucket}`,{error});
            return Promise.reject(error);
        }
    }
    return !bucketExists;
}

async function deleteBucket(Bucket,AWS){
    // nothing
}

async function copyFolder(directoryName,Bucket){
    const s3FolderUpload = require('s3-folder-upload');
    const credentials = {
        "region": "us-east-1",
        "bucket": Bucket
    }
    // optional options to be passed as parameter to the method
    const options = {
        useFoldersForFileTypes: false,
        useIAMRoleCredentials: true
    }
    await s3FolderUpload(directoryName, credentials, options);
}
module.exports = { s3Create, copyFolder };