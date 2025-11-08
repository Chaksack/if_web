# Email Notification Setup (Resend)

This document explains how email notifications are configured for the IF Agent application.

## Overview

When a loan application is successfully submitted, an automated email is sent to the applicant's email address confirming receipt of their application.

## Features

- **Automatic Email Sending**: Emails are sent automatically when an application status changes to "submitted"
- **Professional Email Template**: Branded email template with application details
- **Non-Blocking**: Email failures don't prevent application submission
- **Error Logging**: Email errors are logged for debugging

## Setup Instructions

### 1. Get Resend API Key

1. Go to [Resend.com](https://resend.com) and create an account
2. Navigate to [API Keys](https://resend.com/api-keys)
3. Create a new API key
4. Copy the API key (starts with `re_`)

### 2. Configure Domain (Required for Production)

To send emails from `noreply@notifications.innovative-finance.com`:

1. Go to [Resend Domains](https://resend.com/domains)
2. Add your domain: `innovative-finance.com`
3. Add the DNS records provided by Resend to your domain's DNS settings
4. Wait for domain verification (usually takes a few minutes)

**Note**: For testing, you can use Resend's default domain, but you'll need to verify your domain for production use.

### 3. Add Environment Variable

Add the Resend API key to your `.env` file:

```env
RESEND_API_KEY=re_your_api_key_here
```

### 4. For Vercel Deployment

Add the environment variable in Vercel Dashboard:
1. Go to your project → Settings → Environment Variables
2. Add `RESEND_API_KEY` with your API key value
3. Redeploy your application

Or via CLI:
```bash
vercel env add RESEND_API_KEY
```

## Email Template

The email template is located at:
- `backend/components/email-template.tsx`

The template includes:
- Professional branding with purple color scheme
- Application details (number, loan type, amount)
- Clear call-to-action and next steps
- Responsive design

## Email Service

The email service is located at:
- `backend/lib/email/email-service.ts`

### Usage

```typescript
import { sendApplicationSubmittedEmail } from '@/lib/email/email-service'

await sendApplicationSubmittedEmail({
  to: 'customer@example.com',
  firstName: 'John',
  applicationNumber: 'APP-2024-001',
  loanType: 'Personal Loan',
  loanAmount: 'GHS 25,000.00',
})
```

## Integration

The email is automatically sent when:
- An application is submitted via `POST /api/applications/[id]/submit`
- The customer has a valid email address
- The application status changes from "draft" to "submitted"

### Error Handling

- If email sending fails, the error is logged but doesn't fail the application submission
- Errors are logged to the console for debugging
- Missing email addresses are logged as warnings

## Testing

### Test Email Sending

1. Create a test application with a valid customer email
2. Submit the application
3. Check the customer's email inbox
4. Check backend logs for email sending confirmation

### Test with Resend Dashboard

1. Go to [Resend Logs](https://resend.com/emails)
2. View sent emails and their status
3. Check for any delivery issues

## Troubleshooting

### Email Not Sending

1. **Check API Key**: Verify `RESEND_API_KEY` is set correctly
2. **Check Domain**: Ensure domain is verified in Resend dashboard
3. **Check Logs**: Look for email errors in backend console
4. **Check Customer Email**: Verify customer has a valid email address

### Common Errors

- **"Invalid API Key"**: Check your `RESEND_API_KEY` in `.env`
- **"Domain not verified"**: Verify your domain in Resend dashboard
- **"Email address invalid"**: Check customer email format

## Email Content

The email includes:
- Subject: "Thank you for applying"
- From: "Innovative Finance <noreply@notifications.innovative-finance.com>"
- Application number
- Loan type and amount
- Next steps information
- Contact information

## Future Enhancements

Potential improvements:
- Email templates for other status changes (approved, rejected)
- Email preferences for customers
- Email scheduling and retry logic
- Email analytics and tracking

