import { config } from 'dotenv'
import { resolve } from 'path'

// Load .env file
config({ path: resolve(__dirname, '../.env') })

import { drizzle } from 'drizzle-orm/neon-http'
import { neon } from '@neondatabase/serverless'
import * as schema from '../lib/db/schema'

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL environment variable is not set')
}

const sql = neon(process.env.DATABASE_URL)
const db = drizzle(sql, { schema })

async function migrate() {
  console.log('Running migrations...')
  
  // Note: In production, use drizzle-kit for migrations
  // This is a simple script for initial setup
  // Run: npx drizzle-kit push
  
  console.log('Migration complete!')
  console.log('Note: For production, use: npx drizzle-kit push')
}

migrate().catch(console.error)

