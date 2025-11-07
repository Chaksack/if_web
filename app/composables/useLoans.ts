import type { LoanApplication, Loan } from '~/types/api'

export const useLoans = () => {
  const api = useApi()

  const getLoanApplications = (params?: { status?: string; search?: string }) => {
    return api.get<LoanApplication[]>('/admin/loans/applications', { params })
  }

  const getLoanApplication = (id: string) => {
    return api.get<LoanApplication>(`/admin/loans/applications/${id}`)
  }

  const approveLoan = (id: string, data: { approved_amount: number; interest_rate: number; tenure_months: number; remarks?: string }) => {
    return api.post<LoanApplication>(`/admin/loans/applications/${id}/approve`, data)
  }

  const rejectLoan = (id: string, reason: string) => {
    return api.post<LoanApplication>(`/admin/loans/applications/${id}/reject`, { rejection_reason: reason })
  }

  const getLoans = (params?: { status?: string; customer_id?: string }) => {
    return api.get<Loan[]>('/admin/loans', { params })
  }

  const getLoan = (id: string) => {
    return api.get<Loan>(`/admin/loans/${id}`)
  }

  const flagLoan = (id: string, reason: string) => {
    return api.post<Loan>(`/admin/loans/${id}/flag`, { reason })
  }

  return {
    getLoanApplications,
    getLoanApplication,
    approveLoan,
    rejectLoan,
    getLoans,
    getLoan,
    flagLoan,
  }
}
