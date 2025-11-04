export default defineNuxtPlugin(() => {
  // Seed demo user and applications in localStorage for client-side preview
  if (typeof window !== 'undefined') {
    try {
      const existingUser = localStorage.getItem('if_user')
      const demoUser = {
        firstName: 'Demo',
        lastName: 'User',
        email: 'demo.user@example.com',
        phone: '+233 24 000 0000',
        createdAt: new Date().toISOString(),
        is_admin: true
      }

      if (!existingUser) {
        localStorage.setItem('if_user', JSON.stringify(demoUser))
      }

      // Ensure users list contains demo user
      try {
        const users = JSON.parse(localStorage.getItem('if_users') || '[]')
        const exists = users.find((u: any) => u.email === demoUser.email)
        if (!exists) {
          users.push(demoUser)
          localStorage.setItem('if_users', JSON.stringify(users))
        }
      } catch (e) {
        // ignore parse errors
        localStorage.setItem('if_users', JSON.stringify([demoUser]))
      }

      // Seed sample applications if none exist
      try {
        const apps = JSON.parse(localStorage.getItem('if_applications') || '[]')
        if (!apps || apps.length === 0) {
          const sample = [
            {
              id: Date.now(),
              applicant: demoUser.email,
              amount: 10000,
              term: 24,
              purpose: 'Home improvement',
              income: 4000,
              employment: 'employed',
              details: 'Renovation work',
              status: 'pending',
              createdAt: new Date().toISOString()
            },
            {
              id: Date.now() + 1,
              applicant: demoUser.email,
              amount: 5000,
              term: 12,
              purpose: 'Small business',
              income: 3000,
              employment: 'self',
              details: 'Working capital',
              status: 'approved',
              createdAt: new Date().toISOString()
            }
          ]
          localStorage.setItem('if_applications', JSON.stringify(sample))
        }
      } catch (e) {
        localStorage.setItem('if_applications', JSON.stringify([]))
      }

      // Debugging hint
      // console.info('Mock data seeded: if_user, if_users, if_applications')
    } catch (err) {
      // swallow errors in plugin
      // console.warn('mock-data plugin error', err)
    }
  }
})
