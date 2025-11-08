'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'
import { apiClient } from './api-client'
import { useRouter } from 'next/navigation'

interface User {
  id: string
  email: string
  first_name: string
  last_name: string
  role: string
  phone?: string
  employee_id?: string
  is_active: boolean
  created_at: string
}

interface AuthContextType {
  user: User | null
  loading: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    checkAuth()
  }, [])

  async function checkAuth() {
    try {
      const token = localStorage.getItem('auth_token')
      if (!token) {
        setLoading(false)
        return
      }

      const userData = await apiClient.getCurrentUser()
      setUser(userData)
    } catch (error) {
      localStorage.removeItem('auth_token')
      localStorage.removeItem('refresh_token')
    } finally {
      setLoading(false)
    }
  }

  async function login(email: string, password: string) {
    const response = await apiClient.login(email, password)
    localStorage.setItem('auth_token', response.token)
    localStorage.setItem('refresh_token', response.refresh_token)
    setUser(response.user as User)
    router.push('/dashboard')
  }

  function logout() {
    localStorage.removeItem('auth_token')
    localStorage.removeItem('refresh_token')
    setUser(null)
    router.push('/login')
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

