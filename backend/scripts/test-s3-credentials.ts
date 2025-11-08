import { S3Client, ListBucketsCommand, PutObjectCommand } from '@aws-sdk/client-s3'
import { config } from 'dotenv'
import { readFileSync } from 'fs'
import { join } from 'path'

// Load environment variables
config({ path: join(process.cwd(), '.env') })

async function testS3Credentials() {
  console.log('Testing S3 Credentials...\n')

  // Check environment variables
  const accessKeyId = process.env.AWS_ACCESS_KEY_ID
  const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY
  const region = process.env.AWS_REGION || 'us-east-1'
  const bucketName = 'innovative-finance-agent-app'

  console.log('Configuration:')
  console.log(`  Region: ${region}`)
  console.log(`  Bucket: ${bucketName}`)
  console.log(`  Access Key ID: ${accessKeyId ? `${accessKeyId.substring(0, 8)}...` : 'NOT SET'}`)
  console.log(`  Secret Access Key: ${secretAccessKey ? 'SET' : 'NOT SET'}\n`)

  if (!accessKeyId || !secretAccessKey) {
    console.error('❌ ERROR: AWS credentials are missing!')
    console.error('\nPlease add to your .env file:')
    console.error('  AWS_REGION=us-east-1')
    console.error('  AWS_ACCESS_KEY_ID=your-access-key-id')
    console.error('  AWS_SECRET_ACCESS_KEY=your-secret-access-key')
    process.exit(1)
  }

  // Create S3 client
  const s3Client = new S3Client({
    region,
    credentials: {
      accessKeyId,
      secretAccessKey,
    },
  })

  try {
    // Test 1: List buckets (verifies credentials are valid)
    console.log('Test 1: Verifying credentials...')
    const listCommand = new ListBucketsCommand({})
    const listResponse = await s3Client.send(listCommand)
    console.log('✅ Credentials are valid!')
    console.log(`   Found ${listResponse.Buckets?.length || 0} buckets\n`)

    // Test 2: Check if bucket exists
    console.log('Test 2: Checking if bucket exists...')
    const bucketExists = listResponse.Buckets?.some(
      (bucket) => bucket.Name === bucketName
    )
    
    if (bucketExists) {
      console.log(`✅ Bucket "${bucketName}" exists!\n`)
    } else {
      console.log(`⚠️  Bucket "${bucketName}" not found in your account`)
      console.log(`   Available buckets: ${listResponse.Buckets?.map(b => b.Name).join(', ') || 'none'}\n`)
    }

    // Test 3: Try to upload a test file
    console.log('Test 3: Testing upload permissions...')
    const testKey = `test/${Date.now()}-test.txt`
    const testContent = Buffer.from('This is a test file for S3 upload verification')
    
    const putCommand = new PutObjectCommand({
      Bucket: bucketName,
      Key: testKey,
      Body: testContent,
      ContentType: 'text/plain',
    })

    await s3Client.send(putCommand)
    console.log(`✅ Upload successful!`)
    console.log(`   Test file uploaded to: ${testKey}\n`)

    console.log('✅ All tests passed! Your S3 configuration is working correctly.')
    console.log('\nYou can now use document upload in your application.')

  } catch (error: any) {
    console.error('\n❌ ERROR:', error.message || error)
    
    if (error.name === 'InvalidAccessKeyId') {
      console.error('\nThe Access Key ID does not exist in AWS records.')
      console.error('Possible causes:')
      console.error('  1. The Access Key ID is incorrect')
      console.error('  2. The access key was deleted')
      console.error('  3. The credentials are for a different AWS account')
      console.error('\nSolution:')
      console.error('  1. Go to AWS Console → IAM → Users')
      console.error('  2. Select your IAM user')
      console.error('  3. Go to "Security credentials" tab')
      console.error('  4. Create new access key')
      console.error('  5. Update your .env file with the new credentials')
    } else if (error.name === 'SignatureDoesNotMatch') {
      console.error('\nThe Secret Access Key is incorrect.')
      console.error('Solution: Check your .env file for typos in AWS_SECRET_ACCESS_KEY')
    } else if (error.name === 'NoSuchBucket') {
      console.error(`\nBucket "${bucketName}" does not exist.`)
      console.error('Solution: Create the bucket or update the bucket name in the code')
    } else if (error.name === 'AccessDenied') {
      console.error('\nAccess denied. Your IAM user does not have permission to access this bucket.')
      console.error('Solution: Check bucket policy and IAM user permissions')
    }
    
    process.exit(1)
  }
}

testS3Credentials()

