import { S3, SQS } from "aws-sdk"
import csv from "csv-parser"

const s3client = new S3({ region: 'eu-north-1' })
const sqs = new SQS()
const Bucket = 'import-service-bucket-zafar'

export const importFileParser = async (event) => {

  for (const record of event.Records) {
    const Key = record.s3.object.key

    s3client
      .getObject({ Bucket, Key })
      .createReadStream()
      .pipe(csv())
      .on('data', data => {
        sqs.sendMessage({
          QueueUrl: 'https://sqs.eu-north-1.amazonaws.com/301382425986/catalogItemsQueue',
          MessageBody: JSON.stringify(data)
        }, (err, sendData) => {
          console.log('csv data: ', JSON.stringify(data))
          console.log('err: ', err)
          console.log('sendData: ', sendData)
        })
      })

    await s3client.copyObject({
      Bucket,
      CopySource: `${Bucket}/${record.s3.object.key}`,
      Key: Key.replace('uploaded', 'parsed')
    }).promise()

    await s3client.deleteObject({ Bucket, Key }).promise()
  }

  return {
    statusCode: 202,
  }
}
