const { handler } = require('./handler.js')

console.log(
  handler({ pathParameters: { productId: "hahaha" } })
)
