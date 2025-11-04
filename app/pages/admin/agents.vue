<template>
  <div class="max-w-7xl mx-auto">
    <div class="mb-6 flex items-center justify-between">
      <h2 class="text-2xl font-semibold">Agents</h2>
      <Input v-model="search" placeholder="Search agents..." />
    </div>
    <Card>
      <CardContent>
        <div class="overflow-x-auto">
          <table class="w-full text-left">
            <thead>
              <tr class="text-sm text-gray-500">
                <th class="py-2">Name</th>
                <th class="py-2">Email</th>
                <th class="py-2">Location</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="a in paginated" :key="a.email" class="border-t">
                <td class="py-3">{{ a.name }}</td>
                <td class="py-3">{{ a.email }}</td>
                <td class="py-3">{{ a.location || '-' }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
    <Pagination :page="page" :perPage="perPage" :total="filtered.length" @update:page="(p)=>page=p" />
  </div>
</template>

<script setup>
definePageMeta({ middleware: 'admin', layout: 'admin' })
import { ref, computed, onMounted } from 'vue'
import { Card, CardContent } from '~/components/ui/card'
import { Input } from '~/components/ui/input'
import Pagination from '~/components/ui/pagination/Pagination.vue'

const agents = ref([])
const search = ref('')
const page = ref(1)
const perPage = ref(10)
onMounted(()=>{ agents.value = JSON.parse(localStorage.getItem('if_agents') || '[]') })
const filtered = computed(()=>{
  const term = (search.value||'').toLowerCase().trim()
  if(!term) return agents.value
  return agents.value.filter(a=> (a.name||'').toLowerCase().includes(term) || (a.email||'').toLowerCase().includes(term))
})
const paginated = computed(()=>{ const start = (page.value-1)*perPage.value; return filtered.value.slice(start, start+perPage.value) })
</script>
