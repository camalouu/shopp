import { DynamoDB, SNS } from 'aws-sdk'
import { v4 as uuidv4 } from 'uuid';
import { response } from '../helpers/response.js'
import { productSchema } from '../helpers/productSchema.js';

const db = new DynamoDB.DocumentClient()
const sns = new SNS({ region: 'eu-north-1' })

const putItemDoDatabase = async rawData => {

  const { count, ...productData } = await productSchema.validate(JSON.parse(rawData))

  const newProduct = { ...productData, id: uuidv4() }

  await db.put({
    TableName: 'products',
    Item: newProduct
  }).promise()

  await db.put({
    TableName: 'stocks',
    Item: { count, product_id: newProduct.id }
  }).promise()
}

export const handler = async event => {
  try {
    const sqsData = event.Records.map(({ body }) => body)

    await Promise.all(sqsData.map(putItemDoDatabase))

    console.log('sqsdata', sqsData)
    console.log('topicarn', process.env.SNS_ARN)

    const snsResult = await sns.publish({
      Subject: 'new items added',
      Message: 'look at the products: ',
      TopicArn: process.env.SNS_ARN
    }).promise()

    console.log('snsresult:  ', snsResult)

    return response(200, { message: 'items added', newProduct })

  } catch (err) {
    if (err.name == 'ValidationError')
      return response(400, { error: 'product data is invalid' })
    return response(500, { error: err })
  }
}
