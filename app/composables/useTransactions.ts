import type { Transaction } from '~/types/api'

export const useTransactions = () => {
  const api = useApi()

  const getTransactions = (params?: { 
    type?: string
    channel?: string
    status?: string
    customer_id?: string
    start_date?: string
    end_date?: string
    search?: string
  }) => {
    return api.get<Transaction[]>('/admin/transactions', { params })
  }

  const getTransaction = (id: string) => {
    return api.get<Transaction>(`/admin/transactions/${id}`)
  }

  const flagTransaction = (id: string, reason: string) => {
    return api.post<Transaction>(`/admin/transactions/${id}/flag`, { reason })
  }

  const unflagTransaction = (id: string) => {
    return api.post<Transaction>(`/admin/transactions/${id}/unflag`)
  }

  const addTransactionNote = (id: string, note: string) => {
    return api.post<Transaction>(`/admin/transactions/${id}/notes`, { note })
  }

  const resolveTransaction = (id: string, resolution: string) => {
    return api.post<Transaction>(`/admin/transactions/${id}/resolve`, { resolution })
  }

  const createTransaction = (data: Partial<Transaction>) => {
    return api.post<Transaction>('/admin/transactions', data)
  }

  return {
    getTransactions,
    getTransaction,
    flagTransaction,
    unflagTransaction,
    addTransactionNote,
    resolveTransaction,
    createTransaction,
  }
}
