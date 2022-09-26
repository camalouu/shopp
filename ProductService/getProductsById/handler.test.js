import { handler } from './handler.js'

describe('getProductById', () => {
  test('sends error if event does not include productId', async () => {
    const response = await handler({})

    expect(response.statusCode).toBe(400)

    const { error } = JSON.parse(response.body)
    expect(error).toBe('ProductId is not provided');
  })
})
