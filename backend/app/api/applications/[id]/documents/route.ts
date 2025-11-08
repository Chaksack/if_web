import { NextRequest, NextResponse } from 'next/server'
import { withAuth, AuthenticatedRequest } from '@/lib/middleware/auth'
import { db, documents, loanApplications } from '@/lib/db'
import { eq } from 'drizzle-orm'
import { handleError } from '@/lib/utils/errors'
import { uploadFileToS3, generateS3Key } from '@/lib/storage/s3'

// POST /api/applications/[id]/documents - Upload document
async function POSTHandler(req: AuthenticatedRequest) {
  try {
    if (!req.user) {
      return NextResponse.json(
        { error: { code: 'UNAUTHORIZED', message: 'User not authenticated' } },
        { status: 401 }
      )
    }

    // Extract application ID from URL path
    const url = new URL(req.url)
    const pathParts = url.pathname.split('/')
    const applicationsIndex = pathParts.indexOf('applications')
    const applicationId = applicationsIndex >= 0 ? pathParts[applicationsIndex + 1] : null

    if (!applicationId) {
      return NextResponse.json(
        { error: { code: 'BAD_REQUEST', message: 'Application ID is required' } },
        { status: 400 }
      )
    }

    // Check if application exists
    const [application] = await db
      .select()
      .from(loanApplications)
      .where(eq(loanApplications.id, applicationId))
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

    const formData = await req.formData()
    const file = formData.get('file') as File
    const documentType = formData.get('documentType') as string
    const notes = formData.get('notes') as string | null

    if (!file) {
      return NextResponse.json(
        { error: { code: 'VALIDATION_ERROR', message: 'File is required' } },
        { status: 400 }
      )
    }

    if (!documentType) {
      return NextResponse.json(
        { error: { code: 'VALIDATION_ERROR', message: 'Document type is required' } },
        { status: 400 }
      )
    }

    // Validate document type
    const validTypes = [
      'id_driver_license',
      'id_passport',
      'id_state_id',
      'pay_stub',
      'bank_statement',
      'tax_return',
      'employment_verification',
      'proof_of_address',
      'other',
    ]

    if (!validTypes.includes(documentType)) {
      return NextResponse.json(
        { error: { code: 'VALIDATION_ERROR', message: 'Invalid document type' } },
        { status: 400 }
      )
    }

    // Validate file size (default 10MB)
    const maxSize = parseInt(process.env.MAX_FILE_SIZE || '10485760')
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: { code: 'VALIDATION_ERROR', message: 'File size exceeds maximum allowed size' } },
        { status: 400 }
      )
    }

    // Validate file type (more lenient for Android)
    const allowedTypes = (process.env.ALLOWED_FILE_TYPES || 'image/jpeg,image/png,image/jpg,application/pdf').split(',')
    const fileType = file.type || 'application/octet-stream'
    const fileExtension = file.name.split('.').pop()?.toLowerCase()
    
    // Check MIME type or file extension
    const isValidType = allowedTypes.includes(fileType) || 
      (fileExtension && ['jpg', 'jpeg', 'png', 'pdf'].includes(fileExtension))
    
    if (!isValidType) {
      console.error('Invalid file type:', { 
        mimeType: fileType, 
        extension: fileExtension, 
        fileName: file.name,
        allowedTypes 
      })
      return NextResponse.json(
        { error: { code: 'VALIDATION_ERROR', message: `File type not allowed. Received: ${fileType || fileExtension}` } },
        { status: 400 }
      )
    }

    // Generate S3 key and upload file
    console.log('Uploading document to S3:', {
      applicationId,
      fileName: file.name,
      fileSize: file.size,
      mimeType: file.type,
      documentType,
    })

    const s3Key = generateS3Key('applications', file.name, applicationId)
    
    try {
      await uploadFileToS3(file, s3Key, file.type || 'application/octet-stream')
      console.log('S3 upload successful:', s3Key)
    } catch (s3Error: any) {
      console.error('S3 upload failed:', s3Error)
      throw new Error(`S3 upload failed: ${s3Error.message || s3Error}`)
    }

    const [document] = await db
      .insert(documents)
      .values({
        loanApplicationId: applicationId,
        documentType: documentType as any,
        fileName: file.name,
        filePath: s3Key, // Store S3 key instead of local path
        fileSize: file.size,
        mimeType: file.type || 'application/octet-stream',
        uploadedBy: req.user.userId,
        notes: notes || null,
      })
      .returning()

    console.log('Document saved to database:', document.id)

    return NextResponse.json(document, { status: 201 })
  } catch (error: any) {
    console.error('Document upload error:', {
      message: error.message,
      stack: error.stack,
      name: error.name,
    })
    const { error: errorResponse, statusCode } = handleError(error)
    return NextResponse.json(errorResponse, { status: statusCode })
  }
}

// GET /api/applications/[id]/documents - List all documents
async function GETHandler(req: AuthenticatedRequest) {
  try {
    if (!req.user) {
      return NextResponse.json(
        { error: { code: 'UNAUTHORIZED', message: 'User not authenticated' } },
        { status: 401 }
      )
    }

    // Extract application ID from URL path
    const url = new URL(req.url)
    const pathParts = url.pathname.split('/')
    const applicationsIndex = pathParts.indexOf('applications')
    const applicationId = applicationsIndex >= 0 ? pathParts[applicationsIndex + 1] : null

    if (!applicationId) {
      return NextResponse.json(
        { error: { code: 'BAD_REQUEST', message: 'Application ID is required' } },
        { status: 400 }
      )
    }

    const applicationDocuments = await db
      .select()
      .from(documents)
      .where(eq(documents.loanApplicationId, applicationId))

    return NextResponse.json({ data: applicationDocuments })
  } catch (error) {
    const { error: errorResponse, statusCode } = handleError(error)
    return NextResponse.json(errorResponse, { status: statusCode })
  }
}

export const POST = withAuth(POSTHandler)
export const GET = withAuth(GETHandler)

