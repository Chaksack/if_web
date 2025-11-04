<template>
  <div>
    <div class="max-w-7xl mx-auto">
      <div class="mb-6 flex items-center justify-between">
        <h2 class="text-2xl font-semibold">Transactions</h2>
        <Input v-model="search" placeholder="Search transactions..." />
      </div>

      <Card>
        <CardContent>
          <div class="overflow-x-auto">
            <table class="w-full text-left">
              <thead>
                <tr class="text-sm text-gray-500">
                  <th class="py-2">ID</th>
                  <th class="py-2">From</th>
                  <th class="py-2">To</th>
                  <th class="py-2">Amount</th>
                  <th class="py-2">Date</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="t in paginated" :key="t.id" class="border-t">
                  <td class="py-3">{{ t.id }}</td>
                  <td class="py-3">{{ t.from }}</td>
                  <td class="py-3">{{ t.to }}</td>
                  <td class="py-3">GHS {{ t.amount }}</td>
                  <td class="py-3 text-sm text-gray-500">{{ formatDate(t.date) }}</td>
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
import Pagination from '~/components/ui/pagination/Pagination.vue'

const txs = ref([])
const search = ref('')

onMounted(()=>{ txs.value = JSON.parse(localStorage.getItem('if_transactions') || '[]') })

const page = ref(1)
const perPage = ref(10)
const filtered = computed(()=>{
  const term = (search.value||'').toLowerCase().trim()
  return txs.value.filter(t=>{
    if(!term) return true
    return (t.id||'').toString().includes(term) || (t.from||'').toLowerCase().includes(term) || (t.to||'').toLowerCase().includes(term)
  }).slice().reverse()
})

const paginated = computed(()=>{ const start = (page.value-1)*perPage.value; return filtered.value.slice(start, start+perPage.value) })

function formatDate(d){ if(!d) return ''; return new Date(d).toLocaleString() }
</script>
