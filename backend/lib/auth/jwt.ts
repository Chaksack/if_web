import jwt, { SignOptions } from 'jsonwebtoken'

const JWT_SECRET: string = process.env.JWT_SECRET || 'your-secret-key'
const JWT_REFRESH_SECRET: string = process.env.JWT_REFRESH_SECRET || 'your-refresh-secret-key'
const JWT_EXPIRES_IN: string = process.env.JWT_EXPIRES_IN || '7d'
const JWT_REFRESH_EXPIRES_IN: string = process.env.JWT_REFRESH_EXPIRES_IN || '30d'

export interface JWTPayload {
  userId: string
  email: string
  role: string
}

export function signToken(payload: JWTPayload): string {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN as string | number,
  } as SignOptions)
}

export function signRefreshToken(payload: JWTPayload): string {
  return jwt.sign(payload, JWT_REFRESH_SECRET, {
    expiresIn: JWT_REFRESH_EXPIRES_IN as string | number,
  } as SignOptions)
}

export function verifyToken(token: string): JWTPayload {
  try {
    return jwt.verify(token, JWT_SECRET) as JWTPayload
  } catch (error) {
    throw new Error('Invalid or expired token')
  }
}

export function verifyRefreshToken(token: string): JWTPayload {
  try {
    return jwt.verify(token, JWT_REFRESH_SECRET) as JWTPayload
  } catch (error) {
    throw new Error('Invalid or expired refresh token')
  }
}

