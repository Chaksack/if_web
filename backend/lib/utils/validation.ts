import { z } from 'zod'

// User schemas
export const loginSchema = z.object({
  email: z.string().email('Invalid email format'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
})

export const createCustomerSchema = z.object({
  firstName: z.string().min(1, 'First name is required').optional(),
  first_name: z.string().min(1, 'First name is required').optional(),
  lastName: z.string().min(1, 'Last name is required').optional(),
  last_name: z.string().min(1, 'Last name is required').optional(),
  email: z.string().email('Invalid email format').optional().nullable(),
  phone: z.string().min(1, 'Phone is required'),
  dateOfBirth: z.string().optional().nullable(),
  date_of_birth: z.string().optional().nullable(),
  ssn: z.string().optional().nullable(),
  addressLine1: z.string().optional().nullable(),
  address_line1: z.string().optional().nullable(),
  addressLine2: z.string().optional().nullable(),
  address_line2: z.string().optional().nullable(),
  city: z.string().optional().nullable(),
  state: z.string().optional().nullable(), // Used for Region
  zipCode: z.string().optional().nullable(),
  zip_code: z.string().optional().nullable(),
  country: z.string().default('Ghana').optional(),
  // New fields
  idNumber: z.string().optional().nullable(),
  id_number: z.string().optional().nullable(),
  industry: z.string().optional().nullable(),
  placeOfEmployment: z.string().optional().nullable(),
  place_of_employment: z.string().optional().nullable(),
  loanHistory: z.string().optional().nullable(),
  loan_history: z.string().optional().nullable(),
  placeOfWorship: z.string().optional().nullable(),
  place_of_worship: z.string().optional().nullable(),
  incomeSources: z.string().optional().nullable(),
  income_sources: z.string().optional().nullable(),
  nextOfKin: z.string().optional().nullable(),
  next_of_kin: z.string().optional().nullable(),
  numberOfDependents: z.number().int().nonnegative().optional().nullable(),
  number_of_dependents: z.number().int().nonnegative().optional().nullable(),
  yearsInBusiness: z.number().int().nonnegative().optional().nullable(),
  years_in_business: z.number().int().nonnegative().optional().nullable(),
}).refine(
  (data) => data.firstName || data.first_name,
  { message: 'First name is required', path: ['firstName'] }
).refine(
  (data) => data.lastName || data.last_name,
  { message: 'Last name is required', path: ['lastName'] }
).transform((data) => ({
  firstName: data.firstName || data.first_name || '',
  lastName: data.lastName || data.last_name || '',
  email: data.email || undefined,
  phone: data.phone,
  dateOfBirth: data.dateOfBirth || data.date_of_birth || undefined,
  ssn: data.ssn || undefined,
  addressLine1: data.addressLine1 || data.address_line1 || undefined,
  addressLine2: data.addressLine2 || data.address_line2 || undefined,
  city: data.city || undefined,
  state: data.state || undefined,
  zipCode: data.zipCode || data.zip_code || undefined,
  country: data.country || 'Ghana',
  idNumber: data.idNumber || data.id_number || undefined,
  industry: data.industry || undefined,
  placeOfEmployment: data.placeOfEmployment || data.place_of_employment || undefined,
  loanHistory: data.loanHistory || data.loan_history || undefined,
  placeOfWorship: data.placeOfWorship || data.place_of_worship || undefined,
  incomeSources: data.incomeSources || data.income_sources || undefined,
  nextOfKin: data.nextOfKin || data.next_of_kin || undefined,
  numberOfDependents: data.numberOfDependents ?? data.number_of_dependents ?? undefined,
  yearsInBusiness: data.yearsInBusiness ?? data.years_in_business ?? undefined,
}))

export const createLoanApplicationSchema = z.object({
  customer: createCustomerSchema,
  loanType: z.enum(['salary_loan', 'group_loan', 'tuition_loan', 'rideshare_loan', 'personal_loan']).optional(),
  loan_type: z.enum(['salary_loan', 'group_loan', 'tuition_loan', 'rideshare_loan', 'personal_loan']).optional(),
  loanAmount: z.number().positive('Loan amount must be positive').optional(),
  loan_amount: z.number().positive('Loan amount must be positive').optional(),
  requestedTermMonths: z.number().int().positive().optional().nullable(),
  requested_term_months: z.number().int().positive().optional().nullable(),
  purpose: z.string().optional().nullable(),
}).refine(
  (data) => data.loanType || data.loan_type,
  { message: 'Loan type is required', path: ['loanType'] }
).refine(
  (data) => data.loanAmount || data.loan_amount,
  { message: 'Loan amount is required', path: ['loanAmount'] }
).transform((data) => ({
  customer: data.customer,
  loanType: (data.loanType || data.loan_type) as 'salary_loan' | 'group_loan' | 'tuition_loan' | 'rideshare_loan' | 'personal_loan',
  loanAmount: data.loanAmount || data.loan_amount || 0,
  requestedTermMonths: data.requestedTermMonths || data.requested_term_months || undefined,
  purpose: data.purpose || undefined,
}))

export const updateLoanApplicationSchema = z.object({
  loanAmount: z.number().positive().optional(),
  requestedTermMonths: z.number().int().positive().optional(),
  purpose: z.string().optional(),
  priority: z.enum(['low', 'normal', 'high', 'urgent']).optional(),
  notes: z.string().optional(),
})

export const submitApplicationSchema = z.object({
  notes: z.string().optional().nullable(),
})

export const reviewApplicationSchema = z.object({
  status: z.enum(['under_review', 'approved', 'rejected', 'withdrawn']),
  decisionNotes: z.string().optional(),
})

export const employmentInfoSchema = z.object({
  employerName: z.string().min(1, 'Employer name is required'),
  jobTitle: z.string().optional(),
  employmentType: z.enum(['full_time', 'part_time', 'contract', 'self_employed', 'unemployed', 'retired']).optional(),
  monthlyIncome: z.number().nonnegative().optional(),
  employmentStartDate: z.string().optional(),
  employmentEndDate: z.string().optional(),
  addressLine1: z.string().optional(),
  addressLine2: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  zipCode: z.string().optional(),
  phone: z.string().optional(),
  supervisorName: z.string().optional(),
})

export const financialInfoSchema = z.object({
  bankAccounts: z.array(z.any()).optional(),
  totalSavings: z.number().nonnegative().optional(),
  totalChecking: z.number().nonnegative().optional(),
  monthlyExpenses: z.number().nonnegative().optional(),
  otherIncome: z.number().nonnegative().optional(),
  debts: z.array(z.any()).optional(),
  totalDebt: z.number().nonnegative().optional(),
  creditScore: z.number().int().min(300).max(850).optional(),
  assets: z.array(z.any()).optional(),
})

export const commentSchema = z.object({
  comment: z.string().min(1, 'Comment is required'),
  isInternal: z.boolean().default(true),
})

export const signatureSchema = z.object({
  signerType: z.enum(['applicant', 'co_applicant', 'witness']),
  signerName: z.string().min(1, 'Signer name is required'),
  signatureData: z.string().min(1, 'Signature data is required'),
})

