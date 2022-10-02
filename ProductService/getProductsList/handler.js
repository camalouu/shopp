// const data = require("../data.json")
import data from '../data.json'

export const handler = async event => {
  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true,
    },
    body: JSON.stringify(data, null, 2)
  }
}

