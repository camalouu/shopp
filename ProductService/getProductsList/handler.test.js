import { handler } from './handler.js'

describe('getProducstslist', () => {
  test('sends list of producsts', async () => {
    const response = await handler({})

    const body = JSON.parse(response.body)

    expect(body).toBeDefined()
    expect(response.statusCode).toBe(200)
  })
})
