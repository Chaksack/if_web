import { ref } from 'vue'

interface AuthState {
  token: string | null
  rememberMe: boolean
}

const authState = ref<AuthState>({
  token: null,
  rememberMe: false
})

export function useAuth() {
  const setToken = (token: string, remember: boolean = false) => {
    authState.value.token = token
    authState.value.rememberMe = remember
    
    if (remember) {
      localStorage.setItem('token', token)
      localStorage.setItem('rememberMe', 'true')
    } else {
      sessionStorage.setItem('token', token)
    }
  }

  const clearToken = () => {
    authState.value.token = null
    authState.value.rememberMe = false
    localStorage.removeItem('token')
    localStorage.removeItem('rememberMe')
    sessionStorage.removeItem('token')
  }

  const getToken = (): string | null => {
    if (!authState.value.token) {
      // Check localStorage first (for remembered sessions)
      const rememberedToken = localStorage.getItem('token')
      const isRemembered = localStorage.getItem('rememberMe') === 'true'
      
      if (rememberedToken && isRemembered) {
        authState.value.token = rememberedToken
        authState.value.rememberMe = true
      } else {
        // Check sessionStorage (for current session)
        const sessionToken = sessionStorage.getItem('token')
        if (sessionToken) {
          authState.value.token = sessionToken
          authState.value.rememberMe = false
        }
      }
    }
    return authState.value.token
  }

  return {
    setToken,
    getToken,
    clearToken
  }
}