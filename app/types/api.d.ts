export interface Agent {
  id: string
  name: string
  email: string
  created_at: string
  updated_at: string
  onboardings?: Onboarding[]
}

export interface Onboarding {
  id: string
  agent_id: string
  first_name: string
  last_name: string
  national_id: string
  national_id_file_path: string
  utility_bill_file_path: string
  bank_statement_file_path: string
  mobile_money_file_path: string
  location: string
  status: 'pending' | 'incomplete' | 'completed' | 'rejected'
  admin_remarks: string
  created_at: string
  updated_at: string
}

export interface Customer {
  id: string
  type: 'individual' | 'business'
  // Individual fields
  first_name?: string
  last_name?: string
  national_id?: string
  // Business fields
  business_name?: string
  registration_number?: string
  tax_id?: string
  email: string
  phone: string
  address: string
  account_number: string
  account_balance: number
  created_at: string
  updated_at: string
}

export interface Transaction {
  id: string
  customer_id: string
  type: 'deposit' | 'withdrawal' | 'loan_repayment' | 'loan_disbursement'
  amount: number
  channel: 'mobile_money' | 'bank' | 'cash' | 'ussd'
  status: 'pending' | 'completed' | 'failed' | 'cancelled'
  reference: string
  is_flagged?: boolean
  notes?: string
  created_at: string
  updated_at: string
}

export interface LoanApplication {
  id: string
  customer_id: string
  requested_amount: number
  purpose: string
  status: 'pending' | 'approved' | 'rejected' | 'disbursed'
  approved_amount?: number
  interest_rate?: number
  tenure_months?: number
  rejection_reason?: string
  created_at: string
  updated_at: string
}

export interface Loan {
  id: string
  customer_id: string
  principal_amount: number
  interest_rate: number
  tenure_months: number
  outstanding_balance: number
  monthly_payment: number
  next_payment_date: string
  status: 'active' | 'overdue' | 'paid' | 'defaulted'
  disbursement_date: string
  created_at: string
  updated_at: string
}

export interface User {
  id: string
  first_name: string
  last_name: string
  email: string
  role: 'admin' | 'cro' | 'loan_officer'
  is_active: boolean
  is_staff?: boolean
  last_login: string
  created_at: string
  updated_at: string
}

export interface AuditLog {
  id: string
  user_id: string
  user_name: string
  action: string
  resource_type: string
  resource_id: string
  changes: Record<string, any>
  ip_address: string
  timestamp: string
}

export interface DashboardStats {
  pending_onboardings: number
  pending_loans: number
  total_agents: number
  total_customers: number
  total_transactions_today: number
  total_loan_disbursed: number
  outstanding_loans: number
  overdue_loans: number
}
