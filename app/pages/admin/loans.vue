<template>
  <div>
    <div class="max-w-7xl mx-auto">
      <div class="mb-6 flex items-center justify-between">
        <h2 class="text-2xl font-semibold">Loan Applications</h2>
        <div class="flex items-center gap-2">
          <Input v-model="search" placeholder="Search by applicant or purpose" />
          <select v-model="filterStatus" class="px-3 py-2 border rounded">
            <option value="all">All</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
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
                <tr v-for="a in paginated" :key="a.id" class="border-t">
                  <td class="py-3">{{ a.applicant }}</td>
                  <td class="py-3">GHS {{ a.amount }}</td>
                  <td class="py-3">{{ a.purpose }}</td>
                  <td class="py-3">{{ a.term }}m</td>
                  <td class="py-3"><span :class="a.status === 'approved' ? 'text-green-600' : a.status === 'rejected' ? 'text-red-600' : 'text-yellow-600'">{{ a.status || 'pending' }}</span></td>
                  <td class="py-3">
                    <div class="flex gap-2">
                      <Button size="sm" @click="approve(a.id)" variant="outline">Approve</Button>
                      <Button size="sm" @click="reject(a.id)" variant="destructive">Reject</Button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
      <Pagination :page="page" :perPage="perPage" :total="filtered.length" @update:page="(p)=>page=p" />
    </div>
  </div>
</template>

<script setup>
definePageMeta({ middleware: 'admin', layout: 'admin' })
import { ref, computed, onMounted } from 'vue'
import { Card, CardContent } from '~/components/ui/card'
import { Input } from '~/components/ui/input'
import { Button } from '~/components/ui/button'
import Pagination from '~/components/ui/pagination/Pagination.vue'

const apps = ref([])
const search = ref('')
const filterStatus = ref('all')

onMounted(()=>{ apps.value = JSON.parse(localStorage.getItem('if_applications') || '[]') })

const page = ref(1)
const perPage = ref(10)
const filtered = computed(()=>{
  const term = (search.value||'').toLowerCase().trim()
  return apps.value.filter(a=>{
    if(filterStatus.value!=='all' && (a.status||'pending')!==filterStatus.value) return false
    if(!term) return true
    return (a.applicant||'').toLowerCase().includes(term) || (a.purpose||'').toLowerCase().includes(term)
  }).slice().reverse()
})

const paginated = computed(()=>{
  const start = (page.value-1)*perPage.value
  return filtered.value.slice(start, start + perPage.value)
})

function save(){ localStorage.setItem('if_applications', JSON.stringify(apps.value)) }
function approve(id){ const i = apps.value.findIndex(x=>x.id===id); if(i!==-1){ apps.value[i].status='approved'; save() } }
function reject(id){ const i = apps.value.findIndex(x=>x.id===id); if(i!==-1){ apps.value[i].status='rejected'; save() } }
</script>
