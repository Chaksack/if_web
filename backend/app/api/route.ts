import { NextResponse } from 'next/server'

// GET /api - Health check endpoint
export async function GET() {
  return NextResponse.json({
    message: 'IF Agent API is running',
    version: '1.0.0',
    endpoints: {
      auth: {
        login: '/api/auth/login',
        refresh: '/api/auth/refresh',
      },
      users: {
        me: '/api/users/me',
        notifications: '/api/users/me/notifications',
        resetPassword: '/api/users/me/reset-password',
      },
      applications: '/api/applications',
      dashboard: {
        stats: '/api/dashboard/stats',
      },
    },
  })
}

