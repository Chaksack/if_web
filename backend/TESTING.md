# Local Testing Guide

## Quick Start

### 1. Start the Development Server

```bash
cd backend
npm run dev
```

The server will start on `http://localhost:3000`

### 2. Run Automated Tests

```bash
npm run test:api
```

This will run a comprehensive test suite that tests all major API endpoints.

## Manual Testing Options

### Option 1: Using cURL

#### Test Login
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "officer@example.com",
    "password": "password123"
  }'
```

Save the token from the response, then use it in subsequent requests.

#### Test Get Current User
```bash
curl -X GET http://localhost:3000/api/users/me \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

#### Test Create Application
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

#### Test List Applications
```bash
curl -X GET "http://localhost:3000/api/applications?page=1&limit=10" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

#### Test Get Application Details
```bash
curl -X GET http://localhost:3000/api/applications/APPLICATION_ID \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

#### Test Submit Application
```bash
curl -X POST http://localhost:3000/api/applications/APPLICATION_ID/submit \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "notes": "Application ready for review"
  }'
```

### Option 2: Using Postman or Insomnia

1. **Import Collection**: Create a new collection
2. **Set Environment Variables**:
   - `base_url`: `http://localhost:3000`
   - `token`: (will be set after login)

3. **Create Requests**:
   - **POST** `/api/auth/login` - Login and save token
   - **GET** `/api/users/me` - Get current user
   - **POST** `/api/applications` - Create application
   - **GET** `/api/applications` - List applications
   - **GET** `/api/applications/:id` - Get application details
   - **POST** `/api/applications/:id/submit` - Submit application
   - **POST** `/api/applications/:id/employment` - Add employment info
   - **POST** `/api/applications/:id/financial` - Add financial info
   - **POST** `/api/applications/:id/comments` - Add comment
   - **GET** `/api/applications/:id/status-history` - Get status history
   - **GET** `/api/dashboard/stats` - Get dashboard stats

### Option 3: Using Browser (for GET requests)

1. Login first to get a token:
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"officer@example.com","password":"password123"}'
```

2. Copy the token and use it in browser:
```
http://localhost:3000/api/users/me
```

Add the token in browser DevTools Network tab or use a browser extension like "ModHeader" to add the Authorization header.

### Option 4: Using JavaScript/TypeScript

Create a test file and run it with Node.js:

```typescript
const API_URL = 'http://localhost:3000'

async function test() {
  // Login
  const loginRes = await fetch(`${API_URL}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: 'officer@example.com',
      password: 'password123'
    })
  })
  const { token } = await loginRes.json()
  
  // Use token for authenticated requests
  const userRes = await fetch(`${API_URL}/api/users/me`, {
    headers: { 'Authorization': `Bearer ${token}` }
  })
  const user = await userRes.json()
  console.log(user)
}

test()
```

## Test Users

The seed script creates these test users:

- **Loan Officer**: `officer@example.com` / `password123`
- **Office Staff**: `staff@example.com` / `password123`
- **Admin**: `admin@example.com` / `password123`

## Testing Different Roles

### Loan Officer
- Can create applications
- Can submit applications
- Can only see their own applications

### Office Staff
- Can review applications
- Can verify documents
- Can see all applications
- Can update application status

### Admin
- Full access to all endpoints
- Can manage users
- Can view dashboard stats

## Common Test Scenarios

### 1. Complete Application Flow
1. Login as loan officer
2. Create application
3. Add employment info
4. Add financial info
5. Upload documents (if implemented)
6. Submit application
7. Login as office staff
8. Review application
9. Update status to approved/rejected

### 2. Document Upload
```bash
curl -X POST http://localhost:3000/api/applications/APPLICATION_ID/documents \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -F "file=@/path/to/document.pdf" \
  -F "documentType=id_driver_license" \
  -F "notes=Driver license document"
```

### 3. Dashboard Stats
```bash
curl -X GET http://localhost:3000/api/dashboard/stats \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

## Troubleshooting

### Error: "UNAUTHORIZED"
- Make sure you're including the Authorization header
- Check that your token hasn't expired
- Verify you logged in successfully

### Error: "FORBIDDEN"
- Check that your user has the correct role
- Verify you're trying to access resources you have permission for

### Error: "NOT_FOUND"
- Check that the resource ID exists
- Verify the endpoint URL is correct

### Error: "VALIDATION_ERROR"
- Check the request body matches the expected schema
- Verify all required fields are included
- Check data types match (e.g., numbers vs strings)

## View Database

You can view your database using Drizzle Studio:

```bash
npm run db:studio
```

This opens a web interface at `http://localhost:4983` where you can browse your database tables and data.

