import { DynamoDB } from 'aws-sdk'
// import * as dotenv from 'dotenv'
// dotenv.config()

const db = new DynamoDB.DocumentClient()


const response = (statusCode, payload) => {
  return {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true,
      'Content-Type': 'application/json'
    },
    statusCode,
    body: JSON.stringify(payload)
  }
}

export const handler = async event => {
  const productId = event.pathParameters?.productId
  if (productId) {

    const productQuery = await db.query({
      TableName: 'products',
      KeyConditionExpression: 'id = :id',
      ExpressionAttributeValues: { ':id': productId }
    }).promise()

    const product = productQuery.Items[0]
    
    if (product)
      return response(200, product)
    else
      return response(404, { error: `Product with id ${productId} is not found` })
  }
  return response(400, { error: 'ProductId is not provided' })
}
