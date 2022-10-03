import { DynamoDB } from 'aws-sdk'
// import * as dotenv from 'dotenv'
// dotenv.config()

const db = new DynamoDB.DocumentClient()

export const handler = async event => {
  const { Items: products } = await db.scan({ TableName: 'products' }).promise()
  const { Items: stocks } = await db.scan({ TableName: 'stocks' }).promise()
  
  const joined = products.map(p=>{
    return {
      ...p,
      count: stocks.find(s=>s.product_id==p.id).count
    }
  })
  
  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true,
    },
    body: JSON.stringify(joined, null, 2)
  }
}
