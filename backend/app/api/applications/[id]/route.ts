import { NextRequest, NextResponse } from 'next/server'
import { withAuth, AuthenticatedRequest } from '@/lib/middleware/auth'
import { db, loanApplications, customers, employmentInfo, financialInfo, documents, applicationComments, signatures } from '@/lib/db'
import { eq } from 'drizzle-orm'
import { updateLoanApplicationSchema } from '@/lib/utils/validation'
import { handleError } from '@/lib/utils/errors'

// GET /api/applications/[id] - Get application details
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

    // Check permissions (loan officers can only see their own applications)
    if (req.user.role === 'loan_officer' && application.loanOfficerId !== req.user.userId) {
      return NextResponse.json(
        { error: { code: 'FORBIDDEN', message: 'Access denied' } },
        { status: 403 }
      )
    }

    // Get customer
    const [customer] = await db
      .select()
      .from(customers)
      .where(eq(customers.id, application.customerId))
      .limit(1)

    // Get employment info
    const [employment] = await db
      .select()
      .from(employmentInfo)
      .where(eq(employmentInfo.loanApplicationId, application.id))
      .limit(1)

    // Get financial info
    const [financial] = await db
      .select()
      .from(financialInfo)
      .where(eq(financialInfo.loanApplicationId, application.id))
      .limit(1)

    // Get documents
    const applicationDocuments = await db
      .select()
      .from(documents)
      .where(eq(documents.loanApplicationId, application.id))

    // Transform documents to ensure all required fields are strings
    const transformedDocuments = applicationDocuments.map((doc) => ({
      id: doc.id,
      document_type: doc.documentType,
      file_name: doc.fileName,
      file_path: doc.filePath,
      file_size: doc.fileSize || null,
      mime_type: doc.mimeType || null,
      is_verified: doc.isVerified || false,
      uploaded_at: doc.uploadedAt ? new Date(doc.uploadedAt).toISOString() : new Date().toISOString(),
    }))

    // Get signatures
    const applicationSignatures = await db
      .select()
      .from(signatures)
      .where(eq(signatures.loanApplicationId, application.id))

    // Transform signatures to ensure all required fields are strings
    const transformedSignatures = applicationSignatures.map((sig) => ({
      id: sig.id,
      signer_type: sig.signerType,
      signer_name: sig.signerName,
      signature_data: sig.signatureData || '',
      signed_at: sig.signedAt ? new Date(sig.signedAt).toISOString() : new Date().toISOString(),
      is_verified: sig.isVerified || false,
    }))

    // Return full application object with snake_case field names for Flutter
    return NextResponse.json({
      id: application.id,
      application_number: application.applicationNumber,
      customer_id: application.customerId,
      customer: customer ? {
        id: customer.id,
        first_name: customer.firstName,
        last_name: customer.lastName,
        email: customer.email,
        phone: customer.phone,
        date_of_birth: customer.dateOfBirth,
        address_line1: customer.addressLine1,
        address_line2: customer.addressLine2,
        city: customer.city,
        state: customer.state,
        zip_code: customer.zipCode,
        country: customer.country,
        id_number: customer.idNumber,
        industry: customer.industry,
        place_of_employment: customer.placeOfEmployment,
        loan_history: customer.loanHistory,
        place_of_worship: customer.placeOfWorship,
        income_sources: customer.incomeSources,
        next_of_kin: customer.nextOfKin,
        number_of_dependents: customer.numberOfDependents,
        years_in_business: customer.yearsInBusiness,
      } : null,
      loan_type: application.loanType,
      loan_amount: Number(application.loanAmount),
      requested_term_months: application.requestedTermMonths,
      purpose: application.purpose,
      status: application.status,
      priority: application.priority,
      notes: application.notes,
      employment_info: employment ? {
        id: employment.id,
        loan_application_id: employment.loanApplicationId,
        employer_name: employment.employerName,
        job_title: employment.jobTitle,
        employment_type: employment.employmentType,
        monthly_income: employment.monthlyIncome ? Number(employment.monthlyIncome) : null,
        employment_start_date: employment.employmentStartDate,
        employment_end_date: employment.employmentEndDate,
        address_line1: employment.addressLine1,
        address_line2: employment.addressLine2,
        city: employment.city,
        state: employment.state,
        zip_code: employment.zipCode,
        phone: employment.phone,
        supervisor_name: employment.supervisorName,
        created_at: employment.createdAt ? new Date(employment.createdAt).toISOString() : null,
        updated_at: employment.updatedAt ? new Date(employment.updatedAt).toISOString() : null,
      } : null,
      financial_info: financial ? {
        id: financial.id,
        loan_application_id: financial.loanApplicationId,
        bank_accounts: financial.bankAccounts,
        total_savings: financial.totalSavings ? Number(financial.totalSavings) : null,
        total_checking: financial.totalChecking ? Number(financial.totalChecking) : null,
        monthly_expenses: financial.monthlyExpenses ? Number(financial.monthlyExpenses) : null,
        other_income: financial.otherIncome ? Number(financial.otherIncome) : null,
        debts: financial.debts,
        total_debt: financial.totalDebt ? Number(financial.totalDebt) : null,
        credit_score: financial.creditScore,
        assets: financial.assets,
        created_at: financial.createdAt ? new Date(financial.createdAt).toISOString() : null,
        updated_at: financial.updatedAt ? new Date(financial.updatedAt).toISOString() : null,
      } : null,
      documents: transformedDocuments,
      signatures: transformedSignatures,
      created_at: application.createdAt ? new Date(application.createdAt).toISOString() : new Date().toISOString(),
      updated_at: application.updatedAt ? new Date(application.updatedAt).toISOString() : null,
      submitted_at: application.submittedAt ? new Date(application.submittedAt).toISOString() : null,
    })
  } catch (error) {
    const { error: errorResponse, statusCode } = handleError(error)
    return NextResponse.json(errorResponse, { status: statusCode })
  }
}

// PATCH /api/applications/[id] - Update application (draft only)
async function PATCHHandler(req: AuthenticatedRequest) {
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

    // Only allow updates to draft applications
    if (application.status !== 'draft') {
      return NextResponse.json(
        { error: { code: 'INVALID_STATUS', message: 'Can only update draft applications' } },
        { status: 400 }
      )
    }

    const body = await req.json()
    const validatedData = updateLoanApplicationSchema.parse(body)

    // Update application
    const [updated] = await db
      .update(loanApplications)
      .set({
        ...validatedData,
        loanAmount: validatedData.loanAmount?.toString(),
        updatedAt: new Date(),
      })
      .where(eq(loanApplications.id, applicationId))
      .returning()

    return NextResponse.json({
      id: updated.id,
      status: updated.status,
      updatedAt: updated.updatedAt,
    })
  } catch (error) {
    const { error: errorResponse, statusCode } = handleError(error)
    return NextResponse.json(errorResponse, { status: statusCode })
  }
}

export const GET = withAuth(GETHandler)
export const PATCH = withAuth(PATCHHandler)

