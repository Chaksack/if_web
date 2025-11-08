# Local Development Setup Guide

## Prerequisites

- Node.js 18+ installed
- npm or yarn package manager
- A NeonDB account (or any PostgreSQL database)

## Step-by-Step Setup

### 1. Install Dependencies

Navigate to the backend directory and install dependencies:

```bash
cd backend
npm install
```

### 2. Set Up Environment Variables

Create a `.env` file in the `backend` directory:

```bash
cp .env.example .env
```

Or create it manually with the following content:

```env
# Database - Get your connection string from NeonDB dashboard
DATABASE_URL=postgresql://user:password@host:5432/dbname?sslmode=require

# JWT Secrets (generate strong random strings)
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRES_IN=7d
JWT_REFRESH_SECRET=your-super-secret-refresh-key-change-this-in-production
JWT_REFRESH_EXPIRES_IN=30d

# App Configuration
NODE_ENV=development
NEXT_PUBLIC_APP_URL=http://localhost:3000

# File Upload Configuration
MAX_FILE_SIZE=10485760
ALLOWED_FILE_TYPES=image/jpeg,image/png,application/pdf

# Email Configuration (Resend)
# Get your API key from https://resend.com/api-keys
RESEND_API_KEY=re_your_resend_api_key_here
```

**Important**: 
- Replace `DATABASE_URL` with your actual NeonDB connection string
- Generate secure random strings for `JWT_SECRET` and `JWT_REFRESH_SECRET`
- You can use this command to generate secrets: `openssl rand -base64 32`

### 3. Set Up NeonDB Database

#### Option A: Using NeonDB (Recommended)

1. Go to [NeonDB](https://neon.tech) and create a free account
2. Create a new project
3. Copy the connection string from the dashboard
4. Paste it into your `.env` file as `DATABASE_URL`

#### Option B: Using Local PostgreSQL

If you have PostgreSQL installed locally:

```env
DATABASE_URL=postgresql://postgres:password@localhost:5432/if_agent?sslmode=disable
```

### 4. Run Database Migrations

Push the database schema to your database:

```bash
npx drizzle-kit push
```

This will create all the necessary tables in your database.

### 5. (Optional) Seed Initial Data

If you want to create a test user, you can create a seed script. For now, you'll need to manually create a user in the database or use a database client.

To create a test user manually, you can use this SQL (after hashing the password):

```sql
-- First, hash a password using bcrypt (you can use an online tool or Node.js)
-- Example: password "password123" hashed = "$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewY5GyY5Y5Y5Y5Y5Y"

INSERT INTO users (email, password_hash, first_name, last_name, role, is_active)
VALUES (
  'officer@example.com',
  '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewY5GyY5Y5Y5Y5Y5Y', -- Replace with actual hash
  'John',
  'Doe',
  'loan_officer',
  true
);
```

Or create a simple seed script (see below).

### 6. Start the Development Server

```bash
npm run dev
```

The server will start on `http://localhost:3000`

### 7. Test the API

#### Test the Homepage
Open your browser and go to: `http://localhost:3000`

#### Test Authentication

**Login:**
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "officer@example.com",
    "password": "password123"
  }'
```

**Get Current User (requires token):**
```bash
curl -X GET http://localhost:3000/api/users/me \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

#### Test Loan Applications

**Create Application (requires token):**
```bash
curl -X POST http://localhost:3000/api/applications \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "customer": {
      "firstName": "Jane",
      "lastName": "Smith",
      "email": "jane@example.com",
      "phone": "+1234567890",
      "addressLine1": "123 Main St",
      "city": "New York",
      "state": "NY",
      "zipCode": "10001"
    },
    "loanType": "personal",
    "loanAmount": 25000,
    "requestedTermMonths": 36,
    "purpose": "Home improvement"
  }'
```

**List Applications:**
```bash
curl -X GET "http://localhost:3000/api/applications?page=1&limit=20" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

## Using Postman or Insomnia

1. Import the API endpoints
2. Set up environment variables:
   - `base_url`: `http://localhost:3000`
   - `token`: (from login response)
3. Use the token in the Authorization header: `Bearer {{token}}`

## Troubleshooting

### Database Connection Issues

If you get connection errors:
- Verify your `DATABASE_URL` is correct
- Check if your database is accessible
- For NeonDB, ensure you're using the correct connection string format

### Port Already in Use

If port 3000 is already in use:
```bash
# Kill the process using port 3000
lsof -ti:3000 | xargs kill -9

# Or use a different port
PORT=3001 npm run dev
```

### TypeScript Errors

If you see TypeScript errors:
```bash
# Regenerate types
npm run build
```

### Database Schema Issues

If tables aren't created:
```bash
# Check your database connection
npx drizzle-kit studio

# Or push schema again
npx drizzle-kit push
```

## Development Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npx drizzle-kit push` - Push database schema
- `npx drizzle-kit studio` - Open Drizzle Studio (database GUI)

## Next Steps

1. Create test users in the database
2. Test all API endpoints
3. Set up your frontend to connect to this backend
4. Configure file upload storage (S3, etc.) for production

