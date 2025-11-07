import type { Agent } from '~/types/api'

export const useAgents = () => {
  const api = useApi()

  const getAgents = () => {
    return api.get<Agent[]>('/admin/agents')
  }

  const getAgent = (id: string) => {
    return api.get<Agent>(`/admin/agents/${id}`)
  }

  const createAgent = (data: Partial<Agent>) => {
    return api.post<Agent>('/admin/agents', data)
  }

  const updateAgent = (id: string, data: Partial<Agent>) => {
    return api.put<Agent>(`/admin/agents/${id}`, data)
  }

  const deleteAgent = (id: string) => {
    return api.delete(`/admin/agents/${id}`)
  }

  return {
    getAgents,
    getAgent,
    createAgent,
    updateAgent,
    deleteAgent,
  }
}
