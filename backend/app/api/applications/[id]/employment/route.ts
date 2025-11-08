import { NextRequest, NextResponse } from 'next/server'
import { withAuth, AuthenticatedRequest } from '@/lib/middleware/auth'
import { db, employmentInfo, loanApplications } from '@/lib/db'
import { eq } from 'drizzle-orm'
import { employmentInfoSchema } from '@/lib/utils/validation'
import { handleError } from '@/lib/utils/errors'

// POST /api/applications/[id]/employment - Add or update employment info
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

    // Check permissions
    if (req.user.role === 'loan_officer' && application.loanOfficerId !== req.user.userId) {
      return NextResponse.json(
        { error: { code: 'FORBIDDEN', message: 'Access denied' } },
        { status: 403 }
      )
    }

    const body = await req.json()
    const validatedData = employmentInfoSchema.parse(body)

    // Check if employment info already exists
    const [existing] = await db
      .select()
      .from(employmentInfo)
      .where(eq(employmentInfo.loanApplicationId, params.id))
      .limit(1)

    let result
    if (existing) {
      // Update existing
      [result] = await db
        .update(employmentInfo)
        .set({
          ...validatedData,
          monthlyIncome: validatedData.monthlyIncome?.toString(),
          updatedAt: new Date(),
        })
        .where(eq(employmentInfo.loanApplicationId, params.id))
        .returning()
    } else {
      // Create new
      [result] = await db
        .insert(employmentInfo)
        .values({
          loanApplicationId: params.id,
          ...validatedData,
          monthlyIncome: validatedData.monthlyIncome?.toString(),
        })
        .returning()
    }

    return NextResponse.json(result, { status: existing ? 200 : 201 })
  } catch (error) {
    const { error: errorResponse, statusCode } = handleError(error)
    return NextResponse.json(errorResponse, { status: statusCode })
  }
}

// GET /api/applications/[id]/employment - Get employment info
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

    const [employment] = await db
      .select()
      .from(employmentInfo)
      .where(eq(employmentInfo.loanApplicationId, params.id))
      .limit(1)

    if (!employment) {
      return NextResponse.json(
        { error: { code: 'NOT_FOUND', message: 'Employment information not found' } },
        { status: 404 }
      )
    }

    return NextResponse.json(employment)
  } catch (error) {
    const { error: errorResponse, statusCode } = handleError(error)
    return NextResponse.json(errorResponse, { status: statusCode })
  }
}

export const POST = withAuth(POSTHandler)
export const GET = withAuth(GETHandler)

