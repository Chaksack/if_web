import { NextRequest, NextResponse } from 'next/server'
import { withAuth, AuthenticatedRequest } from '@/lib/middleware/auth'
import { db, documents } from '@/lib/db'
import { eq } from 'drizzle-orm'
import { handleError } from '@/lib/utils/errors'

// DELETE /api/documents/[id] - Delete document
async function DELETEHandler(
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

    // Only allow deletion by uploader or admin/manager
    if (document.uploadedBy !== req.user.userId && !['admin', 'manager'].includes(req.user.role)) {
      return NextResponse.json(
        { error: { code: 'FORBIDDEN', message: 'Access denied' } },
        { status: 403 }
      )
    }

    // TODO: Delete file from storage (S3, MinIO, etc.)
    // await deleteFromStorage(document.filePath)

    await db
      .delete(documents)
      .where(eq(documents.id, params.id))

    return NextResponse.json({ message: 'Document deleted successfully' })
  } catch (error) {
    const { error: errorResponse, statusCode } = handleError(error)
    return NextResponse.json(errorResponse, { status: statusCode })
  }
}

export const DELETE = withAuth(DELETEHandler)

