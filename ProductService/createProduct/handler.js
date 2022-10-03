import { DynamoDB } from 'aws-sdk'
import { v4 as uuidv4 } from 'uuid';
import { response } from '../helpers/response.js'

const db = new DynamoDB.DocumentClient()

export const handler = async event => {
  try {
    console.log(event)

    const { count, ...productData } = JSON.parse(event.body)

    const newProduct = { ...productData, id: uuidv4() }

    await db.put({
      TableName: 'products',
      Item: newProduct
    }).promise()

    await db.put({
      TableName: 'stocks',
      Item: { count, product_id: newProduct.id }
    }).promise()

    return response(200, { message: 'items added', newProduct })

  } catch (err) {
    return response(500, { error: err })
  }
}