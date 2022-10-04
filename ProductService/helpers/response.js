export const response = (statusCode, payload) => {
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