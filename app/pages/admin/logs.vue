<template>
  <div class="max-w-7xl mx-auto">
    <h2 class="text-2xl font-semibold mb-4">System Logs</h2>
    <Card>
      <CardContent>
        <div class="text-sm text-gray-600">Recent logs (client-side demo). Use your backend logging system for production.</div>
        <div class="mt-4 overflow-x-auto">
          <table class="w-full text-left">
            <thead>
              <tr class="text-sm text-gray-500">
                <th class="py-2">Time</th>
                <th class="py-2">Level</th>
                <th class="py-2">Message</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="l in paginated" :key="l.id" class="border-t">
                <td class="py-3 text-sm text-gray-500">{{ formatDate(l.time) }}</td>
                <td class="py-3 text-sm">{{ l.level }}</td>
                <td class="py-3 text-sm">{{ l.message }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
    <Pagination :page="page" :perPage="perPage" :total="logs.length" @update:page="(p)=>page=p" />
  </div>
</template>

<script setup>
definePageMeta({ middleware: 'admin', layout: 'admin' })
import { ref, onMounted, computed } from 'vue'
import { Card, CardContent } from '~/components/ui/card'
import Pagination from '~/components/ui/pagination/Pagination.vue'

const logs = ref([])
const page = ref(1)
const perPage = ref(15)
onMounted(()=>{ logs.value = JSON.parse(localStorage.getItem('if_logs') || '[]') })
const paginated = computed(()=>{ const start = (page.value-1)*perPage.value; return logs.value.slice().reverse().slice(start, start+perPage.value) })
function formatDate(d){ if(!d) return ''; return new Date(d).toLocaleString() }
</script>
