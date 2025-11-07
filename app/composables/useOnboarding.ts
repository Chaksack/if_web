import type { Onboarding } from '~/types/api'

export const useOnboarding = () => {
  const api = useApi()

  const getOnboardings = (params?: { status?: string; source?: string; search?: string }) => {
    return api.get<Onboarding[]>('/admin/onboardings', { params })
  }

  const getOnboarding = (id: string) => {
    return api.get<Onboarding>(`/admin/onboardings/${id}`)
  }

  const updateOnboardingStatus = (id: string, status: string, remarks?: string) => {
    return api.put<Onboarding>(`/admin/onboardings/${id}/status`, { status, admin_remarks: remarks })
  }

  const addRemarks = (id: string, remarks: string) => {
    return api.post<Onboarding>(`/admin/onboardings/${id}/remarks`, { admin_remarks: remarks })
  }

  const assignToAgent = (id: string, agentId: string) => {
    return api.post<Onboarding>(`/admin/onboardings/${id}/assign`, { agent_id: agentId })
  }

  return {
    getOnboardings,
    getOnboarding,
    updateOnboardingStatus,
    addRemarks,
    assignToAgent,
  }
}
