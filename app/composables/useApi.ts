import type { UseFetchOptions } from 'nuxt/app'

export const useApi = () => {
  const config = useRuntimeConfig()
  const apiBase = config.public.apiBase as string || 'http://localhost:8080/api/v1'

  const apiFetch = async <T>(
    url: string,
    options: UseFetchOptions<T> = {}
  ) => {
    const token = useCookie('auth_token')

    const defaults: UseFetchOptions<T> = {
      baseURL: apiBase,
      headers: {
        'Content-Type': 'application/json',
        ...(token.value ? { Authorization: `Bearer ${token.value}` } : {}),
      },
      onResponseError({ response }) {
        if (response.status === 401) {
          // Token expired or invalid
          token.value = null
          navigateTo('/admin/login')
        }
      },
    }

    return useFetch(url, { ...defaults, ...options })
  }

  return {
    get: <T>(url: string, options?: UseFetchOptions<T>) =>
      apiFetch<T>(url, { ...options, method: 'GET' }),
    
    post: <T>(url: string, body?: any, options?: UseFetchOptions<T>) =>
      apiFetch<T>(url, { ...options, method: 'POST', body }),
    
    put: <T>(url: string, body?: any, options?: UseFetchOptions<T>) =>
      apiFetch<T>(url, { ...options, method: 'PUT', body }),
    
    delete: <T>(url: string, options?: UseFetchOptions<T>) =>
      apiFetch<T>(url, { ...options, method: 'DELETE' }),
    
    patch: <T>(url: string, body?: any, options?: UseFetchOptions<T>) =>
      apiFetch<T>(url, { ...options, method: 'PATCH', body }),
  }
}
