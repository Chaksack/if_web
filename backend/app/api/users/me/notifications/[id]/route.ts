import { NextRequest, NextResponse } from 'next/server'
import { withAuth, AuthenticatedRequest } from '@/lib/middleware/auth'
import { db, applicationStatusHistory, loanApplications } from '@/lib/db'
import { eq, and } from 'drizzle-orm'
import { handleError } from '@/lib/utils/errors'

// DELETE /api/users/me/notifications/[id] - Delete a specific notification
async function DELETEHandler(req: AuthenticatedRequest) {
  try {
    if (!req.user) {
      return NextResponse.json(
        { error: { code: 'UNAUTHORIZED', message: 'User not authenticated' } },
        { status: 401 }
      )
    }

    // Extract notification ID from URL path
    const url = new URL(req.url)
    const pathParts = url.pathname.split('/')
    const notificationsIndex = pathParts.indexOf('notifications')
    const notificationId = notificationsIndex >= 0 ? pathParts[notificationsIndex + 1] : null

    if (!notificationId) {
      return NextResponse.json(
        { error: { code: 'BAD_REQUEST', message: 'Notification ID is required' } },
        { status: 400 }
      )
    }

    // Verify that the notification belongs to an application where the user is the loan officer
    const [notification] = await db
      .select({
        id: applicationStatusHistory.id,
        loanApplicationId: applicationStatusHistory.loanApplicationId,
        loanOfficerId: loanApplications.loanOfficerId,
      })
      .from(applicationStatusHistory)
      .innerJoin(loanApplications, eq(applicationStatusHistory.loanApplicationId, loanApplications.id))
      .where(eq(applicationStatusHistory.id, notificationId))
      .limit(1)

    if (!notification) {
      return NextResponse.json(
        { error: { code: 'NOT_FOUND', message: 'Notification not found' } },
        { status: 404 }
      )
    }

    // Check if user is the loan officer for this application
    if (notification.loanOfficerId !== req.user.userId) {
      return NextResponse.json(
        { error: { code: 'FORBIDDEN', message: 'Access denied' } },
        { status: 403 }
      )
    }

    // Delete the notification (status history entry)
    await db
      .delete(applicationStatusHistory)
      .where(eq(applicationStatusHistory.id, notificationId))

    return NextResponse.json({
      message: 'Notification deleted successfully',
    })
  } catch (error) {
    console.error('Delete notification error:', error)
    const { error: errorResponse, statusCode } = handleError(error)
    return NextResponse.json(errorResponse, { status: statusCode })
  }
}

export const DELETE = withAuth(DELETEHandler)

