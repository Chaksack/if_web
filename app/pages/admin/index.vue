<template>
  <div>
    <div class="relative bg-primary/10">
      <div class="mx-auto max-w-7xl px-6 py-24">
        <div class="max-w-4xl">
          <h1 class="text-4xl font-bold tracking-tight mb-4">Admin Dashboard</h1>
          <p class="text-xl text-gray-600">Overview of users and loan applications (demo).</p>
        </div>
      </div>
    </div>

  <div class="py-16">
      <div class="mx-auto max-w-7xl px-6">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div class="md:col-span-1 space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Users</CardTitle>
                  </CardHeader>
                  <CardContent class="flex items-center gap-4">
                    <Avatar>
                      <AvatarFallback>U</AvatarFallback>
                    </Avatar>
                    <div>
                      <div class="text-sm text-gray-500">Total users</div>
                      <div class="text-2xl font-semibold">{{ users.length }}</div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Applications</CardTitle>
                  </CardHeader>
                  <CardContent class="flex items-center gap-4">
                    <div class="p-2 bg-yellow-50 rounded-lg">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 17v-6a2 2 0 012-2h2a2 2 0 012 2v6"/></svg>
                    </div>
                    <div>
                      <div class="text-sm text-gray-500">Total applications</div>
                      <div class="text-2xl font-semibold">{{ applications.length }}</div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Pending</CardTitle>
                  </CardHeader>
                  <CardContent class="flex items-center gap-4">
                    <div class="p-2 bg-red-50 rounded-lg">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3"/></svg>
                    </div>
                    <div>
                      <div class="text-sm text-gray-500">Pending</div>
                      <div class="text-2xl font-semibold">{{ pendingCount }}</div>
                    </div>
                  </CardContent>
                </Card>
              </div>

          <div class="md:col-span-2">
            <div class="bg-white p-6 rounded shadow">
              <h3 class="font-semibold mb-4">Recent Applications</h3>

              <div class="mb-4 flex items-center justify-between gap-4">
                <div class="flex items-center gap-2">
                  <input v-model="searchTerm" type="text" placeholder="Search applicant or purpose..." class="px-3 py-2 border rounded w-72" />
                  <select v-model="statusFilter" class="px-3 py-2 border rounded">
                    <option value="all">All</option>
                    <option value="pending">Pending</option>
                    <option value="approved">Approved</option>
                    <option value="rejected">Rejected</option>
                  </select>
                </div>
                <div>
                  <Button size="sm" @click="clearFilters" variant="outline">Clear</Button>
                </div>
              </div>

              <Card>
                <CardContent>
                  <div class="overflow-x-auto">
                <table class="w-full text-left">
                  <thead>
                    <tr class="text-sm text-gray-500">
                      <th class="py-2">Applicant</th>
                      <th class="py-2">Amount</th>
                      <th class="py-2">Purpose</th>
                      <th class="py-2">Term</th>
                      <th class="py-2">Status</th>
                      <th class="py-2">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="app in filtered" :key="app.id" class="border-t">
                      <td class="py-3 text-sm">{{ app.applicant }}</td>
                      <td class="py-3 text-sm">GHS {{ app.amount }}</td>
                      <td class="py-3 text-sm">{{ app.purpose }}</td>
                      <td class="py-3 text-sm">{{ app.term }}m</td>
                      <td class="py-3 text-sm"><span :class="app.status === 'approved' ? 'text-green-600' : app.status === 'rejected' ? 'text-red-600' : 'text-yellow-600'">{{ app.status || 'pending' }}</span></td>
                      <td class="py-3 text-sm">
                        <div class="flex gap-2">
                          <Button size="sm" @click="approve(app.id)" variant="outline">Approve</Button>
                          <Button size="sm" @click="reject(app.id)" variant="destructive">Reject</Button>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                  </table>
                </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({ middleware: 'admin', layout: 'admin' })
import { ref, computed, onMounted } from 'vue'
import { Button } from '~/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card'
import { Avatar, AvatarFallback } from '~/components/ui/avatar'
import { Input } from '~/components/ui/input'

const users = ref([])
const applications = ref([])

const searchTerm = ref('')
const statusFilter = ref('all')

onMounted(() => {
  users.value = JSON.parse(localStorage.getItem('if_users') || '[]')
  applications.value = JSON.parse(localStorage.getItem('if_applications') || '[]')
})

const pendingCount = computed(() => applications.value.filter(a => !a.status || a.status === 'pending').length)

const filtered = computed(() => {
  const term = (searchTerm.value || '').toLowerCase().trim()
  return applications.value.slice().reverse().filter(app => {
    if (statusFilter.value !== 'all' && (app.status || 'pending') !== statusFilter.value) return false
    if (!term) return true
    return (app.applicant || '').toLowerCase().includes(term) || (app.purpose || '').toLowerCase().includes(term)
  }).slice(0, 50)
})

function saveApps() { localStorage.setItem('if_applications', JSON.stringify(applications.value)) }

function approve(id) { const idx = applications.value.findIndex(a=>a.id===id); if(idx!==-1){applications.value[idx].status='approved'; saveApps()} }
function reject(id) { const idx = applications.value.findIndex(a=>a.id===id); if(idx!==-1){applications.value[idx].status='rejected'; saveApps()} }

function clearFilters() { searchTerm.value = ''; statusFilter.value = 'all' }
</script>
