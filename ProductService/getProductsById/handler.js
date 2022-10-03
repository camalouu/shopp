import { DynamoDB } from 'aws-sdk'
import { response } from '../helpers/response.js'

const db = new DynamoDB.DocumentClient()

export const handler = async event => {
  try {
    console.log(event)
    const productId = event.pathParameters?.productId
    if (productId) {

      const productQuery = await db.query({
        TableName: 'products',
        KeyConditionExpression: 'id = :id',
        ExpressionAttributeValues: { ':id': productId }
      }).promise()

      const stockQuery = await db.query({
        TableName: 'stocks',
        KeyConditionExpression: 'product_id = :id',
        ExpressionAttributeValues: { ':id': productId }
      }).promise()

      const product = productQuery.Items[0]
      const { count } = stockQuery.Items[0]

      return response(200, { ...product, count })
    }
  } catch (err) {
    return response(500, { error: 'error occured on executing lambda function' })
  }
}
