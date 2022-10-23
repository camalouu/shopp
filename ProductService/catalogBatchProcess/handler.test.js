import { handler } from './handler.js'
import { DynamoDB } from 'aws-sdk'

const db = new DynamoDB.DocumentClient()

const mockData = [
  {
    title: 'some title',
    description: 'some description',
    price: 9999,
    count: 19
  },
  {
    title: 'some title 222',
    description: 'some description 222',
    price: 10004,
    count: 24
  },
]

describe('catalogBatchProcess', () => {
  test('it creates products, responds sns answer', async () => {
    const response = await handler({
      Records: mockData.map(d => {
        return {
          body: {
            ...d
          }
        }
      })
    })

    expect(response.statusCode).toBe(200)

    const body = JSON.parse(response.body)

    expect(body.message).toBe('items added')
    expect(body.snsResult).toBeDefined()
  })
})
