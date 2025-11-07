export const useAuth = () => {
  const api = useApi()
  const token = useCookie('auth_token', {
    maxAge: 60 * 60 * 24 * 7, // 7 days
    sameSite: 'strict',
  })
  const user = useState<any>('user', () => null)

  const login = async (email: string, password: string) => {
    const { data, error } = await api.post<{ token: string; user: any }>('/auth/login', {
      email,
      password,
    })

    if (data.value && !error.value) {
      token.value = data.value.token
      user.value = data.value.user
      return { success: true }
    }

    return { success: false, error: error.value }
  }

  const logout = () => {
    token.value = null
    user.value = null
    navigateTo('/admin/login')
  }

  const getMe = async () => {
    if (!token.value) return null
    
    const { data } = await api.get<any>('/auth/me')
    if (data.value) {
      user.value = data.value
    }
    return data.value
  }

  const isAuthenticated = computed(() => !!token.value)

  return {
    login,
    logout,
    getMe,
    isAuthenticated,
    user: readonly(user),
  }
}
