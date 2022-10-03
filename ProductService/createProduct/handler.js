import { DynamoDB } from 'aws-sdk'
import { v4 as uuidv4 } from 'uuid';
// dotenv.config()

const db = new DynamoDB.DocumentClient()


export const handler = async event => {
  try {

    const { count, ...productData } = JSON.parse(event.body)

    const newProduct = { ...productData, id: uuidv4() }

    await db.put({
      TableName: 'products',
      Item: newProduct
    }).promise()

    await db.put({
      TableName: 'stocks',
      Item: { count , product_id: newProduct.id }
    }).promise()

    return {
      statusCode: 200,
      body: JSON.stringify({message: 'items added', newProduct})
    }

  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err })
    }
  }
}