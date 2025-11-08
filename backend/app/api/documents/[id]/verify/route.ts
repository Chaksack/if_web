import { NextRequest, NextResponse } from 'next/server'
import { withAuth, AuthenticatedRequest } from '@/lib/middleware/auth'
import { db, documents } from '@/lib/db'
import { eq } from 'drizzle-orm'
import { handleError } from '@/lib/utils/errors'

// POST /api/documents/[id]/verify - Verify document (office staff)
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

    // Only office staff, managers, and admins can verify documents
    if (!['office_staff', 'manager', 'admin'].includes(req.user.role)) {
      return NextResponse.json(
        { error: { code: 'FORBIDDEN', message: 'Insufficient permissions' } },
        { status: 403 }
      )
    }

    const [document] = await db
      .select()
      .from(documents)
      .where(eq(documents.id, params.id))
      .limit(1)

    if (!document) {
      return NextResponse.json(
        { error: { code: 'NOT_FOUND', message: 'Document not found' } },
        { status: 404 }
      )
    }

    const body = await req.json()
    const { isVerified, notes } = body

    const [updated] = await db
      .update(documents)
      .set({
        isVerified: isVerified !== undefined ? isVerified : true,
        verifiedBy: req.user.userId,
        verifiedAt: new Date(),
        notes: notes || document.notes,
      })
      .where(eq(documents.id, params.id))
      .returning()

    return NextResponse.json(updated)
  } catch (error) {
    const { error: errorResponse, statusCode } = handleError(error)
    return NextResponse.json(errorResponse, { status: statusCode })
  }
}

export const POST = withAuth(POSTHandler)

