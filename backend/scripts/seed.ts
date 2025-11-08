import { db, users } from '../lib/db'
import { hashPassword } from '../lib/auth/password'

async function seed() {
  try {
    console.log('Seeding database...')

    // Create a test loan officer
    const officerPassword = await hashPassword('password123')
    const [officer] = await db
      .insert(users)
      .values({
        email: 'officer@example.com',
        passwordHash: officerPassword,
        firstName: 'John',
        lastName: 'Doe',
        role: 'loan_officer',
        phone: '+1234567890',
        employeeId: 'EMP001',
        isActive: true,
      })
      .returning()

    console.log('Created loan officer:', officer.email)

    // Create a test office staff
    const staffPassword = await hashPassword('password123')
    const [staff] = await db
      .insert(users)
      .values({
        email: 'staff@example.com',
        passwordHash: staffPassword,
        firstName: 'Jane',
        lastName: 'Smith',
        role: 'office_staff',
        phone: '+1234567891',
        employeeId: 'EMP002',
        isActive: true,
      })
      .returning()

    console.log('Created office staff:', staff.email)

    // Create a test admin
    const adminPassword = await hashPassword('password123')
    const [admin] = await db
      .insert(users)
      .values({
        email: 'admin@example.com',
        passwordHash: adminPassword,
        firstName: 'Admin',
        lastName: 'User',
        role: 'admin',
        phone: '+1234567892',
        employeeId: 'EMP003',
        isActive: true,
      })
      .returning()

    console.log('Created admin:', admin.email)

    console.log('\n✅ Seeding complete!')
    console.log('\nTest users created:')
    console.log('  Loan Officer: officer@example.com / password123')
    console.log('  Office Staff: staff@example.com / password123')
    console.log('  Admin: admin@example.com / password123')
  } catch (error) {
    console.error('Error seeding database:', error)
    process.exit(1)
  }
}

seed()

