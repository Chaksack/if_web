import { NextRequest, NextResponse } from 'next/server'
import { withAuth, AuthenticatedRequest } from '@/lib/middleware/auth'
import { db, financialInfo, loanApplications } from '@/lib/db'
import { eq } from 'drizzle-orm'
import { financialInfoSchema } from '@/lib/utils/validation'
import { handleError } from '@/lib/utils/errors'

// POST /api/applications/[id]/financial - Add or update financial info
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
    const validatedData = financialInfoSchema.parse(body)

    // Check if financial info already exists
    const [existing] = await db
      .select()
      .from(financialInfo)
      .where(eq(financialInfo.loanApplicationId, params.id))
      .limit(1)

    let result
    if (existing) {
      // Update existing
      [result] = await db
        .update(financialInfo)
        .set({
          ...validatedData,
          totalSavings: validatedData.totalSavings?.toString(),
          totalChecking: validatedData.totalChecking?.toString(),
          monthlyExpenses: validatedData.monthlyExpenses?.toString(),
          otherIncome: validatedData.otherIncome?.toString(),
          totalDebt: validatedData.totalDebt?.toString(),
          updatedAt: new Date(),
        })
        .where(eq(financialInfo.loanApplicationId, params.id))
        .returning()
    } else {
      // Create new
      [result] = await db
        .insert(financialInfo)
        .values({
          loanApplicationId: params.id,
          ...validatedData,
          totalSavings: validatedData.totalSavings?.toString(),
          totalChecking: validatedData.totalChecking?.toString(),
          monthlyExpenses: validatedData.monthlyExpenses?.toString(),
          otherIncome: validatedData.otherIncome?.toString(),
          totalDebt: validatedData.totalDebt?.toString(),
        })
        .returning()
    }

    return NextResponse.json(result, { status: existing ? 200 : 201 })
  } catch (error) {
    const { error: errorResponse, statusCode } = handleError(error)
    return NextResponse.json(errorResponse, { status: statusCode })
  }
}

// GET /api/applications/[id]/financial - Get financial info
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

    const [financial] = await db
      .select()
      .from(financialInfo)
      .where(eq(financialInfo.loanApplicationId, params.id))
      .limit(1)

    if (!financial) {
      return NextResponse.json(
        { error: { code: 'NOT_FOUND', message: 'Financial information not found' } },
        { status: 404 }
      )
    }

    return NextResponse.json(financial)
  } catch (error) {
    const { error: errorResponse, statusCode } = handleError(error)
    return NextResponse.json(errorResponse, { status: statusCode })
  }
}

export const POST = withAuth(POSTHandler)
export const GET = withAuth(GETHandler)

