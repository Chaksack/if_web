# API Documentation for Android Integration

## Base URL

- **Development (Emulator)**: `http://10.0.2.2:3000/api`
- **Development (Physical Device)**: `http://YOUR_COMPUTER_IP:3000/api`
- **Production**: `https://your-api-domain.com/api`

## Authentication

All endpoints except `/auth/login` and `/auth/refresh` require authentication via JWT token in the Authorization header:

```
Authorization: Bearer {token}
```

## Endpoints

### POST /auth/login

Login and receive JWT token.

**Request:**
```json
{
  "email": "officer@example.com",
  "password": "password123"
}
```

**Response (200):**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refreshToken": "refresh_token_here",
  "user": {
    "id": "uuid",
    "email": "officer@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "role": "loan_officer",
    "employeeId": "EMP001"
  },
  "expiresAt": "2024-01-01T12:00:00Z"
}
```

**Error (401):**
```json
{
  "error": {
    "code": "INVALID_CREDENTIALS",
    "message": "Invalid email or password"
  }
}
```

### POST /auth/refresh

Refresh JWT token.

**Request:**
```json
{
  "refreshToken": "refresh_token_here"
}
```

**Response (200):**
```json
{
  "token": "new_token_here",
  "refreshToken": "new_refresh_token_here",
  "expiresAt": "2024-01-01T12:00:00Z"
}
```

### GET /users/me

Get current authenticated user.

**Headers:**
```
Authorization: Bearer {token}
```

**Response (200):**
```json
{
  "id": "uuid",
  "email": "officer@example.com",
  "firstName": "John",
  "lastName": "Doe",
  "role": "loan_officer",
  "phone": "+1234567890",
  "employeeId": "EMP001",
  "isActive": true,
  "createdAt": "2024-01-01T10:00:00Z"
}
```

### GET /applications

List loan applications with pagination and filters.

**Headers:**
```
Authorization: Bearer {token}
```

**Query Parameters:**
- `page` (optional, default: 1): Page number
- `limit` (optional, default: 20): Items per page
- `status` (optional): Filter by status (draft, submitted, under_review, approved, rejected, withdrawn)
- `loan_officer_id` (optional): Filter by loan officer ID

**Response (200):**
```json
{
  "data": [
    {
      "id": "uuid",
      "applicationNumber": "APP-2024-001234",
      "customer": {
        "firstName": "Jane",
        "lastName": "Smith",
        "email": "jane@example.com"
      },
      "loanType": "personal",
      "loanAmount": "25000.00",
      "status": "submitted",
      "createdAt": "2024-01-01T10:00:00Z",
      "submittedAt": "2024-01-01T11:00:00Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 100,
    "totalPages": 5
  }
}
```

### POST /applications

Create a new loan application.

**Headers:**
```
Authorization: Bearer {token}
Content-Type: application/json
```

**Request:**
```json
{
  "customer": {
    "firstName": "Jane",
    "lastName": "Smith",
    "email": "jane@example.com",
    "phone": "+1234567890",
    "dateOfBirth": "1990-01-15",
    "ssn": "123-45-6789",
    "addressLine1": "123 Main St",
    "addressLine2": "Apt 4B",
    "city": "New York",
    "state": "NY",
    "zipCode": "10001",
    "country": "USA"
  },
  "loanType": "personal",
  "loanAmount": 25000,
  "requestedTermMonths": 36,
  "purpose": "Home improvement"
}
```

**Response (201):**
```json
{
  "id": "uuid",
  "applicationNumber": "APP-2024-001234",
  "customerId": "uuid",
  "status": "draft",
  "createdAt": "2024-01-01T10:00:00Z"
}
```

### GET /applications/{id}

Get detailed loan application.

**Headers:**
```
Authorization: Bearer {token}
```

**Response (200):**
```json
{
  "id": "uuid",
  "applicationNumber": "APP-2024-001234",
  "customer": {
    "id": "uuid",
    "firstName": "Jane",
    "lastName": "Smith",
    "email": "jane@example.com",
    "phone": "+1234567890",
    "dateOfBirth": "1990-01-15",
    "addressLine1": "123 Main St",
    "city": "New York",
    "state": "NY",
    "zipCode": "10001"
  },
  "loanType": "personal",
  "loanAmount": 25000,
  "requestedTermMonths": 36,
  "purpose": "Home improvement",
  "status": "draft",
  "employmentInfo": {
    "employerName": "ABC Corp",
    "jobTitle": "Software Engineer",
    "monthlyIncome": "5000.00"
  },
  "financialInfo": {
    "totalSavings": "15000.00",
    "creditScore": 720
  },
  "documents": [],
  "signatures": [],
  "createdAt": "2024-01-01T10:00:00Z"
}
```

### PATCH /applications/{id}

Update application (draft only).

**Headers:**
```
Authorization: Bearer {token}
Content-Type: application/json
```

**Request:**
```json
{
  "loanAmount": 30000,
  "purpose": "Updated purpose",
  "priority": "high"
}
```

### POST /applications/{id}/submit

Submit application for review.

**Headers:**
```
Authorization: Bearer {token}
Content-Type: application/json
```

**Request:**
```json
{
  "notes": "Application ready for review"
}
```

**Response (200):**
```json
{
  "id": "uuid",
  "status": "submitted",
  "submittedAt": "2024-01-01T11:00:00Z"
}
```

### POST /applications/{id}/employment

Add or update employment information.

**Headers:**
```
Authorization: Bearer {token}
Content-Type: application/json
```

**Request:**
```json
{
  "employerName": "ABC Corp",
  "jobTitle": "Software Engineer",
  "employmentType": "full_time",
  "monthlyIncome": 5000,
  "employmentStartDate": "2020-01-01",
  "addressLine1": "456 Business Ave",
  "city": "New York",
  "state": "NY",
  "zipCode": "10002",
  "phone": "+1234567891",
  "supervisorName": "John Manager"
}
```

### POST /applications/{id}/financial

Add or update financial information.

**Headers:**
```
Authorization: Bearer {token}
Content-Type: application/json
```

**Request:**
```json
{
  "bankAccounts": [
    {
      "bankName": "Chase Bank",
      "accountType": "checking",
      "balance": 5000
    }
  ],
  "totalSavings": 15000,
  "totalChecking": 5000,
  "monthlyExpenses": 3000,
  "creditScore": 720,
  "debts": [
    {
      "creditor": "Credit Card",
      "monthlyPayment": 200,
      "balance": 5000
    }
  ],
  "assets": [
    {
      "type": "vehicle",
      "value": 15000,
      "description": "2020 Honda Accord"
    }
  ]
}
```

### POST /applications/{id}/documents

Upload document.

**Headers:**
```
Authorization: Bearer {token}
Content-Type: multipart/form-data
```

**Form Data:**
- `file`: File to upload (image/jpeg, image/png, application/pdf)
- `documentType`: Type of document (id_driver_license, id_passport, id_state_id, pay_stub, bank_statement, tax_return, employment_verification, proof_of_address, other)
- `notes` (optional): Additional notes

**Response (201):**
```json
{
  "id": "uuid",
  "documentType": "id_driver_license",
  "fileName": "license.pdf",
  "fileSize": 245760,
  "mimeType": "application/pdf",
  "uploadedAt": "2024-01-01T10:30:00Z"
}
```

### GET /applications/{id}/documents

List all documents for an application.

**Headers:**
```
Authorization: Bearer {token}
```

**Response (200):**
```json
{
  "data": [
    {
      "id": "uuid",
      "documentType": "id_driver_license",
      "fileName": "license.pdf",
      "fileSize": 245760,
      "mimeType": "application/pdf",
      "isVerified": false,
      "uploadedAt": "2024-01-01T10:30:00Z"
    }
  ]
}
```

### POST /applications/{id}/comments

Add comment to application.

**Headers:**
```
Authorization: Bearer {token}
Content-Type: application/json
```

**Request:**
```json
{
  "comment": "Customer provided additional income documentation",
  "isInternal": true
}
```

### GET /applications/{id}/status-history

Get status change history.

**Headers:**
```
Authorization: Bearer {token}
```

**Response (200):**
```json
{
  "data": [
    {
      "id": "uuid",
      "previousStatus": "draft",
      "newStatus": "submitted",
      "changedBy": "uuid",
      "notes": "Application submitted for review",
      "createdAt": "2024-01-01T11:00:00Z"
    }
  ]
}
```

## Error Responses

All errors follow this format:

```json
{
  "error": {
    "code": "ERROR_CODE",
    "message": "Human-readable error message",
    "details": {}
  }
}
```

### HTTP Status Codes

- `200 OK`: Successful request
- `201 Created`: Resource created successfully
- `400 Bad Request`: Invalid request data
- `401 Unauthorized`: Missing or invalid token
- `403 Forbidden`: Insufficient permissions
- `404 Not Found`: Resource not found
- `422 Unprocessable Entity`: Validation errors
- `500 Internal Server Error`: Server error

### Common Error Codes

- `UNAUTHORIZED`: Missing or invalid authorization token
- `FORBIDDEN`: User doesn't have permission for this action
- `NOT_FOUND`: Resource not found
- `VALIDATION_ERROR`: Request data validation failed
- `INVALID_CREDENTIALS`: Invalid email or password
- `ACCOUNT_DISABLED`: User account is disabled
- `INVALID_STATUS`: Application status doesn't allow this action

## Rate Limiting

- **Field Officers**: 100 requests per minute
- **Office Staff**: 200 requests per minute
- **Admins**: 500 requests per minute

Rate limit headers:
- `X-RateLimit-Limit`: Request limit
- `X-RateLimit-Remaining`: Remaining requests
- `X-RateLimit-Reset`: Reset timestamp

