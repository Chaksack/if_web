import { pgTable, uuid, varchar, text, timestamp, boolean, decimal, integer, jsonb, date, check, index } from 'drizzle-orm/pg-core'
import { relations } from 'drizzle-orm'

// Users table
export const users = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  passwordHash: varchar('password_hash', { length: 255 }).notNull(),
  firstName: varchar('first_name', { length: 100 }).notNull(),
  lastName: varchar('last_name', { length: 100 }).notNull(),
  role: varchar('role', { length: 50 }).notNull().$type<'loan_officer' | 'office_staff' | 'admin' | 'manager'>(),
  phone: varchar('phone', { length: 20 }),
  employeeId: varchar('employee_id', { length: 50 }).unique(),
  profilePhoto: varchar('profile_photo', { length: 500 }), // S3 URL for profile photo
  isActive: boolean('is_active').default(true),
  lastLoginAt: timestamp('last_login_at'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
}, (table) => ({
  emailIdx: index('idx_users_email').on(table.email),
  roleIdx: index('idx_users_role').on(table.role),
  employeeIdIdx: index('idx_users_employee_id').on(table.employeeId),
}))

// Customers table
export const customers = pgTable('customers', {
  id: uuid('id').primaryKey().defaultRandom(),
  firstName: varchar('first_name', { length: 100 }).notNull(),
  lastName: varchar('last_name', { length: 100 }).notNull(),
  email: varchar('email', { length: 255 }),
  phone: varchar('phone', { length: 20 }).notNull(),
  dateOfBirth: date('date_of_birth'),
  ssn: varchar('ssn', { length: 11 }), // Encrypted in production - used for ID
  addressLine1: varchar('address_line1', { length: 255 }),
  addressLine2: varchar('address_line2', { length: 255 }),
  city: varchar('city', { length: 100 }),
  state: varchar('state', { length: 50 }), // Used for Region
  zipCode: varchar('zip_code', { length: 10 }),
  country: varchar('country', { length: 100 }).default('Ghana'),
  // New fields
  idNumber: varchar('id_number', { length: 50 }), // Ghana Card or ID number
  industry: varchar('industry', { length: 100 }),
  placeOfEmployment: varchar('place_of_employment', { length: 255 }),
  loanHistory: text('loan_history'), // JSON or text field for loan history
  placeOfWorship: varchar('place_of_worship', { length: 255 }),
  incomeSources: text('income_sources'), // JSON or text field for multiple income sources
  nextOfKin: text('next_of_kin'), // JSON field: {name, relationship, phone, address}
  numberOfDependents: integer('number_of_dependents'),
  yearsInBusiness: integer('years_in_business'),
  createdBy: uuid('created_by').references(() => users.id),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
}, (table) => ({
  emailIdx: index('idx_customers_email').on(table.email),
  phoneIdx: index('idx_customers_phone').on(table.phone),
  createdByIdx: index('idx_customers_created_by').on(table.createdBy),
}))

// Loan Applications table
export const loanApplications = pgTable('loan_applications', {
  id: uuid('id').primaryKey().defaultRandom(),
  customerId: uuid('customer_id').notNull().references(() => customers.id, { onDelete: 'cascade' }),
  loanOfficerId: uuid('loan_officer_id').notNull().references(() => users.id),
  applicationNumber: varchar('application_number', { length: 50 }).notNull().unique(),
  loanType: varchar('loan_type', { length: 50 }).notNull().$type<'salary_loan' | 'group_loan' | 'tuition_loan' | 'rideshare_loan' | 'personal_loan'>(),
  loanAmount: decimal('loan_amount', { precision: 15, scale: 2 }).notNull(),
  requestedTermMonths: integer('requested_term_months'),
  purpose: text('purpose'),
  status: varchar('status', { length: 50 }).notNull().default('draft').$type<'draft' | 'submitted' | 'under_review' | 'approved' | 'rejected' | 'withdrawn'>(),
  priority: varchar('priority', { length: 20 }).default('normal').$type<'low' | 'normal' | 'high' | 'urgent'>(),
  notes: text('notes'),
  submittedAt: timestamp('submitted_at'),
  reviewedBy: uuid('reviewed_by').references(() => users.id),
  reviewedAt: timestamp('reviewed_at'),
  decisionNotes: text('decision_notes'),
  isArchived: boolean('is_archived').default(false).notNull(),
  archivedAt: timestamp('archived_at'),
  archivedBy: uuid('archived_by').references(() => users.id),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
}, (table) => ({
  customerIdIdx: index('idx_loan_applications_customer_id').on(table.customerId),
  loanOfficerIdIdx: index('idx_loan_applications_loan_officer_id').on(table.loanOfficerId),
  statusIdx: index('idx_loan_applications_status').on(table.status),
  applicationNumberIdx: index('idx_loan_applications_application_number').on(table.applicationNumber),
  submittedAtIdx: index('idx_loan_applications_submitted_at').on(table.submittedAt),
  isArchivedIdx: index('idx_loan_applications_is_archived').on(table.isArchived),
}))

// Employment Information table
export const employmentInfo = pgTable('employment_info', {
  id: uuid('id').primaryKey().defaultRandom(),
  loanApplicationId: uuid('loan_application_id').notNull().references(() => loanApplications.id, { onDelete: 'cascade' }),
  employerName: varchar('employer_name', { length: 255 }).notNull(),
  jobTitle: varchar('job_title', { length: 100 }),
  employmentType: varchar('employment_type', { length: 50 }).$type<'full_time' | 'part_time' | 'contract' | 'self_employed' | 'unemployed' | 'retired'>(),
  monthlyIncome: decimal('monthly_income', { precision: 12, scale: 2 }),
  employmentStartDate: date('employment_start_date'),
  employmentEndDate: date('employment_end_date'),
  addressLine1: varchar('address_line1', { length: 255 }),
  addressLine2: varchar('address_line2', { length: 255 }),
  city: varchar('city', { length: 100 }),
  state: varchar('state', { length: 50 }),
  zipCode: varchar('zip_code', { length: 10 }),
  phone: varchar('phone', { length: 20 }),
  supervisorName: varchar('supervisor_name', { length: 100 }),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
}, (table) => ({
  loanApplicationIdIdx: index('idx_employment_info_loan_application_id').on(table.loanApplicationId),
}))

// Financial Information table
export const financialInfo = pgTable('financial_info', {
  id: uuid('id').primaryKey().defaultRandom(),
  loanApplicationId: uuid('loan_application_id').notNull().references(() => loanApplications.id, { onDelete: 'cascade' }),
  bankAccounts: jsonb('bank_accounts'),
  totalSavings: decimal('total_savings', { precision: 12, scale: 2 }),
  totalChecking: decimal('total_checking', { precision: 12, scale: 2 }),
  monthlyExpenses: decimal('monthly_expenses', { precision: 12, scale: 2 }),
  otherIncome: decimal('other_income', { precision: 12, scale: 2 }),
  debts: jsonb('debts'),
  totalDebt: decimal('total_debt', { precision: 12, scale: 2 }),
  creditScore: integer('credit_score'),
  assets: jsonb('assets'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
}, (table) => ({
  loanApplicationIdIdx: index('idx_financial_info_loan_application_id').on(table.loanApplicationId),
}))

// Documents table
export const documents = pgTable('documents', {
  id: uuid('id').primaryKey().defaultRandom(),
  loanApplicationId: uuid('loan_application_id').notNull().references(() => loanApplications.id, { onDelete: 'cascade' }),
  documentType: varchar('document_type', { length: 50 }).notNull().$type<'id_driver_license' | 'id_passport' | 'id_state_id' | 'pay_stub' | 'bank_statement' | 'tax_return' | 'employment_verification' | 'proof_of_address' | 'other'>(),
  fileName: varchar('file_name', { length: 255 }).notNull(),
  filePath: varchar('file_path', { length: 500 }).notNull(),
  fileSize: integer('file_size'),
  mimeType: varchar('mime_type', { length: 100 }),
  uploadedBy: uuid('uploaded_by').references(() => users.id),
  uploadedAt: timestamp('uploaded_at').defaultNow().notNull(),
  isVerified: boolean('is_verified').default(false),
  verifiedBy: uuid('verified_by').references(() => users.id),
  verifiedAt: timestamp('verified_at'),
  notes: text('notes'),
}, (table) => ({
  loanApplicationIdIdx: index('idx_documents_loan_application_id').on(table.loanApplicationId),
  documentTypeIdx: index('idx_documents_document_type').on(table.documentType),
  uploadedByIdx: index('idx_documents_uploaded_by').on(table.uploadedBy),
}))

// Field Sessions table
export const fieldSessions = pgTable('field_sessions', {
  id: uuid('id').primaryKey().defaultRandom(),
  loanApplicationId: uuid('loan_application_id').notNull().references(() => loanApplications.id, { onDelete: 'cascade' }),
  loanOfficerId: uuid('loan_officer_id').notNull().references(() => users.id),
  sessionStartedAt: timestamp('session_started_at').notNull(),
  sessionEndedAt: timestamp('session_ended_at'),
  locationLatitude: decimal('location_latitude', { precision: 10, scale: 8 }),
  locationLongitude: decimal('location_longitude', { precision: 11, scale: 8 }),
  locationAddress: text('location_address'),
  deviceInfo: jsonb('device_info'),
  networkType: varchar('network_type', { length: 20 }),
  isOfflineMode: boolean('is_offline_mode').default(false),
  syncedAt: timestamp('synced_at'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
}, (table) => ({
  loanApplicationIdIdx: index('idx_field_sessions_loan_application_id').on(table.loanApplicationId),
  loanOfficerIdIdx: index('idx_field_sessions_loan_officer_id').on(table.loanOfficerId),
  syncedAtIdx: index('idx_field_sessions_synced_at').on(table.syncedAt),
}))

// Application Status History table
export const applicationStatusHistory = pgTable('application_status_history', {
  id: uuid('id').primaryKey().defaultRandom(),
  loanApplicationId: uuid('loan_application_id').notNull().references(() => loanApplications.id, { onDelete: 'cascade' }),
  previousStatus: varchar('previous_status', { length: 50 }),
  newStatus: varchar('new_status', { length: 50 }).notNull(),
  changedBy: uuid('changed_by').references(() => users.id),
  notes: text('notes'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
}, (table) => ({
  loanApplicationIdIdx: index('idx_status_history_loan_application_id').on(table.loanApplicationId),
  createdAtIdx: index('idx_status_history_created_at').on(table.createdAt),
}))

// Application Comments table
export const applicationComments = pgTable('application_comments', {
  id: uuid('id').primaryKey().defaultRandom(),
  loanApplicationId: uuid('loan_application_id').notNull().references(() => loanApplications.id, { onDelete: 'cascade' }),
  userId: uuid('user_id').notNull().references(() => users.id),
  comment: text('comment').notNull(),
  isInternal: boolean('is_internal').default(true),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
}, (table) => ({
  loanApplicationIdIdx: index('idx_comments_loan_application_id').on(table.loanApplicationId),
  userIdIdx: index('idx_comments_user_id').on(table.userId),
  createdAtIdx: index('idx_comments_created_at').on(table.createdAt),
}))

// Signatures table
export const signatures = pgTable('signatures', {
  id: uuid('id').primaryKey().defaultRandom(),
  loanApplicationId: uuid('loan_application_id').notNull().references(() => loanApplications.id, { onDelete: 'cascade' }),
  signerType: varchar('signer_type', { length: 50 }).notNull().$type<'applicant' | 'co_applicant' | 'witness'>(),
  signerName: varchar('signer_name', { length: 200 }).notNull(),
  signatureData: text('signature_data').notNull(),
  ipAddress: varchar('ip_address', { length: 45 }),
  userAgent: text('user_agent'),
  signedAt: timestamp('signed_at').defaultNow().notNull(),
  isVerified: boolean('is_verified').default(false),
}, (table) => ({
  loanApplicationIdIdx: index('idx_signatures_loan_application_id').on(table.loanApplicationId),
}))

// Audit Logs table
export const auditLogs = pgTable('audit_logs', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').references(() => users.id),
  action: varchar('action', { length: 100 }).notNull(),
  entityType: varchar('entity_type', { length: 50 }).notNull(),
  entityId: uuid('entity_id'),
  oldValues: jsonb('old_values'),
  newValues: jsonb('new_values'),
  ipAddress: varchar('ip_address', { length: 45 }),
  userAgent: text('user_agent'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
}, (table) => ({
  userIdIdx: index('idx_audit_logs_user_id').on(table.userId),
  entityTypeIdx: index('idx_audit_logs_entity_type').on(table.entityType),
  entityIdIdx: index('idx_audit_logs_entity_id').on(table.entityId),
  createdAtIdx: index('idx_audit_logs_created_at').on(table.createdAt),
}))

// Relations
export const usersRelations = relations(users, ({ many }) => ({
  loanApplications: many(loanApplications),
  createdCustomers: many(customers),
  uploadedDocuments: many(documents),
  fieldSessions: many(fieldSessions),
  comments: many(applicationComments),
}))

export const customersRelations = relations(customers, ({ one, many }) => ({
  createdBy: one(users, {
    fields: [customers.createdBy],
    references: [users.id],
  }),
  loanApplications: many(loanApplications),
}))

export const loanApplicationsRelations = relations(loanApplications, ({ one, many }) => ({
  customer: one(customers, {
    fields: [loanApplications.customerId],
    references: [customers.id],
  }),
  loanOfficer: one(users, {
    fields: [loanApplications.loanOfficerId],
    references: [users.id],
  }),
  reviewer: one(users, {
    fields: [loanApplications.reviewedBy],
    references: [users.id],
  }),
  employmentInfo: one(employmentInfo),
  financialInfo: one(financialInfo),
  documents: many(documents),
  fieldSessions: many(fieldSessions),
  statusHistory: many(applicationStatusHistory),
  comments: many(applicationComments),
  signatures: many(signatures),
}))

export const employmentInfoRelations = relations(employmentInfo, ({ one }) => ({
  loanApplication: one(loanApplications, {
    fields: [employmentInfo.loanApplicationId],
    references: [loanApplications.id],
  }),
}))

export const financialInfoRelations = relations(financialInfo, ({ one }) => ({
  loanApplication: one(loanApplications, {
    fields: [financialInfo.loanApplicationId],
    references: [loanApplications.id],
  }),
}))

export const documentsRelations = relations(documents, ({ one }) => ({
  loanApplication: one(loanApplications, {
    fields: [documents.loanApplicationId],
    references: [loanApplications.id],
  }),
  uploadedByUser: one(users, {
    fields: [documents.uploadedBy],
    references: [users.id],
  }),
}))

export const fieldSessionsRelations = relations(fieldSessions, ({ one }) => ({
  loanApplication: one(loanApplications, {
    fields: [fieldSessions.loanApplicationId],
    references: [loanApplications.id],
  }),
  loanOfficer: one(users, {
    fields: [fieldSessions.loanOfficerId],
    references: [users.id],
  }),
}))

export const applicationStatusHistoryRelations = relations(applicationStatusHistory, ({ one }) => ({
  loanApplication: one(loanApplications, {
    fields: [applicationStatusHistory.loanApplicationId],
    references: [loanApplications.id],
  }),
  changedByUser: one(users, {
    fields: [applicationStatusHistory.changedBy],
    references: [users.id],
  }),
}))

export const applicationCommentsRelations = relations(applicationComments, ({ one }) => ({
  loanApplication: one(loanApplications, {
    fields: [applicationComments.loanApplicationId],
    references: [loanApplications.id],
  }),
  user: one(users, {
    fields: [applicationComments.userId],
    references: [users.id],
  }),
}))

export const signaturesRelations = relations(signatures, ({ one }) => ({
  loanApplication: one(loanApplications, {
    fields: [signatures.loanApplicationId],
    references: [loanApplications.id],
  }),
}))

