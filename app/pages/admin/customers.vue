<template>
  <div>
    <div class="max-w-7xl mx-auto">
      <div class="mb-6 flex items-center justify-between">
        <h2 class="text-2xl font-semibold">Customers</h2>
        <div class="flex items-center gap-2">
          <Input v-model="search" placeholder="Search customers..." />
          <Button @click="refresh">Refresh</Button>
        </div>
      </div>

      <Card>
        <CardContent>
          <div class="overflow-x-auto">
            <table class="w-full text-left">
              <thead>
                <tr class="text-sm text-gray-500">
                  <th class="py-2">Name</th>
                  <th class="py-2">Email</th>
                  <th class="py-2">Phone</th>
                  <th class="py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="c in paginated" :key="c.email" class="border-t">
                  <td class="py-3">{{ c.name || c.firstName + ' ' + c.lastName }}</td>
                  <td class="py-3">{{ c.email }}</td>
                  <td class="py-3">{{ c.phone || '-' }}</td>
                  <td class="py-3">
                    <Button size="sm">View</Button>
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
import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import Pagination from '~/components/ui/pagination/Pagination.vue'

const customers = ref([])
const search = ref('')
const page = ref(1)
const perPage = ref(10)

onMounted(() => {
  customers.value = JSON.parse(localStorage.getItem('if_users') || '[]')
})

const filtered = computed(() => {
  const term = (search.value || '').toLowerCase().trim()
  if (!term) return customers.value
  return customers.value.filter(c => (c.email||'').toLowerCase().includes(term) || (c.name||'').toLowerCase().includes(term) || ((c.firstName||'') + ' ' + (c.lastName||'')).toLowerCase().includes(term))
})

const paginated = computed(()=>{ const start = (page.value-1)*perPage.value; return filtered.value.slice(start, start+perPage.value) })

function refresh(){ customers.value = JSON.parse(localStorage.getItem('if_users') || '[]') }
</script>
