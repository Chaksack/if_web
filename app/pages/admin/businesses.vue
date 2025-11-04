<template>
  <div class="max-w-7xl mx-auto">
    <div class="mb-6 flex items-center justify-between">
      <h2 class="text-2xl font-semibold">Businesses</h2>
      <Input v-model="search" placeholder="Search businesses..." />
    </div>
    <Card>
      <CardContent>
        <div class="overflow-x-auto">
          <table class="w-full text-left">
            <thead>
              <tr class="text-sm text-gray-500">
                <th class="py-2">Business Name</th>
                <th class="py-2">Contact</th>
                <th class="py-2">Status</th>
              </tr>
            </thead>
              <tbody>
              <tr v-for="b in paginated" :key="b.id" class="border-t">
                <td class="py-3">{{ b.name }}</td>
                <td class="py-3">{{ b.contact || '-' }}</td>
                <td class="py-3">{{ b.status || 'active' }}</td>
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

const businesses = ref([])
const search = ref('')
const page = ref(1)
const perPage = ref(10)
onMounted(()=>{ businesses.value = JSON.parse(localStorage.getItem('if_businesses') || '[]') })
const filtered = computed(()=>{
  const term = (search.value||'').toLowerCase().trim()
  if(!term) return businesses.value
  return businesses.value.filter(b=> (b.name||'').toLowerCase().includes(term) || (b.contact||'').toLowerCase().includes(term))
})
const paginated = computed(()=>{ const start = (page.value-1)*perPage.value; return filtered.value.slice(start, start+perPage.value) })
</script>
