import type { AuditLog } from '~/types/api'

export const useAudit = () => {
  const api = useApi()

  const getAuditLogs = (params?: {
    user_id?: string
    action?: string
    resource_type?: string
    start_date?: string
    end_date?: string
    page?: number
    limit?: number
  }) => {
    return api.get<{ logs: AuditLog[]; total: number; page: number; limit: number }>('/admin/audit/logs', { params })
  }

  const exportAuditLogs = (params?: {
    user_id?: string
    action?: string
    resource_type?: string
    start_date?: string
    end_date?: string
    format?: 'csv' | 'json'
  }) => {
    return api.get('/admin/audit/export', { params })
  }

  return {
    getAuditLogs,
    exportAuditLogs,
  }
}
