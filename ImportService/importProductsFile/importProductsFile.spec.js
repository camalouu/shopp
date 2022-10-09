const { importProductsFile } = require('./importProductsFile')

describe("importProductsFile", () => {

  it("sends error when query parameter not provided", async () => {
    const event = {
      queryStringParameters: {

      }
    }
    const response = await importProductsFile(event)
    expect(response.statusCode).toBe(400)
    expect(response.body).toBe("bad request")
  })

  it("should respond with url when name is provided", async () => {
    const fileName = "somefile.csv"

    const event = {
      queryStringParameters: {
        name: fileName
      }
    }

    const response = await importProductsFile(event)
    const signedUrl = response.body

    expect(response.statusCode).toBe(200)
    expect(typeof signedUrl).toBe('string')
    expect(signedUrl).toContain(fileName)
  })
})
