import { NextRequest, NextResponse } from 'next/server'
import { withAuth, AuthenticatedRequest } from '@/lib/middleware/auth'
import { db, users } from '@/lib/db'
import { eq } from 'drizzle-orm'
import { hashPassword, verifyPassword } from '@/lib/auth/password'
import { handleError } from '@/lib/utils/errors'
import { z } from 'zod'

const resetPasswordSchema = z.object({
  currentPassword: z.string().min(1, 'Current password is required'),
  newPassword: z.string().min(8, 'New password must be at least 8 characters'),
})

async function POSTHandler(req: AuthenticatedRequest) {
  try {
    if (!req.user) {
      return NextResponse.json(
        { error: { code: 'UNAUTHORIZED', message: 'User not authenticated' } },
        { status: 401 }
      )
    }

    const body = await req.json()
    const validatedData = resetPasswordSchema.parse(body)

    // Get current user with password hash
    const [user] = await db
      .select({
        id: users.id,
        passwordHash: users.passwordHash,
      })
      .from(users)
      .where(eq(users.id, req.user.userId))
      .limit(1)

    if (!user) {
      return NextResponse.json(
        { error: { code: 'NOT_FOUND', message: 'User not found' } },
        { status: 404 }
      )
    }

    // Verify current password
    const isCurrentPasswordValid = await verifyPassword(
      validatedData.currentPassword,
      user.passwordHash
    )

    if (!isCurrentPasswordValid) {
      return NextResponse.json(
        { error: { code: 'INVALID_PASSWORD', message: 'Current password is incorrect' } },
        { status: 400 }
      )
    }

    // Hash new password
    const newPasswordHash = await hashPassword(validatedData.newPassword)

    // Update password
    await db
      .update(users)
      .set({
        passwordHash: newPasswordHash,
        updatedAt: new Date(),
      })
      .where(eq(users.id, req.user.userId))

    return NextResponse.json({
      message: 'Password updated successfully',
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: { code: 'VALIDATION_ERROR', message: error.errors[0].message } },
        { status: 400 }
      )
    }

    const { error: errorResponse, statusCode } = handleError(error)
    return NextResponse.json(errorResponse, { status: statusCode })
  }
}

export const POST = withAuth(POSTHandler)

