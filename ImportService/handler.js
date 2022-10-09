import { S3 } from "aws-sdk"

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

const s3 = new S3({ region: 'eu-north-1' })
const BUCKET = 'import-service-bucket-zafar'

export const importProductFiles = async (event) => {

    const name = event.queryStringParameters.name

    const params = {
        Bucket: BUCKET,
        Key: `uploaded/${name}`,
        Expires: 60,
        ContentType: 'text/csv'
    }

    const signedUrl = await s3.getSignedUrlPromise('putObject', params)

    return response(200, signedUrl)
}