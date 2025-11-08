import { NextRequest, NextResponse } from 'next/server'
import { verifyRefreshToken, signToken, signRefreshToken } from '@/lib/auth/jwt'
import { handleError } from '@/lib/utils/errors'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const refreshToken = body.refresh_token || body.refreshToken

    if (!refreshToken) {
      return NextResponse.json(
        { error: { code: 'MISSING_TOKEN', message: 'Refresh token is required' } },
        { status: 400 }
      )
    }

    // Verify refresh token
    const payload = verifyRefreshToken(refreshToken)

    // Generate new tokens
    const newToken = signToken(payload)
    const newRefreshToken = signRefreshToken(payload)

    // Calculate expiration
    const expiresAt = new Date()
    expiresAt.setDate(expiresAt.getDate() + 7) // Default 7 days

    return NextResponse.json({
      token: newToken,
      refresh_token: newRefreshToken,
      expires_at: expiresAt.toISOString(),
    })
  } catch (error) {
    const { error: errorResponse, statusCode } = handleError(error)
    return NextResponse.json(errorResponse, { status: statusCode })
  }
}

