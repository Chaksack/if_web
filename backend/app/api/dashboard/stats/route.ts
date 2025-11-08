import { NextRequest, NextResponse } from 'next/server'
import { withAuth, AuthenticatedRequest } from '@/lib/middleware/auth'
import { db, loanApplications } from '@/lib/db'
import { eq, sql, and, gte } from 'drizzle-orm'
import { handleError } from '@/lib/utils/errors'

// GET /api/dashboard/stats - Get dashboard statistics
async function GETHandler(req: AuthenticatedRequest) {
  try {
    if (!req.user) {
      return NextResponse.json(
        { error: { code: 'UNAUTHORIZED', message: 'User not authenticated' } },
        { status: 401 }
      )
    }

    // All authenticated users can view dashboard stats
    // Loan officers will see stats for their own applications only
    const isLoanOfficer = req.user.role === 'loan_officer'
    const userId = req.user.userId

    // Build where conditions based on user role
    const conditions = []
    if (isLoanOfficer) {
      conditions.push(eq(loanApplications.loanOfficerId, userId))
    }

    // Get current month start date
    const now = new Date()
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1)
    monthStart.setHours(0, 0, 0, 0)

    // Get total applications
    const whereClause = conditions.length > 0 ? and(...conditions) : undefined
    const [totalResult] = await db
      .select({ count: sql<number>`count(*)` })
      .from(loanApplications)
      .where(whereClause)

    const totalApplications = Number(totalResult?.count || 0)

    // Get applications by status
    const statusCounts = await db
      .select({
        status: loanApplications.status,
        count: sql<number>`count(*)`,
      })
      .from(loanApplications)
      .where(whereClause)
      .groupBy(loanApplications.status)

    const applicationsByStatus: Record<string, number> = {
      draft: 0,
      submitted: 0,
      under_review: 0,
      approved: 0,
      rejected: 0,
      withdrawn: 0,
    }

    statusCounts.forEach((item) => {
      applicationsByStatus[item.status] = Number(item.count)
    })

    // Get applications submitted today
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    const todayConditions = [
      eq(loanApplications.status, 'submitted'),
      gte(loanApplications.submittedAt, today),
    ]
    if (isLoanOfficer) {
      todayConditions.push(eq(loanApplications.loanOfficerId, userId))
    }

    const [todayResult] = await db
      .select({ count: sql<number>`count(*)` })
      .from(loanApplications)
      .where(and(...todayConditions))

    const applicationsToday = Number(todayResult?.count || 0)

    // Get total loan amount for approved applications this month
    // For approved apps, check if submittedAt or createdAt is within this month
    const approvedBaseConditions = [eq(loanApplications.status, 'approved')]
    if (isLoanOfficer) {
      approvedBaseConditions.push(eq(loanApplications.loanOfficerId, userId))
    }

    // Get all approved applications first, then filter by date in JavaScript
    const allApproved = await db
      .select({
        loanAmount: loanApplications.loanAmount,
        submittedAt: loanApplications.submittedAt,
        createdAt: loanApplications.createdAt,
      })
      .from(loanApplications)
      .where(and(...approvedBaseConditions))

    // Filter by month and sum
    const totalLoanAmount = allApproved
      .filter((app) => {
        const date = app.submittedAt || app.createdAt
        return date && new Date(date) >= monthStart
      })
      .reduce((sum, app) => sum + Number(app.loanAmount || 0), 0)

    // Get pending count (submitted + under_review)
    const pendingConditions = [
      sql`${loanApplications.status} IN ('submitted', 'under_review')`,
    ]
    if (isLoanOfficer) {
      pendingConditions.push(eq(loanApplications.loanOfficerId, userId))
    }

    const [pendingResult] = await db
      .select({ count: sql<number>`count(*)` })
      .from(loanApplications)
      .where(and(...pendingConditions))

    const pendingCount = Number(pendingResult?.count || 0)

    // Get approved count
    const approvedCountConditions = [eq(loanApplications.status, 'approved')]
    if (isLoanOfficer) {
      approvedCountConditions.push(eq(loanApplications.loanOfficerId, userId))
    }

    const [approvedCountResult] = await db
      .select({ count: sql<number>`count(*)` })
      .from(loanApplications)
      .where(and(...approvedCountConditions))

    const approvedCount = Number(approvedCountResult?.count || 0)

    // Get rejected count
    const rejectedCountConditions = [eq(loanApplications.status, 'rejected')]
    if (isLoanOfficer) {
      rejectedCountConditions.push(eq(loanApplications.loanOfficerId, userId))
    }

    const [rejectedCountResult] = await db
      .select({ count: sql<number>`count(*)` })
      .from(loanApplications)
      .where(and(...rejectedCountConditions))

    const rejectedCount = Number(rejectedCountResult?.count || 0)

    // Calculate average processing time (in hours)
    // This is a simplified calculation - in production, you'd calculate actual processing times
    const averageProcessingTimeHours = 48 // Placeholder

    return NextResponse.json({
      totalApplications,
      applicationsByStatus,
      applicationsToday,
      pendingReview: pendingCount,
      totalLoanAmount,
      averageProcessingTimeHours,
      approvedCount,
      rejectedCount,
      pendingCount,
    })
  } catch (error) {
    const { error: errorResponse, statusCode } = handleError(error)
    return NextResponse.json(errorResponse, { status: statusCode })
  }
}

export const GET = withAuth(GETHandler)

