const { Buffer } = require('node:buffer');

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
    return "Unauthorized"

  try {

    const encodedCreds = event.authorizationToken.split(' ')[1]

    const [username, password] =
      Buffer
        .from(encodedCreds, 'base64')
        .toString('utf-8')
        .split(':')

    console.log(`username: ${username} and password: ${password}`);

    const storedUserPassword = process.env[username]

    const effect =
      (storedUserPassword && storedUserPassword == password) ? "Allow" : "Deny"

    return generatePolicy(encodedCreds, event.methodArn, effect);

  } catch (error) {
    return `Unauthorized: ${error.message}`
  }
}
