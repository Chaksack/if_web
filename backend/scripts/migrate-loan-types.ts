import { config } from 'dotenv'
import { neon } from '@neondatabase/serverless'
import { readFileSync } from 'fs'
import { join } from 'path'

// Load environment variables
config({ path: join(process.cwd(), '.env') })

const sql = neon(process.env.DATABASE_URL!)

async function migrateLoanTypes() {
  console.log('🔄 Migrating loan types...\n')

  try {
    // Map old loan types to new loan types
    const loanTypeMapping: Record<string, string> = {
      'personal': 'personal_loan',
      'auto': 'rideshare_loan', // Assuming auto loans map to rideshare loans
      'mortgage': 'personal_loan', // Assuming mortgage maps to personal loan
      'business': 'group_loan', // Assuming business maps to group loan
      'other': 'personal_loan', // Default to personal loan
    }

    // Update existing applications
    for (const [oldType, newType] of Object.entries(loanTypeMapping)) {
      const result = await sql`
        UPDATE loan_applications 
        SET loan_type = ${newType}
        WHERE loan_type = ${oldType}
      `
      console.log(`  Updated ${result.rowCount || 0} applications from "${oldType}" to "${newType}"`)
    }

    console.log('\n✅ Loan type migration completed!')
    console.log('\n⚠️  Note: You may need to manually review and update some loan types:')
    console.log('   - "auto" was mapped to "rideshare_loan"')
    console.log('   - "mortgage" was mapped to "personal_loan"')
    console.log('   - "business" was mapped to "group_loan"')
    console.log('   - "other" was mapped to "personal_loan"')
    console.log('\nPlease review and update any incorrect mappings manually.')

  } catch (error: any) {
    console.error('❌ Migration failed:', error.message)
    process.exit(1)
  }
}

migrateLoanTypes()

