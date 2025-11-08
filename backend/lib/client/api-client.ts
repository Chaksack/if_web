// Client-side API client for web dashboard
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '/api'

export class ApiClient {
  private baseUrl: string

  constructor(baseUrl: string = API_BASE_URL) {
    this.baseUrl = baseUrl
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const token = this.getToken()
    
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...(options.headers as Record<string, string>),
    }

    if (token) {
      headers['Authorization'] = `Bearer ${token}`
    }

    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      ...options,
      headers: headers as HeadersInit,
    })

    if (!response.ok) {
      const error = await response.json().catch(() => ({
        error: { message: 'An error occurred' },
      }))
      throw new Error(error.error?.message || 'Request failed')
    }

    return response.json()
  }

  private getToken(): string | null {
    if (typeof window === 'undefined') return null
    return localStorage.getItem('auth_token')
  }

  // Auth
  async login(email: string, password: string) {
    return this.request<{
      token: string
      refresh_token: string
      user: {
        id: string
        email: string
        first_name: string
        last_name: string
        role: string
        employee_id?: string
      }
      expires_at: string
    }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    })
  }

  async getCurrentUser() {
    return this.request<{
      id: string
      email: string
      first_name: string
      last_name: string
      role: string
      phone?: string
      employee_id?: string
      is_active: boolean
      created_at: string
    }>('/users/me')
  }

  // Applications
  async getApplications(params?: {
    page?: number
    limit?: number
    status?: string
    archived?: boolean
    search?: string
  }) {
    const queryParams = new URLSearchParams()
    if (params?.page) queryParams.append('page', params.page.toString())
    if (params?.limit) queryParams.append('limit', params.limit.toString())
    if (params?.status) queryParams.append('status', params.status)
    if (params?.archived !== undefined) queryParams.append('archived', params.archived.toString())
    if (params?.search) queryParams.append('search', params.search)

    const query = queryParams.toString()
    return this.request<{
      data: any[]
      pagination: {
        page: number
        limit: number
        total: number
        total_pages: number
      }
    }>(`/applications${query ? `?${query}` : ''}`)
  }

  async getApplication(id: string) {
    return this.request<any>(`/applications/${id}`)
  }

  async reviewApplication(id: string, data: {
    status: 'under_review' | 'approved' | 'rejected' | 'withdrawn'
    decisionNotes?: string
  }) {
    return this.request(`/applications/${id}/review`, {
      method: 'POST',
      body: JSON.stringify({
        status: data.status,
        decisionNotes: data.decisionNotes,
      }),
    })
  }

  async bulkArchiveApplications(applicationIds: string[], archive: boolean) {
    return this.request<{
      success: boolean
      message: string
      count: number
    }>('/applications/archive', {
      method: 'POST',
      body: JSON.stringify({
        applicationIds,
        archive,
      }),
    })
  }

  // Dashboard
  async getDashboardStats() {
    return this.request<{
      totalApplications: number
      applicationsByStatus: Record<string, number>
      applicationsToday: number
      pendingReview: number
      totalLoanAmount: number
      averageProcessingTimeHours: number
    }>('/dashboard/stats')
  }

  // Documents
  async getDocuments(applicationId: string) {
    return this.request<{ data: any[] }>(`/applications/${applicationId}/documents`)
  }

  async getDocumentUrl(documentId: string) {
    return this.request<{ url: string; fileName: string; mimeType?: string }>(
      `/documents/${documentId}/url`
    )
  }
}

export const apiClient = new ApiClient()

