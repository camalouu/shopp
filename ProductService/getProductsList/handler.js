import { DynamoDB } from 'aws-sdk'
// import * as dotenv from 'dotenv'
// dotenv.config()

const db = new DynamoDB.DocumentClient()

export const handler = async event => {
  const data = await db.scan({ TableName: 'products' }).promise()

  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true,
    },
    body: JSON.stringify(data, null, 2)
  }
}

