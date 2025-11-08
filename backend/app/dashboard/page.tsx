'use client'

import { useEffect, useState } from 'react'
import { apiClient } from '@/lib/client/api-client'
import { useAuth } from '@/lib/client/auth-context'

interface DashboardStats {
  totalApplications: number
  applicationsByStatus: Record<string, number>
  applicationsToday: number
  pendingReview: number
  totalLoanAmount: number
  averageProcessingTimeHours: number
}

export default function DashboardPage() {
  const { user } = useAuth()
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    loadStats()
  }, [])

  async function loadStats() {
    try {
      setLoading(true)
      const data = await apiClient.getDashboardStats()
      setStats(data)
    } catch (err: any) {
      setError(err.message || 'Failed to load dashboard stats')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
        {error}
      </div>
    )
  }

  if (!stats) return null

  const applicationsByStatus = stats.applicationsByStatus || {}

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Welcome back, {user?.first_name}!
        </h1>
        {user?.employee_id && (
          <p className="text-gray-600 mt-1">Agent ID: {user.employee_id}</p>
        )}
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-3 bg-blue-100 rounded-lg">
              <span className="text-2xl">💰</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">
                Transaction Value
              </p>
              <p className="text-2xl font-bold text-gray-900">
                ₵{stats.totalLoanAmount.toFixed(2)}
              </p>
              <p className="text-xs text-gray-500">This Month</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-3 bg-green-100 rounded-lg">
              <span className="text-2xl">✓</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Accounts</p>
              <p className="text-2xl font-bold text-gray-900">
                {applicationsByStatus.approved || 0}
              </p>
              <p className="text-xs text-gray-500">Approved</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-lg" style={{ backgroundColor: 'rgba(255, 107, 53, 0.1)' }}>
              <span className="text-2xl">⏳</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Reviews</p>
              <p className="text-2xl font-bold text-gray-900">
                {stats.pendingReview}
              </p>
              <p className="text-xs text-gray-500">Pending</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-3 bg-red-100 rounded-lg">
              <span className="text-2xl">✗</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Applications</p>
              <p className="text-2xl font-bold text-gray-900">
                {applicationsByStatus.rejected || 0}
              </p>
              <p className="text-xs text-gray-500">Rejected</p>
            </div>
          </div>
        </div>
      </div>

      {/* Applications by Status */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">
          Applications by Status
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-gray-900">
              {applicationsByStatus.draft || 0}
            </p>
            <p className="text-sm text-gray-600">Draft</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-gray-900">
              {applicationsByStatus.submitted || 0}
            </p>
            <p className="text-sm text-gray-600">Submitted</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-gray-900">
              {applicationsByStatus.under_review || 0}
            </p>
            <p className="text-sm text-gray-600">Under Review</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-green-600">
              {applicationsByStatus.approved || 0}
            </p>
            <p className="text-sm text-gray-600">Approved</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-red-600">
              {applicationsByStatus.rejected || 0}
            </p>
            <p className="text-sm text-gray-600">Rejected</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-gray-900">
              {applicationsByStatus.withdrawn || 0}
            </p>
            <p className="text-sm text-gray-600">Withdrawn</p>
          </div>
        </div>
      </div>
    </div>
  )
}

