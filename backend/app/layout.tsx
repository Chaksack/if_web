import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { AuthProviderWrapper } from '@/components/auth-provider-wrapper'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'IF Agent - Loan Application System',
  description: 'Loan application field collection system',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProviderWrapper>{children}</AuthProviderWrapper>
      </body>
    </html>
  )
}

