import data from "../data.js"

const handler = async event => {
  return {
    statusCode: 200,
    body: JSON.stringify(data, null, 2)
  }
}

