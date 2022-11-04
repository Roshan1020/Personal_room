import aws from 'aws-sdk'

aws.config.update({
  accessKeyId: process.env.ACCESS_KEY,
  secretAccessKey: process.env.SECRET_KEY,
  region: 'us-east-2',
  signatureVersion: 'v4',
})

export default async function handler(req, res) {
  const s3Client = new aws.S3()

  const getTranscriptions = () => {
    return new Promise((resolve, reject) => {
      const searchParams = {
        Bucket: 'emergence-dapp',
        Key: 'transcriptions.json',
      }

      s3Client.getObject(searchParams, (err, data) => {
        if (err) {
          return reject(err)
        }
        resolve(data.Body.toString())
      })
    })
  }

  res.status(200).json(await getTranscriptions())
}
