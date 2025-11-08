# AWS S3 Setup for Document Storage

This application uses AWS S3 to store uploaded documents. Follow these steps to set up S3 storage.

## Prerequisites

1. AWS Account
2. AWS CLI installed (optional, for testing)
3. S3 bucket created: `innovative-finance-agent-app`

## Setup Steps

### 1. Create S3 Bucket

Create an S3 bucket named `innovative-finance-agent-app` in your AWS account:

```bash
aws s3 mb s3://innovative-finance-agent-app --region us-east-1
```

Or create it via AWS Console:
1. Go to S3 in AWS Console
2. Click "Create bucket"
3. Name: `innovative-finance-agent-app`
4. Choose your preferred region
5. Create bucket

### 2. Create IAM User and Access Keys

1. Go to IAM in AWS Console
2. Click "Users" → "Add users"
3. Create a user (e.g., `if-agent-s3-user`)
4. Attach policy: `AmazonS3FullAccess` (or create a custom policy with only necessary permissions)
5. Create access keys for programmatic access
6. Save the Access Key ID and Secret Access Key

### 3. Configure Environment Variables

Add the following to your `.env` file in the `backend` directory:

```env
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=your-access-key-id
AWS_SECRET_ACCESS_KEY=your-secret-access-key
```

**Important:** Never commit these credentials to version control!

### 4. Bucket Permissions (Optional but Recommended)

For production, configure bucket policies to restrict access:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "AWS": "arn:aws:iam::YOUR_ACCOUNT_ID:user/if-agent-s3-user"
      },
      "Action": [
        "s3:PutObject",
        "s3:GetObject",
        "s3:DeleteObject"
      ],
      "Resource": "arn:aws:s3:::innovative-finance-agent-app/*"
    }
  ]
}
```

### 5. CORS Configuration (if needed)

If accessing S3 from web browsers, configure CORS:

```json
[
  {
    "AllowedHeaders": ["*"],
    "AllowedMethods": ["GET", "PUT", "POST", "DELETE"],
    "AllowedOrigins": ["*"],
    "ExposeHeaders": []
  }
]
```

## Document Storage Structure

Documents are stored in S3 with the following structure:

```
applications/
  {application-id}/
    {timestamp}-{filename}
```

Example:
```
applications/123e4567-e89b-12d3-a456-426614174000/1704067200000-driver_license.pdf
```

## Testing

To test S3 upload:

1. Ensure environment variables are set
2. Start the backend server
3. Create an application via the Flutter app
4. Upload a document
5. Check S3 bucket to verify file was uploaded

## Troubleshooting

### Error: "Failed to upload file to S3"
- Check AWS credentials are correct
- Verify bucket name matches exactly: `innovative-finance-agent-app`
- Ensure IAM user has necessary permissions
- Check AWS region matches your bucket region

### Error: "Access Denied"
- Verify IAM user has `s3:PutObject` permission
- Check bucket policy allows your IAM user
- Ensure bucket exists and is accessible

### Documents not appearing in dashboard
- Check S3 bucket for uploaded files
- Verify database has document records
- Check signed URL generation is working

## Security Best Practices

1. **Never commit credentials** - Use environment variables
2. **Use IAM roles** in production (instead of access keys)
3. **Restrict bucket policies** to only necessary permissions
4. **Enable S3 versioning** for document recovery
5. **Enable S3 encryption** at rest
6. **Use signed URLs** with expiration (already implemented)
7. **Regularly rotate** access keys

## Cost Considerations

- S3 storage: ~$0.023 per GB/month
- PUT requests: $0.005 per 1,000 requests
- GET requests: $0.0004 per 1,000 requests
- Data transfer: Varies by region

Monitor usage in AWS Cost Explorer.

