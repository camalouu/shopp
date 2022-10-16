const { S3 } = require('aws-sdk')
const response = (statusCode, payload) => {
  return {
    statusCode,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
    },
    body: payload
  }
}


module.exports.importProductsFile = async (event) => {

  const s3 = new S3({ region: 'eu-north-1' })
  const BUCKET = 'import-service-bucket-zafar'
  const { name } = event.queryStringParameters

  if (!name) return response(400, "bad request")

  const params = {
    Bucket: BUCKET,
    Key: `uploaded/${name}`,
    Expires: 60,
    ContentType: 'text/csv'
  }

  const signedUrl = await s3.getSignedUrlPromise('putObject', params)

  return response(200, signedUrl)
}
