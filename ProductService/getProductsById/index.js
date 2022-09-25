import data from "../data.js"

export const handler = async event => {
  return {
    statusCode: 200,
    body: event
  }
}

