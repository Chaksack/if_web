// Loan type utilities

export type LoanType = 'salary_loan' | 'group_loan' | 'tuition_loan' | 'rideshare_loan' | 'personal_loan'

export const LOAN_TYPES: LoanType[] = [
  'salary_loan',
  'group_loan',
  'tuition_loan',
  'rideshare_loan',
  'personal_loan',
]

export function getLoanTypeLabel(loanType: string): string {
  const labels: Record<string, string> = {
    salary_loan: 'Salary Loan',
    group_loan: 'Group Loan',
    tuition_loan: 'Tuition Loan',
    rideshare_loan: 'Rideshare Loan',
    personal_loan: 'Personal Loan',
  }
  return labels[loanType] || loanType.replace('_', ' ').replace(/\b\w/g, (l) => l.toUpperCase())
}

export function formatLoanType(loanType: string): string {
  return getLoanTypeLabel(loanType)
}

