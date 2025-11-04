<template>
  <div class="max-w-7xl mx-auto">
    <h2 class="text-2xl font-semibold mb-4">Reports</h2>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
      <Card>
        <CardContent>
          <div class="text-sm text-gray-500">Total Applications</div>
          <div class="text-2xl font-semibold">{{ totalApplications }}</div>
        </CardContent>
      </Card>
      <Card>
        <CardContent>
          <div class="text-sm text-gray-500">Approved</div>
          <div class="text-2xl font-semibold">{{ approved }}</div>
        </CardContent>
      </Card>
      <Card>
        <CardContent>
          <div class="text-sm text-gray-500">Pending</div>
          <div class="text-2xl font-semibold">{{ pending }}</div>
        </CardContent>
      </Card>
    </div>

    <Card>
      <CardContent>
        <h3 class="font-medium mb-3">Applications by month</h3>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div v-for="(v,i) in monthly" :key="i" class="p-3 bg-white rounded shadow">
            <div class="text-sm text-gray-500">{{ v.month }}</div>
            <div class="mt-2 flex items-end gap-2">
              <div :style="{ height: (v.count * 6) + 'px' }" class="w-12 bg-primary rounded-b"></div>
              <div class="text-sm text-gray-600">{{ v.count }}</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  </div>
</template>

<script setup>
definePageMeta({ middleware: 'admin', layout: 'admin' })
import { computed, onMounted, ref } from 'vue'
import { Card, CardContent } from '~/components/ui/card'

const apps = ref([])
onMounted(()=>{ apps.value = JSON.parse(localStorage.getItem('if_applications') || '[]') })

const totalApplications = computed(()=> apps.value.length)
const approved = computed(()=> apps.value.filter(a=>a.status==='approved').length)
const pending = computed(()=> apps.value.filter(a=>!a.status || a.status==='pending').length)

const monthly = computed(()=>{
  // simple grouping by month from created_at
  const map = {}
  apps.value.forEach(a=>{
    const d = new Date(a.created_at || Date.now())
    const key = `${d.getFullYear()}-${d.getMonth()+1}`
    map[key] = (map[key] || 0) + 1
  })
  return Object.keys(map).sort().map(k=>{
    const [y,m]=k.split('-')
    return { month: `${y}-${m}`, count: map[k] }
  }).slice(-6)
})
</script>
