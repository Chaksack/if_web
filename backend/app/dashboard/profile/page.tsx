'use client'

import { useAuth } from '@/lib/client/auth-context'

export default function ProfilePage() {
  const { user } = useAuth()

  if (!user) return null

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Profile</h1>
      
      <div className="bg-white rounded-lg shadow p-6 max-w-2xl">
        <div className="flex items-center mb-6">
          <div className="h-20 w-20 rounded-full bg-[#FF6B35] flex items-center justify-center text-white text-2xl font-bold">
            {user.first_name[0]}{user.last_name[0]}
          </div>
          <div className="ml-6">
            <h2 className="text-2xl font-bold text-gray-900">
              {user.first_name} {user.last_name}
            </h2>
            {user.employee_id && (
              <p className="text-gray-600">Agent ID: {user.employee_id}</p>
            )}
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <p className="text-sm text-gray-600">Email</p>
            <p className="font-medium">{user.email}</p>
          </div>
          {user.phone && (
            <div>
              <p className="text-sm text-gray-600">Phone</p>
              <p className="font-medium">{user.phone}</p>
            </div>
          )}
          <div>
            <p className="text-sm text-gray-600">Role</p>
            <p className="font-medium capitalize">
              {user.role.replace('_', ' ')}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Status</p>
            <p className="font-medium">
              {user.is_active ? (
                <span className="text-green-600">Active</span>
              ) : (
                <span className="text-red-600">Inactive</span>
              )}
            </p>
          </div>
          {user.created_at && (
            <div>
              <p className="text-sm text-gray-600">Member Since</p>
              <p className="font-medium">
                {new Date(user.created_at).toLocaleDateString()}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

