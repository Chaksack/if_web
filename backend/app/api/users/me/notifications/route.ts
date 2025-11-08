import { NextRequest, NextResponse } from 'next/server'
import { withAuth, AuthenticatedRequest } from '@/lib/middleware/auth'
import { db, applicationStatusHistory, loanApplications, customers } from '@/lib/db'
import { eq, desc, inArray, sql, and } from 'drizzle-orm'
import { handleError } from '@/lib/utils/errors'

// GET /api/users/me/notifications - Get application status change notifications
// Only shows notifications for applications where the user is the loan officer
async function GETHandler(req: AuthenticatedRequest) {
  try {
    if (!req.user) {
      return NextResponse.json(
        { error: { code: 'UNAUTHORIZED', message: 'User not authenticated' } },
        { status: 401 }
      )
    }

    const { searchParams } = new URL(req.url)
    const limit = parseInt(searchParams.get('limit') || '50')
    const offset = parseInt(searchParams.get('offset') || '0')

    // Get applications where user is the loan officer (only applications they submitted)
    const userApplications = await db
      .select({
        id: loanApplications.id,
      })
      .from(loanApplications)
      .where(eq(loanApplications.loanOfficerId, req.user.userId))

    const applicationIds = userApplications.map((app) => app.id)

    if (applicationIds.length === 0) {
      return NextResponse.json({
        data: [],
        pagination: {
          limit,
          offset,
          total: 0,
        },
      })
    }

    // Get status history for user's applications
    const notifications = await db
      .select({
        id: applicationStatusHistory.id,
        applicationId: applicationStatusHistory.loanApplicationId,
        previousStatus: applicationStatusHistory.previousStatus,
        newStatus: applicationStatusHistory.newStatus,
        notes: applicationStatusHistory.notes,
        changedBy: applicationStatusHistory.changedBy,
        createdAt: applicationStatusHistory.createdAt,
        applicationNumber: loanApplications.applicationNumber,
        customerFirstName: customers.firstName,
        customerLastName: customers.lastName,
      })
      .from(applicationStatusHistory)
      .innerJoin(loanApplications, eq(applicationStatusHistory.loanApplicationId, loanApplications.id))
      .innerJoin(customers, eq(loanApplications.customerId, customers.id))
      .where(inArray(applicationStatusHistory.loanApplicationId, applicationIds))
      .orderBy(desc(applicationStatusHistory.createdAt))
      .limit(limit)
      .offset(offset)

    // Get total count
    const [totalResult] = await db
      .select({ count: sql<number>`count(*)` })
      .from(applicationStatusHistory)
      .where(inArray(applicationStatusHistory.loanApplicationId, applicationIds))

    const total = Number(totalResult?.count || 0)

    return NextResponse.json({
      data: notifications.map((notification) => ({
        id: notification.id,
        application_id: notification.applicationId,
        application_number: notification.applicationNumber,
        customer_name: `${notification.customerFirstName} ${notification.customerLastName}`,
        old_status: notification.previousStatus,
        new_status: notification.newStatus,
        notes: notification.notes,
        changed_by: notification.changedBy,
        created_at: notification.createdAt,
      })),
      pagination: {
        limit,
        offset,
        total,
      },
    })
  } catch (error) {
    console.error('Notifications error:', error)
    const { error: errorResponse, statusCode } = handleError(error)
    return NextResponse.json(errorResponse, { status: statusCode })
  }
}

// DELETE /api/users/me/notifications - Clear all notifications for the user
async function DELETEHandler(req: AuthenticatedRequest) {
  try {
    if (!req.user) {
      return NextResponse.json(
        { error: { code: 'UNAUTHORIZED', message: 'User not authenticated' } },
        { status: 401 }
      )
    }

    // Get all applications where user is the loan officer
    const userApplications = await db
      .select({
        id: loanApplications.id,
      })
      .from(loanApplications)
      .where(eq(loanApplications.loanOfficerId, req.user.userId))

    const applicationIds = userApplications.map((app) => app.id)

    if (applicationIds.length === 0) {
      return NextResponse.json({
        message: 'No notifications to clear',
        deletedCount: 0,
      })
    }

    // Delete all status history entries for user's applications
    await db
      .delete(applicationStatusHistory)
      .where(
        inArray(applicationStatusHistory.loanApplicationId, applicationIds)
      )

    return NextResponse.json({
      message: 'All notifications cleared successfully',
    })
  } catch (error) {
    console.error('Clear all notifications error:', error)
    const { error: errorResponse, statusCode } = handleError(error)
    return NextResponse.json(errorResponse, { status: statusCode })
  }
}

export const GET = withAuth(GETHandler)
export const DELETE = withAuth(DELETEHandler)

