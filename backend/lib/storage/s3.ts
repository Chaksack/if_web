import { S3Client, PutObjectCommand, GetObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'

// Validate AWS credentials
const accessKeyId = process.env.AWS_ACCESS_KEY_ID
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY

if (!accessKeyId || !secretAccessKey) {
  console.warn('⚠️  AWS credentials not found in environment variables')
  console.warn('   Please set AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY in your .env file')
}

const s3Client = new S3Client({
  region: process.env.AWS_REGION || 'us-east-1',
  credentials: {
    accessKeyId: accessKeyId || '',
    secretAccessKey: secretAccessKey || '',
  },
})

const BUCKET_NAME = 'innovative-finance-agent-app'

export async function uploadFileToS3(
  fileOrBuffer: File | Buffer,
  key: string,
  contentType?: string
): Promise<string> {
  try {
    let buffer: Buffer
    
    if (fileOrBuffer instanceof File) {
      const fileBuffer = await fileOrBuffer.arrayBuffer()
      buffer = Buffer.from(fileBuffer)
    } else if (Buffer.isBuffer(fileOrBuffer)) {
      buffer = fileOrBuffer
    } else {
      throw new Error('Invalid file type. Expected File or Buffer.')
    }

    const command = new PutObjectCommand({
      Bucket: BUCKET_NAME,
      Key: key,
      Body: buffer,
      ContentType: contentType || 'application/octet-stream',
    })

    await s3Client.send(command)
    return key
  } catch (error: any) {
    console.error('S3 upload error:', error)
    
    if (error.name === 'InvalidAccessKeyId') {
      throw new Error('Invalid AWS Access Key ID. Please check your .env file and create new access keys in AWS IAM.')
    } else if (error.name === 'SignatureDoesNotMatch') {
      throw new Error('Invalid AWS Secret Access Key. Please check your .env file.')
    } else if (error.name === 'NoSuchBucket') {
      throw new Error(`S3 bucket "${BUCKET_NAME}" does not exist. Please create it in AWS S3.`)
    } else if (error.name === 'AccessDenied') {
      throw new Error('Access denied. Check IAM user permissions and bucket policy.')
    }
    
    throw new Error(`Failed to upload file to S3: ${error.message || error}`)
  }
}

export async function getSignedUrlForFile(
  key: string,
  expiresIn: number = 3600 // 1 hour default
): Promise<string> {
  try {
    const command = new GetObjectCommand({
      Bucket: BUCKET_NAME,
      Key: key,
    })

    const url = await getSignedUrl(s3Client, command, { expiresIn })
    return url
  } catch (error) {
    console.error('S3 signed URL error:', error)
    throw new Error('Failed to generate signed URL')
  }
}

export async function deleteFileFromS3(key: string): Promise<void> {
  try {
    const command = new DeleteObjectCommand({
      Bucket: BUCKET_NAME,
      Key: key,
    })

    await s3Client.send(command)
  } catch (error) {
    console.error('S3 delete error:', error)
    throw new Error('Failed to delete file from S3')
  }
}

export function generateS3Key(prefix: string, fileName: string, userId?: string): string {
  const timestamp = Date.now()
  const sanitizedFileName = fileName.replace(/[^a-zA-Z0-9.-]/g, '_')
  if (userId) {
    return `${prefix}/${userId}/${timestamp}-${sanitizedFileName}`
  }
  return `${prefix}/${timestamp}-${sanitizedFileName}`
}

export function getS3Url(key: string): string {
  const region = process.env.AWS_REGION || 'us-east-1'
  return `https://${BUCKET_NAME}.s3.${region}.amazonaws.com/${key}`
}

