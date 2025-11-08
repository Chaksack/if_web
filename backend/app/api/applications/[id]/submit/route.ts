import { NextResponse } from 'next/server'
import { withAuth, AuthenticatedRequest } from '@/lib/middleware/auth'
import { db, loanApplications, applicationStatusHistory, customers } from '@/lib/db'
import { eq } from 'drizzle-orm'
import { submitApplicationSchema } from '@/lib/utils/validation'
import { handleError } from '@/lib/utils/errors'
import { sendApplicationSubmittedEmail } from '@/lib/email/email-service'

async function POSTHandler(
  req: AuthenticatedRequest
) {
  try {
    if (!req.user) {
      return NextResponse.json(
        { error: { code: 'UNAUTHORIZED', message: 'User not authenticated' } },
        { status: 401 }
      )
    }

    // Only loan officers can submit applications
    if (req.user.role !== 'loan_officer') {
      return NextResponse.json(
        { error: { code: 'FORBIDDEN', message: 'Only loan officers can submit applications' } },
        { status: 403 }
      )
    }

    // Extract application ID from URL path
    const url = new URL(req.url)
    const pathParts = url.pathname.split('/')
    const applicationsIndex = pathParts.indexOf('applications')
    const applicationId = applicationsIndex >= 0 ? pathParts[applicationsIndex + 1] : null

    if (!applicationId) {
      return NextResponse.json(
        { error: { code: 'BAD_REQUEST', message: 'Application ID is required' } },
        { status: 400 }
      )
    }

    const [application] = await db
      .select()
      .from(loanApplications)
      .where(eq(loanApplications.id, applicationId))
      .limit(1)

    if (!application) {
      return NextResponse.json(
        { error: { code: 'NOT_FOUND', message: 'Application not found' } },
        { status: 404 }
      )
    }

    // Check ownership
    if (application.loanOfficerId !== req.user.userId) {
      return NextResponse.json(
        { error: { code: 'FORBIDDEN', message: 'Access denied' } },
        { status: 403 }
      )
    }

    // Only allow submission of draft applications
    if (application.status !== 'draft') {
      return NextResponse.json(
        { error: { code: 'INVALID_STATUS', message: 'Can only submit draft applications' } },
        { status: 400 }
      )
    }

    // Parse request body (may be empty or contain null values)
    let body: any = {}
    try {
      const text = await req.text()
      if (text && text.trim()) {
        body = JSON.parse(text)
        // Convert null values to undefined for Zod validation
        if (body.notes === null) {
          body.notes = undefined
        }
      }
    } catch (e) {
      // Body is empty or invalid, use empty object
      body = {}
    }
    
    const validatedData = submitApplicationSchema.parse(body)

    // Update application status
    const [updated] = await db
      .update(loanApplications)
      .set({
        status: 'submitted',
        submittedAt: new Date(),
        notes: validatedData.notes || application.notes,
        updatedAt: new Date(),
      })
      .where(eq(loanApplications.id, applicationId))
      .returning()

    // Create status history entry
    await db.insert(applicationStatusHistory).values({
      loanApplicationId: application.id,
      previousStatus: 'draft',
      newStatus: 'submitted',
      changedBy: req.user.userId,
      notes: 'Application submitted for review',
    })

    // Get customer for response
    const [customer] = await db
      .select()
      .from(customers)
      .where(eq(customers.id, application.customerId))
      .limit(1)

    // Send email notification to applicant (non-blocking - don't fail submission if email fails)
    if (customer?.email) {
      try {
        const emailResult = await sendApplicationSubmittedEmail({
          to: customer.email,
          firstName: customer.firstName,
          applicationNumber: updated.applicationNumber,
          loanType: updated.loanType,
          loanAmount: updated.loanAmount.toString(),
        })

        if (!emailResult.success) {
          console.error('Failed to send application submitted email:', emailResult.error)
          // Don't fail the submission if email fails
        }
      } catch (emailError) {
        console.error('Error sending application submitted email:', emailError)
        // Don't fail the submission if email fails
      }
    } else {
      console.warn(`No email address found for customer ${customer?.id}, skipping email notification`)
    }

    // Return full application object with snake_case field names for Flutter
    return NextResponse.json({
      id: updated.id,
      application_number: updated.applicationNumber,
      customer_id: updated.customerId,
      customer: customer ? {
        id: customer.id,
        first_name: customer.firstName,
        last_name: customer.lastName,
        email: customer.email,
        phone: customer.phone,
        date_of_birth: customer.dateOfBirth,
        address_line1: customer.addressLine1,
        address_line2: customer.addressLine2,
        city: customer.city,
        state: customer.state,
        zip_code: customer.zipCode,
        country: customer.country,
      } : null,
      loan_type: updated.loanType,
      loan_amount: Number(updated.loanAmount),
      requested_term_months: updated.requestedTermMonths,
      purpose: updated.purpose,
      status: updated.status,
      priority: updated.priority,
      notes: updated.notes,
      submitted_at: updated.submittedAt ? new Date(updated.submittedAt).toISOString() : null,
      created_at: updated.createdAt ? new Date(updated.createdAt).toISOString() : new Date().toISOString(),
      updated_at: updated.updatedAt ? new Date(updated.updatedAt).toISOString() : new Date().toISOString(),
    })
  } catch (error) {
    console.error('Submit application error:', error)
    const { error: errorResponse, statusCode } = handleError(error)
    return NextResponse.json(errorResponse, { status: statusCode })
  }
}

export const POST = withAuth(POSTHandler)

