# Deploying Backend to Vercel

This guide will help you deploy the IF Agent backend to Vercel so your Android APK can use it instead of localhost.

## Prerequisites

1. A Vercel account (sign up at https://vercel.com)
2. Git repository (GitHub, GitLab, or Bitbucket)
3. All environment variables ready

## Step 1: Push Backend to Git Repository

If you haven't already, push your backend code to a Git repository:

```bash
cd backend
git init
git add .
git commit -m "Initial commit"
git remote add origin YOUR_GIT_REPO_URL
git push -u origin main
```

## Step 2: Deploy to Vercel

### Option A: Deploy via Vercel Dashboard (Recommended)

1. Go to https://vercel.com and sign in
2. Click "Add New Project"
3. Import your Git repository
4. Configure the project:
   - **Framework Preset**: Next.js
   - **Root Directory**: `backend` (if your repo contains both frontend and backend)
   - **Build Command**: `npm run build` (should be auto-detected)
   - **Output Directory**: `.next` (should be auto-detected)
   - **Install Command**: `npm install` (should be auto-detected)

5. Add Environment Variables:
   Click "Environment Variables" and add the following:

   ```
   DATABASE_URL=your_neon_database_url
   JWT_SECRET=your_jwt_secret_key
   JWT_REFRESH_SECRET=your_jwt_refresh_secret_key
   JWT_EXPIRES_IN=7d
   AWS_ACCESS_KEY_ID=your_aws_access_key_id
   AWS_SECRET_ACCESS_KEY=your_aws_secret_access_key
   AWS_REGION=your_aws_region (e.g., us-east-1)
   RESEND_API_KEY=your_resend_api_key
   ```

6. Click "Deploy"

### Option B: Deploy via Vercel CLI

1. Install Vercel CLI:
   ```bash
   npm i -g vercel
   ```

2. Navigate to backend directory:
   ```bash
   cd backend
   ```

3. Login to Vercel:
   ```bash
   vercel login
   ```

4. Deploy:
   ```bash
   vercel
   ```

5. For production deployment:
   ```bash
   vercel --prod
   ```

6. Set environment variables:
   ```bash
   vercel env add DATABASE_URL
   vercel env add JWT_SECRET
   vercel env add JWT_REFRESH_SECRET
   vercel env add JWT_EXPIRES_IN
   vercel env add AWS_ACCESS_KEY_ID
   vercel env add AWS_SECRET_ACCESS_KEY
   vercel env add AWS_REGION
   vercel env add RESEND_API_KEY
   ```

## Step 3: Get Your Vercel Deployment URL

After deployment, Vercel will provide you with a URL like:
- `https://if-agent-backend.vercel.app` (production)
- `https://if-agent-backend-xyz.vercel.app` (preview)

Your API base URL will be: `https://YOUR_PROJECT_NAME.vercel.app/api`

## Step 4: Update Flutter App Configuration

1. Open `frontend/lib/config/api_config.dart`
2. Replace `YOUR_VERCEL_URL` with your actual Vercel deployment URL:
   ```dart
   static const String baseUrlProduction = 'https://if-agent-backend.vercel.app/api';
   ```

3. Rebuild your APK:
   ```bash
   cd frontend
   flutter build apk --release
   ```

## Step 5: Test the Deployment

1. Test your API endpoints:
   ```bash
   curl https://YOUR_VERCEL_URL.vercel.app/api/auth/login \
     -X POST \
     -H "Content-Type: application/json" \
     -d '{"email":"test@example.com","password":"password"}'
   ```

2. Install the updated APK on your device and test the login

## Important Notes

### Database Migrations

If you need to run database migrations after deployment:

1. Use Vercel's CLI to run migrations:
   ```bash
   vercel env pull .env.local
   npm run db:migrate
   ```

2. Or use Neon's web console to run SQL directly

### Environment Variables

- All environment variables must be set in Vercel dashboard
- Never commit `.env` files to Git
- Use Vercel's environment variables for all secrets

### CORS Configuration

If you encounter CORS issues, you may need to add CORS headers in your Next.js API routes. The current setup should work, but if needed, add:

```typescript
// In your API route handlers
export async function GET(req: Request) {
  return NextResponse.json(data, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  })
}
```

### Custom Domain (Optional)

1. Go to your Vercel project settings
2. Click "Domains"
3. Add your custom domain
4. Update the Flutter app's `baseUrlProduction` with your custom domain

## Troubleshooting

### Build Errors

- Check Vercel build logs in the dashboard
- Ensure all dependencies are in `package.json`
- Verify Node.js version compatibility

### API Errors

- Check Vercel function logs
- Verify environment variables are set correctly
- Test endpoints using curl or Postman

### Database Connection Issues

- Verify `DATABASE_URL` is correct
- Check Neon database is accessible
- Ensure database allows connections from Vercel's IPs

## Next Steps

1. Set up a custom domain (optional)
2. Configure automatic deployments from Git
3. Set up monitoring and error tracking
4. Configure staging and production environments

