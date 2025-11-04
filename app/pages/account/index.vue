<template>
  <div>
    <div class="relative bg-primary/10">
      <div class="mx-auto max-w-7xl px-6 py-24">
        <div class="max-w-3xl">
          <h1 class="text-4xl font-bold tracking-tight mb-4">My Account</h1>
          <p class="text-xl text-gray-600">Manage your profile and loan applications.</p>
        </div>
      </div>
    </div>

    <div class="py-16">
      <div class="mx-auto max-w-4xl px-6">
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <aside class="md:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle>Profile</CardTitle>
                </CardHeader>
                <CardContent>
                  <div class="flex items-center gap-4">
                    <Avatar>
                      <AvatarFallback>{{ userInitials }}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div class="text-lg font-semibold">{{ user?.name || 'Guest' }}</div>
                      <div class="text-sm text-gray-500">{{ user?.email || '' }}</div>
                    </div>
                  </div>

                  <div class="mt-6 space-y-3">
                    <div class="flex items-center justify-between">
                      <div class="text-sm text-gray-500">Available balance</div>
                      <div class="font-medium">GHS {{ balance }}</div>
                    </div>
                    <div class="flex items-center justify-between">
                      <div class="text-sm text-gray-500">Applications</div>
                      <div class="font-medium">{{ myApps.length }}</div>
                    </div>
                    <div class="flex items-center justify-between">
                      <div class="text-sm text-gray-500">Active loans</div>
                      <div class="font-medium">0</div>
                    </div>
                  </div>

                  <div class="mt-6 flex gap-2">
                    <RouterLink to="/account/settings" class="w-full inline-block">
                      <Button variant="outline" class="w-full">Edit profile</Button>
                    </RouterLink>
                    <RouterLink to="/loans/apply" class="w-full inline-block">
                      <Button class="w-full">Apply loan</Button>
                    </RouterLink>
                  </div>
                </CardContent>
              </Card>
            </aside>

            <main class="md:col-span-2">
              <div class="bg-white p-6 rounded shadow">
                <h3 class="font-semibold mb-4">Your Applications</h3>
                <div v-if="myApps.length === 0" class="text-sm text-gray-500">You have no loan applications yet. <RouterLink to="/loans/apply" class="text-primary">Apply now</RouterLink>.</div>
                <div v-else class="overflow-x-auto">
                  <table class="w-full text-left">
                    <thead>
                      <tr class="text-sm text-gray-500">
                        <th class="py-2">Amount</th>
                        <th class="py-2">Purpose</th>
                        <th class="py-2">Term</th>
                        <th class="py-2">Status</th>
                        <th class="py-2">Submitted</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="app in myApps" :key="app.id" class="border-t">
                        <td class="py-3">GHS {{ app.amount }}</td>
                        <td class="py-3">{{ app.purpose }}</td>
                        <td class="py-3">{{ app.term }}m</td>
                        <td class="py-3"><span :class="app.status === 'approved' ? 'text-green-600' : app.status === 'rejected' ? 'text-red-600' : 'text-yellow-600'">{{ app.status || 'pending' }}</span></td>
                        <td class="py-3 text-sm text-gray-500">{{ formatDate(app.created_at) }}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </main>
          </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'nuxt/app'
import { Button } from '~/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card'
import { Avatar, AvatarFallback } from '~/components/ui/avatar'

const router = useRouter()
const user = ref(null)
const myApps = ref([])

onMounted(() => {
  try { user.value = JSON.parse(localStorage.getItem('if_user') || 'null') } catch (e) {}
  const apps = JSON.parse(localStorage.getItem('if_applications') || '[]')
  myApps.value = apps.filter(a => a.applicant === (user.value?.email))
})

const userInitials = computed(() => {
  if (!user.value) return 'G'
  const name = user.value.name || `${user.value.firstName || ''} ${user.value.lastName || ''}`.trim()
  if (!name) return (user.value.email || 'G')[0].toUpperCase()
  return name.split(' ').map(s => s[0]).slice(0,2).join('').toUpperCase()
})

const balance = computed(() => {
  // simple mocked balance derived from number of applications for demo purposes
  return (1000 + (myApps.value?.length || 0) * 250)
})

function formatDate(d) {
  if (!d) return ''
  const dt = new Date(d)
  return dt.toLocaleDateString()
}

function goToSignIn() { router.push('/sign-in') }
function goToSignUp() { router.push('/sign-up') }
function goToSettings() { router.push('/account/settings') }
function signOut() { localStorage.removeItem('if_user'); router.push('/') }
</script>
