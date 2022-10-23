const { Buffer } = require('node:buffer');

const response = (statusCode, payload) => {
  return {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json'
    },
    statusCode,
    body: JSON.stringify(payload)
  }
}

const generatePolicy = (principalId, resource, effect = "Allow") => {
  return {
    principalId,
    policyDocument: {
      Version: "2012-10-17",
      Statement: [
        {
          Action: "execute-api:Invoke",
          Effect: effect,
          Resource: resource
        }
      ]
    }
  }
}


module.exports.basicAuthorizer = async event => {

  console.log("Event: ", JSON.stringify(event))

  if (event["type"] != "TOKEN")
    return response(401, { error: "Unauthorized" })

  try {

    const encodedCreds = event.authorizationToken.split(' ')[1]

    const [username, password] =
      Buffer
        .from(encodedCreds, 'base64')
        .toString('utf-8')
        .split(':')

    console.log(`username: ${username} and password: ${password}`);

    const storedUserPassword = process.env[username];

    if (!storedUserPassword || storedUserPassword != password)
      throw new Error("invalid authorization token")

    const policy = generatePolicy(encodedCreds, event.methodArn);

    return response(200, policy)

  } catch (error) {
    return response(403, {
      error: {
        "Unauthorized": error.message
      }
    })
  }
}
