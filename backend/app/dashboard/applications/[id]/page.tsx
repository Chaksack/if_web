'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { apiClient } from '@/lib/client/api-client'
import { formatLoanType } from '@/lib/utils/loan-types'

interface Document {
  id: string
  document_type: string
  file_name: string
  file_path: string
  file_size?: number
  mime_type?: string
  is_verified: boolean
  uploaded_at: string
}

export default function ApplicationDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [application, setApplication] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [reviewStatus, setReviewStatus] = useState('')
  const [decisionNotes, setDecisionNotes] = useState('')
  const [reviewing, setReviewing] = useState(false)
  const [documents, setDocuments] = useState<Document[]>([])
  const [loadingDocuments, setLoadingDocuments] = useState(false)

  useEffect(() => {
    if (params.id) {
      loadApplication(params.id as string)
      loadDocuments(params.id as string)
    }
  }, [params.id])

  async function loadApplication(id: string) {
    try {
      setLoading(true)
      const data = await apiClient.getApplication(id)
      setApplication(data)
    } catch (err: any) {
      setError(err.message || 'Failed to load application')
    } finally {
      setLoading(false)
    }
  }

  async function loadDocuments(id: string) {
    try {
      setLoadingDocuments(true)
      const docsData = await apiClient.getDocuments(id)
      setDocuments(docsData.data || [])
    } catch (err: any) {
      console.error('Failed to load documents:', err)
    } finally {
      setLoadingDocuments(false)
    }
  }

  async function handleViewDocument(documentId: string) {
    try {
      const response = await fetch(`/api/documents/${documentId}/url`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('auth_token')}`,
        },
      })
      if (response.ok) {
        const data = await response.json()
        window.open(data.url, '_blank')
      } else {
        alert('Failed to generate document URL')
      }
    } catch (err) {
      alert('Error viewing document')
    }
  }

  function getDocumentTypeLabel(type: string): string {
    const labels: Record<string, string> = {
      id_driver_license: 'Driver License',
      id_passport: 'Passport',
      id_state_id: 'State ID',
      pay_stub: 'Pay Stub',
      bank_statement: 'Bank Statement',
      tax_return: 'Tax Return',
      employment_verification: 'Employment Verification',
      proof_of_address: 'Proof of Address',
      other: 'Other',
    }
    return labels[type] || type
  }

  function formatFileSize(bytes?: number): string {
    if (!bytes) return 'Unknown'
    if (bytes < 1024) return `${bytes} B`
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
  }

  async function handleReview() {
    if (!reviewStatus) {
      alert('Please select a review status')
      return
    }

    try {
      setReviewing(true)
      await apiClient.reviewApplication(params.id as string, {
        status: reviewStatus as any,
        decisionNotes: decisionNotes || undefined,
      })
      router.push('/dashboard/applications')
    } catch (err: any) {
      alert(err.message || 'Failed to review application')
    } finally {
      setReviewing(false)
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

  if (!application) return null

  const customer = application.customer

  return (
    <div>
      <div className="mb-6">
        <button
          onClick={() => router.back()}
          className="text-[#FF6B35] hover:text-[#E55A2B] mb-4"
        >
          ← Back to Applications
        </button>
        <h1 className="text-3xl font-bold text-gray-900">
          Application {application.application_number}
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Customer Information */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              Customer Information
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">First Name</p>
                <p className="font-medium">{customer?.first_name || 'N/A'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Last Name</p>
                <p className="font-medium">{customer?.last_name || 'N/A'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Date of Birth</p>
                <p className="font-medium">
                  {customer?.date_of_birth ? new Date(customer.date_of_birth).toLocaleDateString() : 'N/A'}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Email</p>
                <p className="font-medium">{customer?.email || 'N/A'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Phone</p>
                <p className="font-medium">{customer?.phone || 'N/A'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">ID Number (Ghana Card)</p>
                <p className="font-medium">{customer?.id_number || 'N/A'}</p>
              </div>
              <div className="col-span-2">
                <p className="text-sm text-gray-600">Address Line 1</p>
                <p className="font-medium">{customer?.address_line1 || 'N/A'}</p>
              </div>
              {customer?.address_line2 && (
                <div className="col-span-2">
                  <p className="text-sm text-gray-600">Address Line 2</p>
                  <p className="font-medium">{customer.address_line2}</p>
                </div>
              )}
              <div>
                <p className="text-sm text-gray-600">City/Town</p>
                <p className="font-medium">{customer?.city || 'N/A'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Region</p>
                <p className="font-medium">{customer?.state || 'N/A'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Zip Code</p>
                <p className="font-medium">{customer?.zip_code || 'N/A'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Country</p>
                <p className="font-medium">{customer?.country || 'N/A'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Industry</p>
                <p className="font-medium">{customer?.industry || 'N/A'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Place of Employment</p>
                <p className="font-medium">{customer?.place_of_employment || 'N/A'}</p>
              </div>
              {customer?.loan_history && (
                <div className="col-span-2">
                  <p className="text-sm text-gray-600">Loan History</p>
                  <p className="font-medium whitespace-pre-wrap">
                    {typeof customer.loan_history === 'string' 
                      ? customer.loan_history 
                      : JSON.stringify(customer.loan_history, null, 2)}
                  </p>
                </div>
              )}
              <div>
                <p className="text-sm text-gray-600">Place of Worship</p>
                <p className="font-medium">{customer?.place_of_worship || 'N/A'}</p>
              </div>
              {customer?.income_sources && (
                <div className="col-span-2">
                  <p className="text-sm text-gray-600">Income Sources</p>
                  <p className="font-medium whitespace-pre-wrap">
                    {typeof customer.income_sources === 'string' 
                      ? customer.income_sources 
                      : JSON.stringify(customer.income_sources, null, 2)}
                  </p>
                </div>
              )}
              {customer?.next_of_kin && (
                <div className="col-span-2">
                  <p className="text-sm text-gray-600">Next of Kin</p>
                  <div className="mt-1 p-3 bg-gray-50 rounded">
                    {typeof customer.next_of_kin === 'string' ? (
                      <p className="font-medium whitespace-pre-wrap">{customer.next_of_kin}</p>
                    ) : (
                      <div className="space-y-1">
                        {customer.next_of_kin.name && (
                          <p><span className="font-semibold">Name:</span> {customer.next_of_kin.name}</p>
                        )}
                        {customer.next_of_kin.relationship && (
                          <p><span className="font-semibold">Relationship:</span> {customer.next_of_kin.relationship}</p>
                        )}
                        {customer.next_of_kin.phone && (
                          <p><span className="font-semibold">Phone:</span> {customer.next_of_kin.phone}</p>
                        )}
                        {customer.next_of_kin.address && (
                          <p><span className="font-semibold">Address:</span> {customer.next_of_kin.address}</p>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              )}
              <div>
                <p className="text-sm text-gray-600">Number of Dependents</p>
                <p className="font-medium">{customer?.number_of_dependents ?? 'N/A'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Years in Business</p>
                <p className="font-medium">{customer?.years_in_business ?? 'N/A'}</p>
              </div>
            </div>
          </div>

          {/* Loan Information */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              Loan Information
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Loan Type</p>
                <p className="font-medium">{formatLoanType(application.loan_type)}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Loan Amount</p>
                <p className="font-medium">₵{Number(application.loan_amount).toFixed(2)}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Term (Months)</p>
                <p className="font-medium">
                  {application.requested_term_months || 'N/A'}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Status</p>
                <span className="px-2 py-1 rounded text-sm font-medium" style={{ backgroundColor: 'rgba(255, 107, 53, 0.1)', color: '#FF6B35' }}>
                  {application.status.replace('_', ' ').toUpperCase()}
                </span>
              </div>
              {application.purpose && (
                <div className="col-span-2">
                  <p className="text-sm text-gray-600">Purpose</p>
                  <p className="font-medium">{application.purpose}</p>
                </div>
              )}
            </div>
          </div>

          {/* Employment Information */}
          {application.employment_info && (
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Employment Information
              </h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Employer Name</p>
                  <p className="font-medium">{application.employment_info.employer_name || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Job Title</p>
                  <p className="font-medium">{application.employment_info.job_title || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Employment Type</p>
                  <p className="font-medium">
                    {application.employment_info.employment_type 
                      ? application.employment_info.employment_type.replace('_', ' ').replace(/\b\w/g, (l: string) => l.toUpperCase())
                      : 'N/A'}
                  </p>
                </div>
                {application.employment_info.monthly_income && (
                  <div>
                    <p className="text-sm text-gray-600">Monthly Income</p>
                    <p className="font-medium">₵{Number(application.employment_info.monthly_income).toFixed(2)}</p>
                  </div>
                )}
                {application.employment_info.employment_start_date && (
                  <div>
                    <p className="text-sm text-gray-600">Employment Start Date</p>
                    <p className="font-medium">
                      {new Date(application.employment_info.employment_start_date).toLocaleDateString()}
                    </p>
                  </div>
                )}
                {application.employment_info.employment_end_date && (
                  <div>
                    <p className="text-sm text-gray-600">Employment End Date</p>
                    <p className="font-medium">
                      {new Date(application.employment_info.employment_end_date).toLocaleDateString()}
                    </p>
                  </div>
                )}
                {application.employment_info.address_line1 && (
                  <div className="col-span-2">
                    <p className="text-sm text-gray-600">Employer Address</p>
                    <p className="font-medium">
                      {application.employment_info.address_line1}
                      {application.employment_info.address_line2 && `, ${application.employment_info.address_line2}`}
                      {application.employment_info.city && `, ${application.employment_info.city}`}
                      {application.employment_info.state && `, ${application.employment_info.state}`}
                      {application.employment_info.zip_code && ` ${application.employment_info.zip_code}`}
                    </p>
                  </div>
                )}
                {application.employment_info.phone && (
                  <div>
                    <p className="text-sm text-gray-600">Employer Phone</p>
                    <p className="font-medium">{application.employment_info.phone}</p>
                  </div>
                )}
                {application.employment_info.supervisor_name && (
                  <div>
                    <p className="text-sm text-gray-600">Supervisor Name</p>
                    <p className="font-medium">{application.employment_info.supervisor_name}</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Financial Information */}
          {application.financial_info && (
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Financial Information
              </h2>
              <div className="grid grid-cols-2 gap-4">
                {application.financial_info.bank_accounts && (
                  <div className="col-span-2">
                    <p className="text-sm text-gray-600">Bank Accounts</p>
                    <div className="mt-1 p-3 bg-gray-50 rounded">
                      {typeof application.financial_info.bank_accounts === 'string' ? (
                        <p className="font-medium whitespace-pre-wrap">{application.financial_info.bank_accounts}</p>
                      ) : Array.isArray(application.financial_info.bank_accounts) ? (
                        <div className="space-y-2">
                          {application.financial_info.bank_accounts.map((account: any, index: number) => (
                            <div key={index} className="p-2 bg-white rounded border">
                              {account.bankName && <p><span className="font-semibold">Bank:</span> {account.bankName}</p>}
                              {account.accountNumber && <p><span className="font-semibold">Account Number:</span> {account.accountNumber}</p>}
                              {account.accountType && <p><span className="font-semibold">Type:</span> {account.accountType}</p>}
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="font-medium">{JSON.stringify(application.financial_info.bank_accounts, null, 2)}</p>
                      )}
                    </div>
                  </div>
                )}
                {application.financial_info.total_savings !== null && application.financial_info.total_savings !== undefined && (
                  <div>
                    <p className="text-sm text-gray-600">Total Savings</p>
                    <p className="font-medium">₵{Number(application.financial_info.total_savings).toFixed(2)}</p>
                  </div>
                )}
                {application.financial_info.total_checking !== null && application.financial_info.total_checking !== undefined && (
                  <div>
                    <p className="text-sm text-gray-600">Total Checking</p>
                    <p className="font-medium">₵{Number(application.financial_info.total_checking).toFixed(2)}</p>
                  </div>
                )}
                {application.financial_info.monthly_expenses !== null && application.financial_info.monthly_expenses !== undefined && (
                  <div>
                    <p className="text-sm text-gray-600">Monthly Expenses</p>
                    <p className="font-medium">₵{Number(application.financial_info.monthly_expenses).toFixed(2)}</p>
                  </div>
                )}
                {application.financial_info.other_income !== null && application.financial_info.other_income !== undefined && (
                  <div>
                    <p className="text-sm text-gray-600">Other Income</p>
                    <p className="font-medium">₵{Number(application.financial_info.other_income).toFixed(2)}</p>
                  </div>
                )}
                {application.financial_info.debts && (
                  <div className="col-span-2">
                    <p className="text-sm text-gray-600">Debts</p>
                    <div className="mt-1 p-3 bg-gray-50 rounded">
                      {typeof application.financial_info.debts === 'string' ? (
                        <p className="font-medium whitespace-pre-wrap">{application.financial_info.debts}</p>
                      ) : Array.isArray(application.financial_info.debts) ? (
                        <div className="space-y-2">
                          {application.financial_info.debts.map((debt: any, index: number) => (
                            <div key={index} className="p-2 bg-white rounded border">
                              {debt.creditor && <p><span className="font-semibold">Creditor:</span> {debt.creditor}</p>}
                              {debt.amount && <p><span className="font-semibold">Amount:</span> ₵{Number(debt.amount).toFixed(2)}</p>}
                              {debt.monthlyPayment && <p><span className="font-semibold">Monthly Payment:</span> ₵{Number(debt.monthlyPayment).toFixed(2)}</p>}
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="font-medium">{JSON.stringify(application.financial_info.debts, null, 2)}</p>
                      )}
                    </div>
                  </div>
                )}
                {application.financial_info.total_debt !== null && application.financial_info.total_debt !== undefined && (
                  <div>
                    <p className="text-sm text-gray-600">Total Debt</p>
                    <p className="font-medium">₵{Number(application.financial_info.total_debt).toFixed(2)}</p>
                  </div>
                )}
                {application.financial_info.credit_score !== null && application.financial_info.credit_score !== undefined && (
                  <div>
                    <p className="text-sm text-gray-600">Credit Score</p>
                    <p className="font-medium">{application.financial_info.credit_score}</p>
                  </div>
                )}
                {application.financial_info.assets && (
                  <div className="col-span-2">
                    <p className="text-sm text-gray-600">Assets</p>
                    <div className="mt-1 p-3 bg-gray-50 rounded">
                      {typeof application.financial_info.assets === 'string' ? (
                        <p className="font-medium whitespace-pre-wrap">{application.financial_info.assets}</p>
                      ) : Array.isArray(application.financial_info.assets) ? (
                        <div className="space-y-2">
                          {application.financial_info.assets.map((asset: any, index: number) => (
                            <div key={index} className="p-2 bg-white rounded border">
                              {asset.type && <p><span className="font-semibold">Type:</span> {asset.type}</p>}
                              {asset.description && <p><span className="font-semibold">Description:</span> {asset.description}</p>}
                              {asset.value && <p><span className="font-semibold">Value:</span> ₵{Number(asset.value).toFixed(2)}</p>}
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="font-medium">{JSON.stringify(application.financial_info.assets, null, 2)}</p>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Documents Section */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Documents</h2>
            {loadingDocuments ? (
              <div className="text-center py-4">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mx-auto"></div>
              </div>
            ) : documents.length === 0 ? (
              <p className="text-gray-500 text-center py-4">No documents uploaded</p>
            ) : (
              <div className="space-y-2">
                {documents.map((doc) => (
                  <div
                    key={doc.id}
                    className="flex items-center justify-between p-3 border border-gray-200 rounded-md hover:bg-gray-50"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-gray-100 rounded">
                        <svg
                          className="w-6 h-6 text-gray-600"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                          />
                        </svg>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{doc.file_name}</p>
                        <p className="text-sm text-gray-500">
                          {getDocumentTypeLabel(doc.document_type)} • {formatFileSize(doc.file_size)}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {doc.is_verified && (
                        <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                          Verified
                        </span>
                      )}
                      <button
                        onClick={() => handleViewDocument(doc.id)}
                        className="px-3 py-1 text-sm bg-[#FF6B35] text-white rounded-md hover:bg-[#E55A2B]"
                      >
                        View
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Review Panel */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow p-6 sticky top-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Review</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Status
                </label>
                <select
                  value={reviewStatus}
                  onChange={(e) => setReviewStatus(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF6B35]"
                >
                  <option value="">Select status</option>
                  <option value="under_review">Under Review</option>
                  <option value="approved">Approved</option>
                  <option value="rejected">Rejected</option>
                  <option value="withdrawn">Withdrawn</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Decision Notes
                </label>
                <textarea
                  value={decisionNotes}
                  onChange={(e) => setDecisionNotes(e.target.value)}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF6B35]"
                  placeholder="Add notes about your decision..."
                />
              </div>
              <button
                onClick={handleReview}
                disabled={reviewing || !reviewStatus}
                className="w-full bg-[#FF6B35] text-white py-2 px-4 rounded-md hover:bg-[#E55A2B] focus:outline-none focus:ring-2 focus:ring-[#FF6B35] disabled:opacity-50"
              >
                {reviewing ? 'Processing...' : 'Submit Review'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

