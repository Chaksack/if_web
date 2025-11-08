import { NextResponse } from 'next/server'
import { withAuth, AuthenticatedRequest } from '@/lib/middleware/auth'
import { db, loanApplications, applicationStatusHistory } from '@/lib/db'
import { eq } from 'drizzle-orm'
import { reviewApplicationSchema } from '@/lib/utils/validation'
import { handleError } from '@/lib/utils/errors'

async function POSTHandler(req: AuthenticatedRequest) {
  try {
    if (!req.user) {
      return NextResponse.json(
        { error: { code: 'UNAUTHORIZED', message: 'User not authenticated' } },
        { status: 401 }
      )
    }

    // Only office staff, managers, and admins can review applications
    if (!['office_staff', 'manager', 'admin'].includes(req.user.role)) {
      return NextResponse.json(
        { error: { code: 'FORBIDDEN', message: 'Insufficient permissions' } },
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

    const body = await req.json()
    const validatedData = reviewApplicationSchema.parse(body)

    const previousStatus = application.status

    // Update application status
    const [updated] = await db
      .update(loanApplications)
      .set({
        status: validatedData.status,
        reviewedBy: req.user.userId,
        reviewedAt: new Date(),
        decisionNotes: validatedData.decisionNotes,
        updatedAt: new Date(),
      })
      .where(eq(loanApplications.id, applicationId))
      .returning()

    // Create status history entry
    await db.insert(applicationStatusHistory).values({
      loanApplicationId: application.id,
      previousStatus,
      newStatus: validatedData.status,
      changedBy: req.user.userId,
      notes: validatedData.decisionNotes || `Status changed to ${validatedData.status}`,
    })

    return NextResponse.json({
      id: updated.id,
      status: updated.status,
      reviewedBy: updated.reviewedBy,
      reviewedAt: updated.reviewedAt,
    })
  } catch (error) {
    const { error: errorResponse, statusCode } = handleError(error)
    return NextResponse.json(errorResponse, { status: statusCode })
  }
}

export const POST = withAuth(POSTHandler)

