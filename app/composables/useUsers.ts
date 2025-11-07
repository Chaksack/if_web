import type { User } from '~/types/api'

export const useUsers = () => {
  const api = useApi()

  const getUsers = (params?: { role?: string; is_active?: boolean; search?: string }) => {
    return api.get<User[]>('/admin/users', { params })
  }

  const getUser = (id: string) => {
    return api.get<User>(`/admin/users/${id}`)
  }

  const createUser = (data: Partial<User> & { password: string }) => {
    return api.post<User>('/admin/users', data)
  }

  const updateUser = (id: string, data: Partial<User>) => {
    return api.put<User>(`/admin/users/${id}`, data)
  }

  const deleteUser = (id: string) => {
    return api.delete(`/admin/users/${id}`)
  }

  const updateUserRole = (id: string, role: string) => {
    return api.put<User>(`/admin/users/${id}/role`, { role })
  }

  const toggleUserStatus = (id: string, is_active: boolean) => {
    return api.put<User>(`/admin/users/${id}/status`, { is_active })
  }

  const resetUserPassword = (id: string, new_password: string) => {
    return api.post(`/admin/users/${id}/reset-password`, { new_password })
  }

  return {
    getUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser,
    updateUserRole,
    toggleUserStatus,
    resetUserPassword,
  }
}
