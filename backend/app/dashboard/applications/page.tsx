'use client'

import { useEffect, useState } from 'react'
import { apiClient } from '@/lib/client/api-client'
import Link from 'next/link'

interface Application {
  id: string
  application_number: string
  customer: {
    first_name: string
    last_name: string
    phone: string
  }
  status: string
  loan_amount: number
  created_at: string
}

interface Pagination {
  page: number
  limit: number
  total: number
  total_pages: number
}

export default function ApplicationsPage() {
  const [applications, setApplications] = useState<Application[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('')
  const [currentPage, setCurrentPage] = useState(1)
  const [pagination, setPagination] = useState<Pagination | null>(null)
  const [activeTab, setActiveTab] = useState<'active' | 'archived'>('active')
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set())
  const [archiving, setArchiving] = useState(false)

  useEffect(() => {
    loadApplications()
  }, [statusFilter, currentPage, activeTab, searchQuery])

  async function loadApplications() {
    try {
      setLoading(true)
      setSelectedIds(new Set()) // Clear selection when loading
      const response = await apiClient.getApplications({
        page: currentPage,
        limit: 10,
        status: statusFilter || undefined,
        archived: activeTab === 'archived',
        search: searchQuery || undefined,
      })
      setApplications(response.data)
      setPagination(response.pagination)
    } catch (err: any) {
      setError(err.message || 'Failed to load applications')
    } finally {
      setLoading(false)
    }
  }

  function handlePageChange(page: number) {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function handleStatusFilterChange(status: string) {
    setStatusFilter(status)
    setCurrentPage(1) // Reset to first page when filter changes
  }

  function handleSearchChange(search: string) {
    setSearchQuery(search)
    setCurrentPage(1) // Reset to first page when searching
  }

  function handleTabChange(tab: 'active' | 'archived') {
    setActiveTab(tab)
    setCurrentPage(1)
    setStatusFilter('')
    setSearchQuery('') // Clear search when switching tabs
    setSelectedIds(new Set())
  }

  function toggleSelectAll() {
    if (selectedIds.size === applications.length) {
      setSelectedIds(new Set())
    } else {
      setSelectedIds(new Set(applications.map(app => app.id)))
    }
  }

  function toggleSelect(id: string) {
    const newSelected = new Set(selectedIds)
    if (newSelected.has(id)) {
      newSelected.delete(id)
    } else {
      newSelected.add(id)
    }
    setSelectedIds(newSelected)
  }

  async function handleBulkArchive(archive: boolean) {
    if (selectedIds.size === 0) {
      alert('Please select at least one application')
      return
    }

    const action = archive ? 'archive' : 'unarchive'
    if (!confirm(`Are you sure you want to ${action} ${selectedIds.size} application(s)?`)) {
      return
    }

    try {
      setArchiving(true)
      const result = await apiClient.bulkArchiveApplications(Array.from(selectedIds), archive)
      alert(result.message)
      await loadApplications() // Reload applications
    } catch (err: any) {
      alert(err.message || `Failed to ${action} applications`)
    } finally {
      setArchiving(false)
    }
  }

  function getStatusColor(status: string) {
    switch (status) {
      case 'draft':
        return 'bg-gray-100 text-gray-800'
      case 'submitted':
      case 'under_review':
        return 'bg-orange-100 text-orange-800'
      case 'approved':
        return 'bg-green-100 text-green-800'
      case 'rejected':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  function formatDate(dateString: string) {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    })
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
      <div className="mb-4 sm:mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Applications</h1>
      </div>

      {/* Tabs */}
      <div className="mb-4 sm:mb-6 border-b border-gray-200">
        <nav className="-mb-px flex space-x-4 sm:space-x-8" aria-label="Tabs">
          <button
            onClick={() => handleTabChange('active')}
            className={`${
              activeTab === 'active'
                ? 'border-[#FF6B35] text-[#FF6B35]'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            } whitespace-nowrap py-3 sm:py-4 px-1 border-b-2 font-medium text-xs sm:text-sm`}
          >
            Active
          </button>
          <button
            onClick={() => handleTabChange('archived')}
            className={`${
              activeTab === 'archived'
                ? 'border-[#FF6B35] text-[#FF6B35]'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            } whitespace-nowrap py-3 sm:py-4 px-1 border-b-2 font-medium text-xs sm:text-sm`}
          >
            Archived
          </button>
        </nav>
      </div>

      {/* Bulk Actions */}
      {selectedIds.size > 0 && (
        <div className="mb-4 bg-orange-50 border border-orange-200 rounded-md p-3 sm:p-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <span className="text-xs sm:text-sm font-medium text-gray-900">
              {selectedIds.size} selected
            </span>
            <div className="flex flex-col sm:flex-row gap-2">
              {activeTab === 'active' ? (
                <button
                  onClick={() => handleBulkArchive(true)}
                  disabled={archiving}
                  className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 disabled:opacity-50 text-xs sm:text-sm font-medium"
                >
                  {archiving ? 'Archiving...' : 'Archive Selected'}
                </button>
              ) : (
                <button
                  onClick={() => handleBulkArchive(false)}
                  disabled={archiving}
                  className="px-4 py-2 bg-[#FF6B35] text-white rounded-md hover:bg-[#E55A2B] disabled:opacity-50 text-xs sm:text-sm font-medium"
                >
                  {archiving ? 'Unarchiving...' : 'Unarchive Selected'}
                </button>
              )}
              <button
                onClick={() => setSelectedIds(new Set())}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 text-xs sm:text-sm font-medium"
              >
                Clear
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Filters */}
      <div className="mb-4 sm:mb-6 flex flex-col sm:flex-row gap-3 sm:gap-4">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF6B35]"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => handleStatusFilterChange(e.target.value)}
          className="w-full sm:w-auto px-3 sm:px-4 py-2 text-sm sm:text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="">All Status</option>
          <option value="draft">Draft</option>
          <option value="submitted">Submitted</option>
          <option value="under_review">Under Review</option>
          <option value="approved">Approved</option>
          <option value="rejected">Rejected</option>
        </select>
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
        </div>
      ) : error ? (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      ) : applications.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-6 sm:p-8 text-center">
          <p className="text-sm sm:text-base text-gray-600">
            {searchQuery ? 'No applications found matching your search' : 'No applications found'}
          </p>
        </div>
      ) : (
        <>
          {/* Mobile Card View */}
          <div className="md:hidden space-y-4">
            {applications.map((app) => (
              <div key={app.id} className="bg-white rounded-lg shadow p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={selectedIds.has(app.id)}
                      onChange={() => toggleSelect(app.id)}
                      className="h-4 w-4 text-[#FF6B35] focus:ring-[#FF6B35] border-gray-300 rounded cursor-pointer mt-1"
                    />
                    <div>
                      <div className="text-sm font-semibold text-gray-900">
                        {app.application_number}
                      </div>
                      <div className="text-xs text-gray-500">
                        {formatDate(app.created_at)}
                      </div>
                    </div>
                  </div>
                  <span
                    className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                      app.status
                    )}`}
                  >
                    {app.status.replace('_', ' ').toUpperCase()}
                  </span>
                </div>
                
                <div className="space-y-2 mb-3">
                  <div>
                    <div className="text-xs text-gray-500">Customer</div>
                    <div className="text-sm font-medium text-gray-900">
                      {app.customer.first_name} {app.customer.last_name}
                    </div>
                    <div className="text-xs text-gray-500">{app.customer.phone}</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500">Loan Amount</div>
                    <div className="text-sm font-semibold text-gray-900">
                      ₵{app.loan_amount.toFixed(2)}
                    </div>
                  </div>
                </div>
                
                <Link
                  href={`/dashboard/applications/${app.id}`}
                  className="block w-full text-center px-4 py-2 bg-[#FF6B35] text-white rounded-md hover:bg-[#E55A2B] text-sm font-medium"
                >
                  View Details
                </Link>
              </div>
            ))}
          </div>

          {/* Desktop Table View */}
          <div className="hidden md:block bg-white rounded-lg shadow overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left">
                      <input
                        type="checkbox"
                        checked={selectedIds.size === applications.length && applications.length > 0}
                        onChange={toggleSelectAll}
                        className="h-4 w-4 text-[#FF6B35] focus:ring-[#FF6B35] border-gray-300 rounded cursor-pointer"
                      />
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Application
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Customer
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Amount
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {applications.map((app) => (
                    <tr key={app.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <input
                          type="checkbox"
                          checked={selectedIds.has(app.id)}
                          onChange={() => toggleSelect(app.id)}
                          className="h-4 w-4 text-[#FF6B35] focus:ring-[#FF6B35] border-gray-300 rounded cursor-pointer"
                        />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {app.application_number}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {app.customer.first_name} {app.customer.last_name}
                        </div>
                        <div className="text-sm text-gray-500">
                          {app.customer.phone}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          ₵{app.loan_amount.toFixed(2)}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {formatDate(app.created_at)}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(
                            app.status
                          )}`}
                        >
                          {app.status.replace('_', ' ').toUpperCase()}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <Link
                          href={`/dashboard/applications/${app.id}`}
                          className="text-[#FF6B35] hover:text-[#E55A2B]"
                        >
                          View
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Pagination */}
          {pagination && pagination.total_pages > 1 && (
            <div className="mt-4 bg-white rounded-lg shadow px-3 py-3 sm:px-6">
              {/* Mobile Pagination */}
              <div className="flex flex-col sm:hidden gap-3">
                <div className="text-xs text-center text-gray-700">
                  Page {currentPage} of {pagination.total_pages}
                </div>
                <div className="flex justify-between gap-2">
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="flex-1 inline-flex justify-center items-center px-3 py-2 border border-gray-300 text-xs font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Previous
                  </button>
                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === pagination.total_pages}
                    className="flex-1 inline-flex justify-center items-center px-3 py-2 border border-gray-300 text-xs font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Next
                  </button>
                </div>
              </div>

              {/* Desktop Pagination */}
              <div className="hidden sm:flex sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm text-gray-700">
                    Showing{' '}
                    <span className="font-medium">
                      {(currentPage - 1) * pagination.limit + 1}
                    </span>{' '}
                    to{' '}
                    <span className="font-medium">
                      {Math.min(currentPage * pagination.limit, pagination.total)}
                    </span>{' '}
                    of <span className="font-medium">{pagination.total}</span> results
                  </p>
                </div>
                <div>
                  <nav
                    className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
                    aria-label="Pagination"
                  >
                    <button
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                      className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <span className="sr-only">Previous</span>
                      <svg
                        className="h-5 w-5"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                    {/* Page numbers */}
                    {Array.from({ length: pagination.total_pages }, (_, i) => i + 1).map(
                      (page) => {
                        // Show first page, last page, current page, and pages around current
                        const showPage =
                          page === 1 ||
                          page === pagination.total_pages ||
                          (page >= currentPage - 1 && page <= currentPage + 1)

                        if (!showPage) {
                          // Show ellipsis for gaps
                          if (
                            page === currentPage - 2 ||
                            page === currentPage + 2
                          ) {
                            return (
                              <span
                                key={page}
                                className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700"
                              >
                                ...
                              </span>
                            )
                          }
                          return null
                        }

                        return (
                          <button
                            key={page}
                            onClick={() => handlePageChange(page)}
                            className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                              page === currentPage
                                ? 'z-10 bg-[#FF6B35] border-[#FF6B35] text-white'
                                : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                            }`}
                          >
                            {page}
                          </button>
                        )
                      }
                    )}
                    <button
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === pagination.total_pages}
                      className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <span className="sr-only">Next</span>
                      <svg
                        className="h-5 w-5"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                  </nav>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  )
}

