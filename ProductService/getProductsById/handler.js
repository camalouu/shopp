import data from '../data.json'

const response = (statusCode, payload) => {
  return {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true,
      'Content-Type': 'application/json'
    },
    statusCode,
    body: JSON.stringify(payload)
  }
}

export const handler = async event => {
  const productId = event.pathParameters?.productId
  if (productId) {
    const product = data.find(p => p.id === productId)
    if (product)
      return response(200, product)
    else
      return response(400, { error: `Product with id ${productId} is not found` })
  }
  return response(400, { error: 'ProductId is not provided' })
}
