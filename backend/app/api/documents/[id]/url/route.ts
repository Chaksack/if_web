import { NextResponse } from 'next/server'
import { withAuth, AuthenticatedRequest } from '@/lib/middleware/auth'
import { db, documents } from '@/lib/db'
import { eq } from 'drizzle-orm'
import { getSignedUrlForFile } from '@/lib/storage/s3'
import { handleError } from '@/lib/utils/errors'

// GET /api/documents/[id]/url - Get signed URL for document
async function GETHandler(req: AuthenticatedRequest) {
  try {
    if (!req.user) {
      return NextResponse.json(
        { error: { code: 'UNAUTHORIZED', message: 'User not authenticated' } },
        { status: 401 }
      )
    }

    // Extract document ID from URL path
    const url = new URL(req.url)
    const pathParts = url.pathname.split('/')
    const documentsIndex = pathParts.indexOf('documents')
    const documentId = documentsIndex >= 0 ? pathParts[documentsIndex + 1] : null

    if (!documentId) {
      return NextResponse.json(
        { error: { code: 'BAD_REQUEST', message: 'Document ID is required' } },
        { status: 400 }
      )
    }

    // Get document from database
    const [document] = await db
      .select()
      .from(documents)
      .where(eq(documents.id, documentId))
      .limit(1)

    if (!document) {
      return NextResponse.json(
        { error: { code: 'NOT_FOUND', message: 'Document not found' } },
        { status: 404 }
      )
    }

    // Generate signed URL (valid for 1 hour)
    const signedUrl = await getSignedUrlForFile(document.filePath, 3600)

    return NextResponse.json({
      url: signedUrl,
      fileName: document.fileName,
      mimeType: document.mimeType,
    })
  } catch (error) {
    const { error: errorResponse, statusCode } = handleError(error)
    return NextResponse.json(errorResponse, { status: statusCode })
  }
}

export const GET = withAuth(GETHandler)

