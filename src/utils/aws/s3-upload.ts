import { config, S3 } from 'aws-sdk'

const { S3_ACCESS_KEY, S3_SECRET_KEY, S3_REGION, S3_BUCKET_NAME } = process.env

// Set the region (other credentials are in process.env)
config.update({
  accessKeyId: String(S3_ACCESS_KEY),
  secretAccessKey: String(S3_SECRET_KEY),
  region: String(S3_REGION),
  signatureVersion: 'v4'
})

// Create S3 service object
const s3 = new S3()


const upload = async (Key: string, Body: Buffer, ContentType: string) => {
  try {
    return s3
      .putObject({
        Bucket: String(S3_BUCKET_NAME),
        ACL: 'public-read',
        Key,
        Body,
        ContentType
      })
      .promise()
  } catch (error) {
    console.error(error)
    throw error
  }
}

export default upload
