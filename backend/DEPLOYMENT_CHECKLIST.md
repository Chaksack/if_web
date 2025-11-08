# Vercel Deployment Checklist

## Before Deployment

- [ ] Push backend code to Git repository
- [ ] Ensure all environment variables are documented
- [ ] Test backend locally with `npm run build`
- [ ] Verify database connection works
- [ ] Check AWS S3 credentials are valid

## Environment Variables Needed

Add these in Vercel Dashboard → Settings → Environment Variables:

```
DATABASE_URL=your_neon_database_url
JWT_SECRET=your_jwt_secret_key (min 32 characters)
JWT_REFRESH_SECRET=your_jwt_refresh_secret_key (min 32 characters)
JWT_EXPIRES_IN=7d
AWS_ACCESS_KEY_ID=your_aws_access_key_id
AWS_SECRET_ACCESS_KEY=your_aws_secret_access_key
AWS_REGION=us-east-1 (or your region)
```

## Deployment Steps

1. [ ] Go to https://vercel.com and sign in
2. [ ] Click "Add New Project"
3. [ ] Import your Git repository
4. [ ] Set Root Directory to `backend` (if needed)
5. [ ] Add all environment variables
6. [ ] Click "Deploy"
7. [ ] Wait for deployment to complete
8. [ ] Copy your deployment URL

## After Deployment

- [ ] Test API endpoint: `https://YOUR_URL.vercel.app/api/auth/login`
- [ ] Update Flutter app's `api_config.dart` with Vercel URL
- [ ] Rebuild APK: `flutter build apk --release`
- [ ] Test APK with Vercel backend
- [ ] Verify all features work (login, applications, documents, etc.)

## Quick Test Command

```bash
curl https://YOUR_VERCEL_URL.vercel.app/api/auth/login \
  -X POST \
  -H "Content-Type: application/json" \
  -d '{"email":"officer@example.com","password":"password123"}'
```

Replace `YOUR_VERCEL_URL` with your actual Vercel deployment URL.

