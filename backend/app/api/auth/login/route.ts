import { NextRequest, NextResponse } from 'next/server'
import { db, users } from '@/lib/db'
import { eq } from 'drizzle-orm'
import { verifyPassword } from '@/lib/auth/password'
import { signToken, signRefreshToken } from '@/lib/auth/jwt'
import { loginSchema } from '@/lib/utils/validation'
import { handleError } from '@/lib/utils/errors'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const validatedData = loginSchema.parse(body)

    // Find user by email
    const [user] = await db
      .select()
      .from(users)
      .where(eq(users.email, validatedData.email))
      .limit(1)

    if (!user) {
      return NextResponse.json(
        { error: { code: 'INVALID_CREDENTIALS', message: 'Invalid email or password' } },
        { status: 401 }
      )
    }

    // Verify password
    const isValidPassword = await verifyPassword(validatedData.password, user.passwordHash)
    if (!isValidPassword) {
      return NextResponse.json(
        { error: { code: 'INVALID_CREDENTIALS', message: 'Invalid email or password' } },
        { status: 401 }
      )
    }

    // Check if user is active
    if (!user.isActive) {
      return NextResponse.json(
        { error: { code: 'ACCOUNT_DISABLED', message: 'Account is disabled' } },
        { status: 403 }
      )
    }

    // Update last login
    await db
      .update(users)
      .set({ lastLoginAt: new Date() })
      .where(eq(users.id, user.id))

    // Generate tokens
    const payload = {
      userId: user.id,
      email: user.email,
      role: user.role,
    }

    const token = signToken(payload)
    const refreshToken = signRefreshToken(payload)

    // Calculate expiration
    const expiresIn = process.env.JWT_EXPIRES_IN || '7d'
    const expiresAt = new Date()
    expiresAt.setDate(expiresAt.getDate() + 7) // Default 7 days

    return NextResponse.json({
      token,
      refresh_token: refreshToken,
      user: {
        id: user.id,
        email: user.email,
        first_name: user.firstName,
        last_name: user.lastName,
        role: user.role,
        employee_id: user.employeeId,
      },
      expires_at: expiresAt.toISOString(),
    })
  } catch (error) {
    const { error: errorResponse, statusCode } = handleError(error)
    return NextResponse.json(errorResponse, { status: statusCode })
  }
}

