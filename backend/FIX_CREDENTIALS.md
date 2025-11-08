# Fixing "InvalidAccessKeyId" Error

This error means your AWS Access Key ID doesn't exist in AWS records. Here's how to fix it:

## Quick Fix Steps

### 1. Check Your .env File

Make sure your `backend/.env` file has these variables (no quotes, no spaces):

```env
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=AKIAIOSFODNN7EXAMPLE
AWS_SECRET_ACCESS_KEY=wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY
```

**Common mistakes:**
- ❌ `AWS_ACCESS_KEY_ID="AKIA..."` (quotes not needed)
- ❌ `AWS_ACCESS_KEY_ID = AKIA...` (spaces around =)
- ❌ Missing one of the variables

### 2. Create New Access Keys

If your access keys are incorrect or deleted:

1. **Go to AWS Console** → **IAM** → **Users**
2. **Select your IAM user** (e.g., `if-agent-s3-user`)
3. Click **"Security credentials"** tab
4. Scroll to **"Access keys"** section
5. Click **"Create access key"**
6. Choose **"Application running outside AWS"** (or appropriate option)
7. Click **"Next"** → **"Create access key"**
8. **IMPORTANT**: Copy both:
   - **Access key ID**
   - **Secret access key** (shown only once!)
9. Click **"Download .csv file"** to save securely

### 3. Update .env File

Replace the old credentials in `backend/.env`:

```env
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=YOUR_NEW_ACCESS_KEY_ID
AWS_SECRET_ACCESS_KEY=YOUR_NEW_SECRET_ACCESS_KEY
```

**Important:**
- No quotes around values
- No spaces around `=`
- Make sure there are no extra spaces or line breaks

### 4. Test Your Credentials

Run the test script:

```bash
cd backend
npm run test:s3
```

This will:
- ✅ Verify credentials are valid
- ✅ Check if bucket exists
- ✅ Test upload permissions

### 5. Restart Backend Server

After updating `.env`, restart your backend:

```bash
# Stop the server (Ctrl+C)
# Then restart
cd backend
npm run dev
```

## Troubleshooting

### Still Getting "InvalidAccessKeyId"?

1. **Verify credentials are correct:**
   - Check for typos
   - Make sure you copied the full Access Key ID (starts with `AKIA`)
   - Ensure Secret Access Key is complete

2. **Check IAM user exists:**
   - Go to IAM → Users
   - Verify your user exists and is active

3. **Verify credentials are for correct AWS account:**
   - Make sure you're using credentials from the same AWS account where the bucket exists

4. **Check .env file location:**
   - Make sure `.env` is in the `backend/` directory
   - Not in root or `frontend/` directory

5. **Verify environment variables are loaded:**
   - The test script will show if variables are loaded
   - Check console output when starting backend

### Getting "SignatureDoesNotMatch"?

- Your Secret Access Key is incorrect
- Check for typos or missing characters
- Make sure you copied the complete secret key

### Getting "NoSuchBucket"?

- Bucket name doesn't match: `innovative-finance-agent-app`
- Check bucket exists in your AWS account
- Verify bucket name in S3 console

### Getting "AccessDenied"?

- IAM user doesn't have permissions
- Check IAM user has S3 permissions
- Verify bucket policy allows your IAM user

## Verify Credentials Format

**Correct format:**
```env
AWS_ACCESS_KEY_ID=AKIAIOSFODNN7EXAMPLE
AWS_SECRET_ACCESS_KEY=wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY
```

**Wrong formats:**
```env
# ❌ With quotes
AWS_ACCESS_KEY_ID="AKIAIOSFODNN7EXAMPLE"

# ❌ With spaces
AWS_ACCESS_KEY_ID = AKIAIOSFODNN7EXAMPLE

# ❌ Missing value
AWS_ACCESS_KEY_ID=
```

## Need Help?

If you're still having issues:

1. Run the test script: `npm run test:s3`
2. Check the error message details
3. Verify your IAM user has S3 permissions
4. Make sure bucket exists and name matches exactly

