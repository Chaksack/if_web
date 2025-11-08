// Simple API test script
// Run with: npm run test:api

const API_URL = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'

let authToken: string | null = null

async function testAPI() {
  console.log('🧪 Testing IF Agent Backend API\n')
  console.log(`API URL: ${API_URL}\n`)

  try {
    // Test 1: Login
    console.log('1️⃣ Testing Login...')
    const loginResponse = await fetch(`${API_URL}/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: 'officer@example.com',
        password: 'password123',
      }),
    })

    if (!loginResponse.ok) {
      const error = await loginResponse.json()
      throw new Error(`Login failed: ${JSON.stringify(error)}`)
    }

    const loginData = await loginResponse.json()
    authToken = loginData.token
    console.log('✅ Login successful!')
    console.log(`   User: ${loginData.user.email} (${loginData.user.role})`)
    console.log(`   Token: ${authToken.substring(0, 20)}...\n`)

    // Test 2: Get Current User
    console.log('2️⃣ Testing Get Current User...')
    const userResponse = await fetch(`${API_URL}/api/users/me`, {
      headers: {
        'Authorization': `Bearer ${authToken}`,
      },
    })

    if (!userResponse.ok) {
      const error = await userResponse.json()
      throw new Error(`Get user failed: ${JSON.stringify(error)}`)
    }

    const userData = await userResponse.json()
    console.log('✅ Get user successful!')
    console.log(`   User: ${userData.firstName} ${userData.lastName} (${userData.role})\n`)

    // Test 3: Create Application
    console.log('3️⃣ Testing Create Application...')
    const createAppResponse = await fetch(`${API_URL}/api/applications`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`,
      },
      body: JSON.stringify({
        customer: {
          firstName: 'Jane',
          lastName: 'Smith',
          email: 'jane@example.com',
          phone: '+1234567890',
          addressLine1: '123 Main St',
          city: 'New York',
          state: 'NY',
          zipCode: '10001',
        },
        loanType: 'personal_loan',
        loanAmount: 25000,
        requestedTermMonths: 36,
        purpose: 'Home improvement',
      }),
    })

    if (!createAppResponse.ok) {
      const error = await createAppResponse.json()
      throw new Error(`Create application failed: ${JSON.stringify(error)}`)
    }

    const appData = await createAppResponse.json()
    console.log('✅ Create application successful!')
    console.log(`   Application Number: ${appData.applicationNumber}`)
    console.log(`   Status: ${appData.status}\n`)

    const applicationId = appData.id

    // Test 4: Get Application
    console.log('4️⃣ Testing Get Application...')
    const getAppResponse = await fetch(`${API_URL}/api/applications/${applicationId}`, {
      headers: {
        'Authorization': `Bearer ${authToken}`,
      },
    })

    if (!getAppResponse.ok) {
      const error = await getAppResponse.json()
      throw new Error(`Get application failed: ${JSON.stringify(error)}`)
    }

    const appDetails = await getAppResponse.json()
    console.log('✅ Get application successful!')
    console.log(`   Customer: ${appDetails.customer.firstName} ${appDetails.customer.lastName}`)
    console.log(`   Loan Amount: ₵${appDetails.loanAmount}\n`)

    // Test 5: List Applications
    console.log('5️⃣ Testing List Applications...')
    const listAppsResponse = await fetch(`${API_URL}/api/applications?page=1&limit=10`, {
      headers: {
        'Authorization': `Bearer ${authToken}`,
      },
    })

    if (!listAppsResponse.ok) {
      const error = await listAppsResponse.json()
      throw new Error(`List applications failed: ${JSON.stringify(error)}`)
    }

    const listData = await listAppsResponse.json()
    console.log('✅ List applications successful!')
    console.log(`   Total: ${listData.pagination.total}`)
    console.log(`   Applications: ${listData.data.length}\n`)

    // Test 6: Add Employment Info
    console.log('6️⃣ Testing Add Employment Info...')
    const employmentResponse = await fetch(`${API_URL}/api/applications/${applicationId}/employment`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`,
      },
      body: JSON.stringify({
        employerName: 'ABC Corp',
        jobTitle: 'Software Engineer',
        employmentType: 'full_time',
        monthlyIncome: 5000,
        employmentStartDate: '2020-01-01',
        addressLine1: '456 Business Ave',
        city: 'New York',
        state: 'NY',
        zipCode: '10002',
        phone: '+1234567891',
        supervisorName: 'John Manager',
      }),
    })

    if (!employmentResponse.ok) {
      const error = await employmentResponse.json()
      throw new Error(`Add employment info failed: ${JSON.stringify(error)}`)
    }

    const employmentData = await employmentResponse.json()
    console.log('✅ Add employment info successful!')
    console.log(`   Employer: ${employmentData.employerName}\n`)

    // Test 7: Add Financial Info
    console.log('7️⃣ Testing Add Financial Info...')
    const financialResponse = await fetch(`${API_URL}/api/applications/${applicationId}/financial`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`,
      },
      body: JSON.stringify({
        bankAccounts: [
          {
            bankName: 'Chase Bank',
            accountType: 'checking',
            balance: 5000,
          },
        ],
        totalSavings: 15000,
        totalChecking: 5000,
        monthlyExpenses: 3000,
        creditScore: 720,
        debts: [
          {
            creditor: 'Credit Card',
            monthlyPayment: 200,
            balance: 5000,
          },
        ],
        assets: [
          {
            type: 'vehicle',
            value: 15000,
            description: '2020 Honda Accord',
          },
        ],
      }),
    })

    if (!financialResponse.ok) {
      const error = await financialResponse.json()
      throw new Error(`Add financial info failed: ${JSON.stringify(error)}`)
    }

    const financialData = await financialResponse.json()
    console.log('✅ Add financial info successful!')
    console.log(`   Credit Score: ${financialData.creditScore}\n`)

    // Test 8: Submit Application
    console.log('8️⃣ Testing Submit Application...')
    const submitResponse = await fetch(`${API_URL}/api/applications/${applicationId}/submit`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`,
      },
      body: JSON.stringify({
        notes: 'Application ready for review',
      }),
    })

    if (!submitResponse.ok) {
      const error = await submitResponse.json()
      throw new Error(`Submit application failed: ${JSON.stringify(error)}`)
    }

    const submitData = await submitResponse.json()
    console.log('✅ Submit application successful!')
    console.log(`   Status: ${submitData.status}\n`)

    // Test 9: Add Comment
    console.log('9️⃣ Testing Add Comment...')
    const commentResponse = await fetch(`${API_URL}/api/applications/${applicationId}/comments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`,
      },
      body: JSON.stringify({
        comment: 'Customer provided all required documents',
        isInternal: true,
      }),
    })

    if (!commentResponse.ok) {
      const error = await commentResponse.json()
      throw new Error(`Add comment failed: ${JSON.stringify(error)}`)
    }

    const commentData = await commentResponse.json()
    console.log('✅ Add comment successful!')
    console.log(`   Comment ID: ${commentData.id}\n`)

    // Test 10: Get Status History
    console.log('🔟 Testing Get Status History...')
    const historyResponse = await fetch(`${API_URL}/api/applications/${applicationId}/status-history`, {
      headers: {
        'Authorization': `Bearer ${authToken}`,
      },
    })

    if (!historyResponse.ok) {
      const error = await historyResponse.json()
      throw new Error(`Get status history failed: ${JSON.stringify(error)}`)
    }

    const historyData = await historyResponse.json()
    console.log('✅ Get status history successful!')
    console.log(`   History entries: ${historyData.data.length}\n`)

    console.log('🎉 All tests passed! ✅\n')
    console.log('Summary:')
    console.log(`  ✅ Login`)
    console.log(`  ✅ Get Current User`)
    console.log(`  ✅ Create Application`)
    console.log(`  ✅ Get Application`)
    console.log(`  ✅ List Applications`)
    console.log(`  ✅ Add Employment Info`)
    console.log(`  ✅ Add Financial Info`)
    console.log(`  ✅ Submit Application`)
    console.log(`  ✅ Add Comment`)
    console.log(`  ✅ Get Status History`)

  } catch (error) {
    console.error('❌ Test failed:', error)
    process.exit(1)
  }
}

testAPI()

