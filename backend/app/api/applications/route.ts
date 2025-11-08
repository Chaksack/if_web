import { NextRequest, NextResponse } from 'next/server'
import { withAuth, AuthenticatedRequest } from '@/lib/middleware/auth'
import { db, customers, loanApplications, users } from '@/lib/db'
import { eq, desc, and, or, like, sql, ilike } from 'drizzle-orm'
import { createLoanApplicationSchema } from '@/lib/utils/validation'
import { generateApplicationNumber } from '@/lib/utils/application-number'
import { handleError } from '@/lib/utils/errors'

// POST /api/applications - Create new loan application
async function POSTHandler(req: AuthenticatedRequest) {
  try {
    if (!req.user) {
      return NextResponse.json(
        { error: { code: 'UNAUTHORIZED', message: 'User not authenticated' } },
        { status: 401 }
      )
    }

    // Only loan officers can create applications
    if (req.user.role !== 'loan_officer') {
      return NextResponse.json(
        { error: { code: 'FORBIDDEN', message: 'Only loan officers can create applications' } },
        { status: 403 }
      )
    }

    const body = await req.json()
    const validatedData = createLoanApplicationSchema.parse(body)

    // Create customer
    const [customer] = await db
      .insert(customers)
      .values({
        ...validatedData.customer,
        createdBy: req.user.userId,
      })
      .returning()

    // Generate application number
    const applicationNumber = generateApplicationNumber()

    // Create loan application
    const [application] = await db
      .insert(loanApplications)
      .values({
        customerId: customer.id,
        loanOfficerId: req.user.userId,
        applicationNumber,
        loanType: validatedData.loanType,
        loanAmount: validatedData.loanAmount.toString(),
        requestedTermMonths: validatedData.requestedTermMonths,
        purpose: validatedData.purpose,
        status: 'draft',
      })
      .returning()

    // Return full application object with snake_case field names for Flutter
    return NextResponse.json({
      id: application.id,
      application_number: application.applicationNumber,
      customer_id: customer.id,
      customer: {
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
      },
      loan_type: application.loanType,
      loan_amount: Number(application.loanAmount),
      requested_term_months: application.requestedTermMonths,
      purpose: application.purpose,
      status: application.status,
      priority: application.priority,
      notes: application.notes,
      submitted_at: application.submittedAt ? new Date(application.submittedAt).toISOString() : null,
      created_at: application.createdAt ? new Date(application.createdAt).toISOString() : new Date().toISOString(),
      updated_at: application.updatedAt ? new Date(application.updatedAt).toISOString() : new Date().toISOString(),
    }, { status: 201 })
  } catch (error) {
    const { error: errorResponse, statusCode } = handleError(error)
    return NextResponse.json(errorResponse, { status: statusCode })
  }
}

// GET /api/applications - List loan applications
async function GETHandler(req: AuthenticatedRequest) {
  try {
    if (!req.user) {
      return NextResponse.json(
        { error: { code: 'UNAUTHORIZED', message: 'User not authenticated' } },
        { status: 401 }
      )
    }

    const { searchParams } = new URL(req.url)
    const status = searchParams.get('status')
    const loanOfficerId = searchParams.get('loan_officer_id')
    const archived = searchParams.get('archived') // 'true' or 'false' or null
    const search = searchParams.get('search') // search query
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '20')
    const sort = searchParams.get('sort') || 'created_at'
    const order = searchParams.get('order') || 'desc'

    const offset = (page - 1) * limit

    // Build where conditions
    const conditions = []
    
    // Filter by archived status (default to false if not specified)
    if (archived === 'true') {
      conditions.push(eq(loanApplications.isArchived, true))
    } else if (archived === 'false' || !archived) {
      // By default, only show non-archived applications
      conditions.push(eq(loanApplications.isArchived, false))
    }
    
    // Search filter (searches application number, customer name, phone)
    // Using SQL for better compatibility
    if (search && search.trim()) {
      const searchPattern = `%${search.trim().toLowerCase()}%`
      conditions.push(
        sql`(
          LOWER(${loanApplications.applicationNumber}) LIKE ${searchPattern} OR
          LOWER(${customers.firstName}) LIKE ${searchPattern} OR
          LOWER(${customers.lastName}) LIKE ${searchPattern} OR
          ${customers.phone} LIKE ${searchPattern}
        )`
      )
    }
    
    // Filter by status
    if (status) {
      conditions.push(eq(loanApplications.status, status as any))
    }

    // Filter by loan officer (if not admin/manager)
    if (req.user.role === 'loan_officer') {
      conditions.push(eq(loanApplications.loanOfficerId, req.user.userId))
    } else if (loanOfficerId) {
      conditions.push(eq(loanApplications.loanOfficerId, loanOfficerId))
    }

    const whereClause = conditions.length > 0 ? and(...conditions) : undefined

    // Get applications with customer info
    const applications = await db
      .select({
        id: loanApplications.id,
        applicationNumber: loanApplications.applicationNumber,
        customer: {
          id: customers.id,
          firstName: customers.firstName,
          lastName: customers.lastName,
          email: customers.email,
          phone: customers.phone,
        },
        loanType: loanApplications.loanType,
        loanAmount: loanApplications.loanAmount,
        requestedTermMonths: loanApplications.requestedTermMonths,
        purpose: loanApplications.purpose,
        status: loanApplications.status,
        priority: loanApplications.priority,
        notes: loanApplications.notes,
        createdAt: loanApplications.createdAt,
        updatedAt: loanApplications.updatedAt,
        submittedAt: loanApplications.submittedAt,
      })
      .from(loanApplications)
      .innerJoin(customers, eq(loanApplications.customerId, customers.id))
      .where(whereClause)
      .orderBy(order === 'asc' ? loanApplications.createdAt : desc(loanApplications.createdAt))
      .limit(limit)
      .offset(offset)

    // Get total count (need to join customers for search filter)
    const [countResult] = await db
      .select({ count: sql<number>`count(*)` })
      .from(loanApplications)
      .innerJoin(customers, eq(loanApplications.customerId, customers.id))
      .where(whereClause)

    const total = Number(countResult?.count || 0)
    const totalPages = Math.ceil(total / limit)

    // Transform to snake_case for Flutter
    const transformedApplications = applications.map((app) => ({
      id: app.id,
      application_number: app.applicationNumber,
      customer_id: app.customer.id,
      customer: {
        id: app.customer.id,
        first_name: app.customer.firstName,
        last_name: app.customer.lastName,
        email: app.customer.email,
        phone: app.customer.phone,
      },
      loan_type: app.loanType,
      loan_amount: Number(app.loanAmount),
      requested_term_months: app.requestedTermMonths,
      purpose: app.purpose,
      status: app.status,
      priority: app.priority,
      notes: app.notes,
      created_at: app.createdAt ? new Date(app.createdAt).toISOString() : new Date().toISOString(),
      updated_at: app.updatedAt ? new Date(app.updatedAt).toISOString() : null,
      submitted_at: app.submittedAt ? new Date(app.submittedAt).toISOString() : null,
    }))

    return NextResponse.json({
      data: transformedApplications,
      pagination: {
        page,
        limit,
        total,
        total_pages: totalPages,
      },
    })
  } catch (error) {
    console.error('GET /api/applications error:', error)
    console.error('Error details:', error instanceof Error ? error.message : 'Unknown error')
    const { error: errorResponse, statusCode } = handleError(error)
    return NextResponse.json(errorResponse, { status: statusCode })
  }
}

export const POST = withAuth(POSTHandler)
export const GET = withAuth(GETHandler)

