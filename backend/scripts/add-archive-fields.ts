import { config } from 'dotenv'
import { neon } from '@neondatabase/serverless'
import { join } from 'path'

// Load environment variables
config({ path: join(process.cwd(), '.env') })

const sql = neon(process.env.DATABASE_URL!)

async function addArchiveFields() {
  console.log('Adding archive fields to loan_applications table...')

  try {
    // Add is_archived column
    await sql`
      ALTER TABLE loan_applications
      ADD COLUMN IF NOT EXISTS is_archived BOOLEAN DEFAULT FALSE NOT NULL
    `
    console.log('✓ Added is_archived column')

    // Add archived_at column
    await sql`
      ALTER TABLE loan_applications
      ADD COLUMN IF NOT EXISTS archived_at TIMESTAMP
    `
    console.log('✓ Added archived_at column')

    // Add archived_by column
    await sql`
      ALTER TABLE loan_applications
      ADD COLUMN IF NOT EXISTS archived_by UUID REFERENCES users(id)
    `
    console.log('✓ Added archived_by column')

    // Create index on is_archived for faster queries
    await sql`
      CREATE INDEX IF NOT EXISTS idx_loan_applications_is_archived
      ON loan_applications(is_archived)
    `
    console.log('✓ Created index on is_archived')

    console.log('\n✅ Migration completed successfully!')
  } catch (error) {
    console.error('❌ Migration failed:', error)
    process.exit(1)
  }
}

addArchiveFields()

