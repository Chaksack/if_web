'use client'

import { useAuth } from '@/lib/client/auth-context'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { user, loading, logout, isAuthenticated } = useAuth()
  const router = useRouter()
  const pathname = usePathname()
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push('/login')
    }
  }, [loading, isAuthenticated, router])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return null
  }

  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: '📊' },
    { name: 'Applications', href: '/dashboard/applications', icon: '📁' },
    { name: 'Profile', href: '/dashboard/profile', icon: '👤' },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Menu Button */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-20 bg-[#1A1A2E] h-16 flex items-center px-4">
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="text-white p-2 rounded-md hover:bg-gray-800"
          aria-label="Toggle menu"
        >
          <svg
            className="h-6 w-6"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            {isSidebarOpen ? (
              <path d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
        <h1 className="ml-4 text-xl font-bold text-white">IF Agent</h1>
      </div>

      {/* Sidebar Overlay (Mobile) */}
      {isSidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 w-64 bg-gray-900 transform transition-transform duration-300 ease-in-out z-40 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0`}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-center h-16 bg-[#1A1A2E]">
            <h1 className="text-xl font-bold text-white">IF Agent</h1>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-4 space-y-2">
            {navigation.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsSidebarOpen(false)}
                  className={`flex items-center px-4 py-2 text-sm font-medium rounded-md ${
                    isActive
                      ? 'bg-[#FF6B35] text-white'
                      : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                  }`}
                >
                  <span className="mr-3">{item.icon}</span>
                  {item.name}
                </Link>
              )
            })}
          </nav>

          {/* User info */}
          <div className="px-4 py-4 border-t border-gray-800">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="h-10 w-10 rounded-full bg-[#FF6B35] flex items-center justify-center text-white font-semibold">
                  {user?.first_name?.[0]}{user?.last_name?.[0]}
                </div>
              </div>
              <div className="ml-3 flex-1">
                <p className="text-sm font-medium text-white">
                  {user?.first_name} {user?.last_name}
                </p>
                <p className="text-xs text-gray-400">{user?.role}</p>
              </div>
            </div>
            <button
              onClick={logout}
              className="mt-4 w-full text-left px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-800 rounded-md"
            >
              Sign out
            </button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-64 pt-16 lg:pt-0">
        <div className="p-0">{children}</div>
      </div>
    </div>
  )
}

