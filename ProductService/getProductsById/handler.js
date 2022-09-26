import data from '../data.json'

export const handler = async event => {
  const productId = event.pathParameters?.productId
  if (productId) {
    const product = data.find(p => p.id === productId)
    if (product)
      return {
        statusCode: 200,
        body: JSON.stringify(product)
      }
    else {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: `Product with id ${productId} is not found` })
      }
    }
  }
  return {
    statusCode: 400,
    body: JSON.stringify({ error: 'ProductId is not provided' })
  }
}
