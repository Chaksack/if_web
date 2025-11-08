# AWS S3 Bucket Permissions Setup Guide

This guide walks you through setting up permissions for the `innovative-finance-agent-app` S3 bucket.

## Step 1: Create IAM User

1. **Go to AWS Console** → **IAM** → **Users**
2. Click **"Add users"** or **"Create user"**
3. **User name**: `if-agent-s3-user` (or any name you prefer)
4. **Select credential type**: Check **"Access key - Programmatic access"**
5. Click **"Next"**

## Step 2: Set Permissions

### Option A: Attach Existing Policy (Easiest for Testing)

1. Click **"Attach policies directly"**
2. Search for and select: **`AmazonS3FullAccess`**
3. Click **"Next"**

### Option B: Create Custom Policy (Recommended for Production)

1. Click **"Attach policies directly"** → **"Create policy"**
2. Click **"JSON"** tab and paste this policy:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "s3:PutObject",
        "s3:GetObject",
        "s3:DeleteObject",
        "s3:ListBucket"
      ],
      "Resource": [
        "arn:aws:s3:::innovative-finance-agent-app",
        "arn:aws:s3:::innovative-finance-agent-app/*"
      ]
    }
  ]
}
```

3. Click **"Next"**
4. **Policy name**: `IFAgentS3Access`
5. Click **"Create policy"**
6. Go back to user creation, refresh, and select the new policy
7. Click **"Next"**

## Step 3: Create Access Keys

1. Review the user details
2. Click **"Create user"**
3. **IMPORTANT**: Save these credentials immediately:
   - **Access Key ID**
   - **Secret Access Key** (shown only once!)
4. Click **"Download .csv"** to save credentials securely

## Step 4: Configure Bucket Policy (Optional but Recommended)

1. **Go to S3** → Select bucket **`innovative-finance-agent-app`**
2. Click **"Permissions"** tab
3. Scroll to **"Bucket policy"**
4. Click **"Edit"** and paste this policy:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "AllowIFAgentUser",
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
    },
    {
      "Sid": "AllowListBucket",
      "Effect": "Allow",
      "Principal": {
        "AWS": "arn:aws:iam::YOUR_ACCOUNT_ID:user/if-agent-s3-user"
      },
      "Action": "s3:ListBucket",
      "Resource": "arn:aws:s3:::innovative-finance-agent-app"
    }
  ]
}
```

**Replace `YOUR_ACCOUNT_ID`** with your AWS Account ID (found in top-right of AWS Console)

5. Click **"Save changes"**

## Step 5: Configure CORS (For Web Dashboard Access)

1. In the same bucket, go to **"Permissions"** tab
2. Scroll to **"Cross-origin resource sharing (CORS)"**
3. Click **"Edit"**
4. Paste this CORS configuration:

```json
[
  {
    "AllowedHeaders": [
      "*"
    ],
    "AllowedMethods": [
      "GET",
      "PUT",
      "POST",
      "DELETE",
      "HEAD"
    ],
    "AllowedOrigins": [
      "*"
    ],
    "ExposeHeaders": [
      "ETag",
      "x-amz-server-side-encryption",
      "x-amz-request-id",
      "x-amz-id-2"
    ],
    "MaxAgeSeconds": 3000
  }
]
```

**For production**, replace `"AllowedOrigins": ["*"]` with your specific domain:
```json
"AllowedOrigins": [
  "https://yourdomain.com",
  "http://localhost:3000"
]
```

5. Click **"Save changes"**

## Step 6: Block Public Access (Keep Enabled)

1. In **"Permissions"** tab → **"Block public access"**
2. **Keep all settings enabled** (default)
3. This ensures only authenticated users can access files

## Step 7: Add Credentials to Backend

Add to `backend/.env`:

```env
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=AKIAIOSFODNN7EXAMPLE
AWS_SECRET_ACCESS_KEY=wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY
```

**Replace with your actual credentials!**

## Step 8: Test the Setup

### Test via AWS CLI (Optional)

```bash
# Test upload
aws s3 cp test.txt s3://innovative-finance-agent-app/test.txt

# Test download
aws s3 cp s3://innovative-finance-agent-app/test.txt downloaded.txt

# List files
aws s3 ls s3://innovative-finance-agent-app/
```

### Test via Application

1. Start backend: `cd backend && npm run dev`
2. Create application in Flutter app
3. Upload a document
4. Check S3 bucket to verify file appears
5. View document in dashboard

## Troubleshooting

### Error: "Access Denied"
- Verify IAM user has correct permissions
- Check bucket policy includes your IAM user ARN
- Ensure credentials in `.env` are correct
- Verify bucket name matches exactly: `innovative-finance-agent-app`

### Error: "InvalidAccessKeyId"
- Check Access Key ID is correct
- Verify IAM user exists and is active

### Error: "SignatureDoesNotMatch"
- Check Secret Access Key is correct
- Ensure no extra spaces in `.env` file

### Documents not accessible in browser
- Check CORS configuration
- Verify signed URL generation is working
- Check browser console for CORS errors

## Security Best Practices

1. ✅ **Use IAM users** (not root account)
2. ✅ **Grant minimum permissions** (custom policy)
3. ✅ **Rotate access keys** regularly (every 90 days)
4. ✅ **Use IAM roles** in production (instead of access keys)
5. ✅ **Enable S3 versioning** for document recovery
6. ✅ **Enable S3 encryption** at rest
7. ✅ **Monitor access** via CloudTrail
8. ✅ **Block public access** (keep enabled)

## Finding Your AWS Account ID

1. Click your username in top-right of AWS Console
2. Account ID is displayed in the dropdown
3. Or run: `aws sts get-caller-identity --query Account --output text`

## Quick Reference

- **IAM Console**: https://console.aws.amazon.com/iam/
- **S3 Console**: https://console.aws.amazon.com/s3/
- **Bucket Name**: `innovative-finance-agent-app`
- **IAM User**: `if-agent-s3-user` (or your chosen name)

