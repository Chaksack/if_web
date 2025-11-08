import { NextResponse } from 'next/server'
import { withAuth, AuthenticatedRequest } from '@/lib/middleware/auth'
import { db, loanApplications } from '@/lib/db'
import { inArray, eq } from 'drizzle-orm'
import { z } from 'zod'
import { handleError } from '@/lib/utils/errors'

const bulkArchiveSchema = z.object({
  applicationIds: z.array(z.string().uuid()),
  archive: z.boolean(), // true to archive, false to unarchive
})

// POST /api/applications/archive - Bulk archive/unarchive applications
async function POSTHandler(req: AuthenticatedRequest) {
  try {
    if (!req.user) {
      return NextResponse.json(
        { error: { code: 'UNAUTHORIZED', message: 'User not authenticated' } },
        { status: 401 }
      )
    }

    // Only office staff, managers, and admins can archive applications
    if (!['office_staff', 'manager', 'admin'].includes(req.user.role)) {
      return NextResponse.json(
        { error: { code: 'FORBIDDEN', message: 'Only office staff, managers, and admins can archive applications' } },
        { status: 403 }
      )
    }

    const body = await req.json()
    const { applicationIds, archive } = bulkArchiveSchema.parse(body)

    if (applicationIds.length === 0) {
      return NextResponse.json(
        { error: { code: 'BAD_REQUEST', message: 'No applications selected' } },
        { status: 400 }
      )
    }

    // Update applications
    const updateData = archive
      ? {
          isArchived: true,
          archivedAt: new Date(),
          archivedBy: req.user.userId,
          updatedAt: new Date(),
        }
      : {
          isArchived: false,
          archivedAt: null,
          archivedBy: null,
          updatedAt: new Date(),
        }

    await db
      .update(loanApplications)
      .set(updateData)
      .where(inArray(loanApplications.id, applicationIds))

    return NextResponse.json({
      success: true,
      message: archive
        ? `${applicationIds.length} application(s) archived successfully`
        : `${applicationIds.length} application(s) unarchived successfully`,
      count: applicationIds.length,
    })
  } catch (error) {
    console.error('Archive applications error:', error)
    const { error: errorResponse, statusCode } = handleError(error)
    return NextResponse.json(errorResponse, { status: statusCode })
  }
}

export const POST = withAuth(POSTHandler)

