import { DynamoDB } from 'aws-sdk'
import { response } from '../helpers/response.js'

const db = new DynamoDB.DocumentClient()

export const handler = async event => {
  try {
    console.log(event)

    const { Items: products } = await db.scan({ TableName: 'products' }).promise()
    const { Items: stocks } = await db.scan({ TableName: 'stocks' }).promise()

    const joined = products.map(p => {
      return {
        ...p,
        count: stocks.find(s => s.product_id == p.id).count
      }
    })

    return response(200, joined)
  } catch (err) {
    return response(500, { error: 'error occured' })
  }
}
