import type { Customer } from '~/types/api'

export const useCustomers = () => {
  const api = useApi()

  const getCustomers = (params?: { search?: string; status?: string }) => {
    return api.get<Customer[]>('/admin/customers', { params })
  }

  const getCustomer = (id: string) => {
    return api.get<Customer>(`/admin/customers/${id}`)
  }

  const createCustomer = (data: Partial<Customer>) => {
    return api.post<Customer>('/admin/customers', data)
  }

  const updateCustomer = (id: string, data: Partial<Customer>) => {
    return api.put<Customer>(`/admin/customers/${id}`, data)
  }

  const deleteCustomer = (id: string) => {
    return api.delete(`/admin/customers/${id}`)
  }

  const getCustomerTransactions = (id: string) => {
    return api.get(`/admin/customers/${id}/transactions`)
  }

  const getCustomerLoans = (id: string) => {
    return api.get(`/admin/customers/${id}/loans`)
  }

  return {
    getCustomers,
    getCustomer,
    createCustomer,
    updateCustomer,
    deleteCustomer,
    getCustomerTransactions,
    getCustomerLoans,
  }
}
