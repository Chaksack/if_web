import { NextResponse } from 'next/server'
import { withAuth, AuthenticatedRequest } from '@/lib/middleware/auth'
import { db, users } from '@/lib/db'
import { eq } from 'drizzle-orm'
import { handleError } from '@/lib/utils/errors'
import { hashPassword } from '@/lib/auth/password'
import { uploadFileToS3, generateS3Key, getS3Url } from '@/lib/storage/s3'

async function GETHandler(req: AuthenticatedRequest) {
  try {
    if (!req.user) {
      return NextResponse.json(
        { error: { code: 'UNAUTHORIZED', message: 'User not authenticated' } },
        { status: 401 }
      )
    }

    const [user] = await db
      .select({
        id: users.id,
        email: users.email,
        firstName: users.firstName,
        lastName: users.lastName,
        role: users.role,
        phone: users.phone,
        employeeId: users.employeeId,
        profilePhoto: users.profilePhoto,
        isActive: users.isActive,
        createdAt: users.createdAt,
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

    return NextResponse.json({
      id: user.id,
      email: user.email,
      first_name: user.firstName,
      last_name: user.lastName,
      role: user.role,
      phone: user.phone,
      employee_id: user.employeeId,
      profile_photo: user.profilePhoto,
      is_active: user.isActive,
      created_at: user.createdAt,
    })
  } catch (error) {
    const { error: errorResponse, statusCode } = handleError(error)
    return NextResponse.json(errorResponse, { status: statusCode })
  }
}

// PATCH /api/users/me - Update user profile
async function PATCHHandler(req: AuthenticatedRequest) {
  try {
    if (!req.user) {
      return NextResponse.json(
        { error: { code: 'UNAUTHORIZED', message: 'User not authenticated' } },
        { status: 401 }
      )
    }

    const formData = await req.formData()
    const phone = formData.get('phone')?.toString()
    const profilePhotoFile = formData.get('profilePhoto') as File | null

    const updateData: {
      phone?: string | null
      profilePhoto?: string | null
      updatedAt: Date
    } = {
      updatedAt: new Date(),
    }

    if (phone !== undefined) updateData.phone = phone || null

    // Handle profile photo upload
    if (profilePhotoFile && profilePhotoFile.size > 0) {
      try {
        // Validate file type
        const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
        const fileType = profilePhotoFile.type || 'application/octet-stream'
        
        if (!allowedTypes.includes(fileType) && !profilePhotoFile.name.match(/\.(jpg|jpeg|png|webp)$/i)) {
          return NextResponse.json(
            { error: { code: 'INVALID_FILE_TYPE', message: 'Profile photo must be an image (JPG, PNG, or WebP)' } },
            { status: 400 }
          )
        }

        // Validate file size (max 5MB)
        const maxSize = 5 * 1024 * 1024 // 5MB
        if (profilePhotoFile.size > maxSize) {
          return NextResponse.json(
            { error: { code: 'FILE_TOO_LARGE', message: 'Profile photo must be less than 5MB' } },
            { status: 400 }
          )
        }

        // Generate S3 key for profile photo
        const s3Key = generateS3Key('profile-photos', profilePhotoFile.name, req.user.userId)

        // Upload to S3
        const buffer = Buffer.from(await profilePhotoFile.arrayBuffer())
        await uploadFileToS3(buffer, s3Key, fileType)

        // Get S3 URL
        updateData.profilePhoto = getS3Url(s3Key)
      } catch (error) {
        console.error('Error uploading profile photo:', error)
        return NextResponse.json(
          { error: { code: 'UPLOAD_ERROR', message: 'Failed to upload profile photo' } },
          { status: 500 }
        )
      }
    }

    // Update user
    const [updated] = await db
      .update(users)
      .set(updateData)
      .where(eq(users.id, req.user.userId))
      .returning({
        id: users.id,
        email: users.email,
        firstName: users.firstName,
        lastName: users.lastName,
        role: users.role,
        phone: users.phone,
        employeeId: users.employeeId,
        profilePhoto: users.profilePhoto,
        isActive: users.isActive,
        createdAt: users.createdAt,
      })

    return NextResponse.json({
      id: updated.id,
      email: updated.email,
      first_name: updated.firstName,
      last_name: updated.lastName,
      role: updated.role,
      phone: updated.phone,
      employee_id: updated.employeeId,
      profile_photo: updated.profilePhoto,
      is_active: updated.isActive,
      created_at: updated.createdAt,
    })
  } catch (error) {
    const { error: errorResponse, statusCode } = handleError(error)
    return NextResponse.json(errorResponse, { status: statusCode })
  }
}

export const GET = withAuth(GETHandler)
export const PATCH = withAuth(PATCHHandler)
