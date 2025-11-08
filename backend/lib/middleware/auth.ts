import { NextRequest, NextResponse } from 'next/server'
import { verifyToken, JWTPayload } from '@/lib/auth/jwt'

export interface AuthenticatedRequest extends NextRequest {
  user?: JWTPayload
}

export function withAuth(
  handler: (req: AuthenticatedRequest, context?: any) => Promise<NextResponse>
) {
  return async (req: NextRequest, context?: any) => {
    try {
      const authHeader = req.headers.get('authorization')
      
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return NextResponse.json(
          { error: { code: 'UNAUTHORIZED', message: 'Missing or invalid authorization header' } },
          { status: 401 }
        )
      }

      const token = authHeader.substring(7)
      const payload = verifyToken(token)

      // Attach user to request
      const authenticatedReq = req as AuthenticatedRequest
      authenticatedReq.user = payload

      return handler(authenticatedReq, context)
    } catch (error) {
      return NextResponse.json(
        { error: { code: 'UNAUTHORIZED', message: 'Invalid or expired token' } },
        { status: 401 }
      )
    }
  }
}

export function withRole(
  allowedRoles: string[],
  handler: (req: AuthenticatedRequest) => Promise<NextResponse>
) {
  return withAuth(async (req) => {
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      return NextResponse.json(
        { error: { code: 'FORBIDDEN', message: 'Insufficient permissions' } },
        { status: 403 }
      )
    }

    return handler(req)
  })
}

