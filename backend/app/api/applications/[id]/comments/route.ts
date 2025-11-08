import { NextRequest, NextResponse } from 'next/server'
import { withAuth, AuthenticatedRequest } from '@/lib/middleware/auth'
import { db, applicationComments, loanApplications } from '@/lib/db'
import { eq, desc } from 'drizzle-orm'
import { commentSchema } from '@/lib/utils/validation'
import { handleError } from '@/lib/utils/errors'

// POST /api/applications/[id]/comments - Add comment
async function POSTHandler(
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

    // Check if application exists
    const [application] = await db
      .select()
      .from(loanApplications)
      .where(eq(loanApplications.id, params.id))
      .limit(1)

    if (!application) {
      return NextResponse.json(
        { error: { code: 'NOT_FOUND', message: 'Application not found' } },
        { status: 404 }
      )
    }

    const body = await req.json()
    const validatedData = commentSchema.parse(body)

    const [comment] = await db
      .insert(applicationComments)
      .values({
        loanApplicationId: params.id,
        userId: req.user.userId,
        comment: validatedData.comment,
        isInternal: validatedData.isInternal,
      })
      .returning()

    return NextResponse.json(comment, { status: 201 })
  } catch (error) {
    const { error: errorResponse, statusCode } = handleError(error)
    return NextResponse.json(errorResponse, { status: statusCode })
  }
}

// GET /api/applications/[id]/comments - Get all comments
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

    const comments = await db
      .select()
      .from(applicationComments)
      .where(eq(applicationComments.loanApplicationId, params.id))
      .orderBy(desc(applicationComments.createdAt))

    return NextResponse.json({ data: comments })
  } catch (error) {
    const { error: errorResponse, statusCode } = handleError(error)
    return NextResponse.json(errorResponse, { status: statusCode })
  }
}

export const POST = withAuth(POSTHandler)
export const GET = withAuth(GETHandler)

