import { NextRequest, NextResponse } from 'next/server'
import { withAuth, AuthenticatedRequest } from '@/lib/middleware/auth'
import { db, applicationStatusHistory } from '@/lib/db'
import { eq, desc } from 'drizzle-orm'
import { handleError } from '@/lib/utils/errors'

// GET /api/applications/[id]/status-history - Get status history
async function GETHandler(
  req: AuthenticatedRequest,
  { params }: { params: { id: string } }
) {
  try {
    if (!req.user) {
      return NextResponse.json(
        { error: { code: 'UNAUTHORIZED', message: 'User not authenticated' } },
        { status: 401 }
      )
    }

    const history = await db
      .select()
      .from(applicationStatusHistory)
      .where(eq(applicationStatusHistory.loanApplicationId, params.id))
      .orderBy(desc(applicationStatusHistory.createdAt))

    return NextResponse.json({ data: history })
  } catch (error) {
    const { error: errorResponse, statusCode } = handleError(error)
    return NextResponse.json(errorResponse, { status: statusCode })
  }
}

export const GET = withAuth(GETHandler)

