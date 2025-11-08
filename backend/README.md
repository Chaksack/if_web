# IF Agent Backend

Next.js backend API for the loan application field collection system.

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Database**: NeonDB (PostgreSQL) with Drizzle ORM
- **Authentication**: JWT tokens
- **Validation**: Zod
- **Styling**: Tailwind CSS + ShadCN UI
- **Language**: TypeScript

## Setup

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
```bash
cp .env.example .env
```

Update `.env` with your configuration:
- `DATABASE_URL`: Your NeonDB connection string
- `JWT_SECRET`: Secret key for JWT tokens
- `JWT_REFRESH_SECRET`: Secret key for refresh tokens

3. Run database migrations:
```bash
npx drizzle-kit push
```

4. Start development server:
```bash
npm run dev
```

The API will be available at `http://localhost:3000`

## API Endpoints

### Authentication
- `POST /api/auth/login` - Login user
- `POST /api/auth/refresh` - Refresh JWT token

### Users
- `GET /api/users/me` - Get current user

### Loan Applications
- `GET /api/applications` - List applications (with pagination and filters)
- `POST /api/applications` - Create new application
- `GET /api/applications/[id]` - Get application details
- `PATCH /api/applications/[id]` - Update application (draft only)
- `POST /api/applications/[id]/submit` - Submit application for review
- `POST /api/applications/[id]/review` - Review application (office staff)

### Employment & Financial Info
- `POST /api/applications/[id]/employment` - Add/update employment info
- `GET /api/applications/[id]/employment` - Get employment info
- `POST /api/applications/[id]/financial` - Add/update financial info
- `GET /api/applications/[id]/financial` - Get financial info

### Documents
- `POST /api/applications/[id]/documents` - Upload document
- `GET /api/applications/[id]/documents` - List documents
- `DELETE /api/documents/[id]` - Delete document
- `POST /api/documents/[id]/verify` - Verify document (office staff)

### Comments & History
- `POST /api/applications/[id]/comments` - Add comment
- `GET /api/applications/[id]/comments` - Get comments
- `GET /api/applications/[id]/status-history` - Get status history

### Dashboard
- `GET /api/dashboard/stats` - Get dashboard statistics

## Database Schema

The database schema is defined in `lib/db/schema.ts` using Drizzle ORM. Key tables:

- `users` - System users (loan officers, office staff, admins)
- `customers` - Customer/applicant information
- `loan_applications` - Main loan application records
- `employment_info` - Employment details
- `financial_info` - Financial information
- `documents` - Uploaded documents
- `field_sessions` - Field collection sessions
- `application_status_history` - Status change history
- `application_comments` - Comments and notes
- `signatures` - Digital signatures
- `audit_logs` - Audit trail

## Authentication

The API uses JWT-based authentication. Include the token in the Authorization header:

```
Authorization: Bearer <token>
```

## Roles

- `loan_officer`: Can create and submit applications
- `office_staff`: Can review and process applications
- `manager`: Can view all applications and manage users
- `admin`: Full system access

## Development

### Database Migrations

Generate migrations:
```bash
npx drizzle-kit generate
```

Push schema changes:
```bash
npx drizzle-kit push
```

### Type Safety

The project uses TypeScript with strict type checking. All API routes are type-safe with Zod validation.

## Production Deployment

1. Set environment variables in your hosting platform
2. Run database migrations
3. Build the application:
```bash
npm run build
```
4. Start the production server:
```bash
npm start
```

## Notes

- Document uploads currently store metadata only. Integrate with S3 or similar storage for production.
- JWT tokens expire after 7 days by default (configurable via `JWT_EXPIRES_IN`)
- All timestamps are stored in UTC
- Sensitive fields (SSN) should be encrypted at rest in production

