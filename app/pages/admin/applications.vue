<template>
  <div>
    <div class="relative bg-primary/10">
      <div class="mx-auto max-w-7xl px-6 py-24">
        <div class="max-w-4xl">
          <h1 class="text-4xl font-bold tracking-tight mb-4">Applications</h1>
          <p class="text-xl text-gray-600">Manage loan applications (demo).</p>
        </div>
      </div>
    </div>

    <div class="py-16">
      <div class="mx-auto max-w-4xl px-6">
        <div class="bg-white p-6 rounded">
          <ul class="space-y-3">
            <li v-for="app in apps" :key="app.id" class="p-3 border rounded-md flex items-center justify-between">
              <div>
                <div class="font-medium">{{ app.applicant }} — GHS {{ app.amount }}</div>
                <div class="text-sm text-gray-600">{{ app.purpose }} · {{ app.term }} months</div>
              </div>
              <div class="flex items-center gap-2">
                <span :class="app.status === 'approved' ? 'text-green-600' : app.status === 'rejected' ? 'text-red-600' : 'text-yellow-600'">{{ app.status || 'pending' }}</span>
                <Button size="sm" @click="approve(app.id)" variant="outline">Approve</Button>
                <Button size="sm" @click="reject(app.id)" variant="destructive">Reject</Button>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { Button } from '~/components/ui/button'
const apps = ref([])
onMounted(()=>{ apps.value = JSON.parse(localStorage.getItem('if_applications') || '[]') })
function save(){ localStorage.setItem('if_applications', JSON.stringify(apps.value)) }
function approve(id){ const i = apps.value.findIndex(a=>a.id===id); if(i!==-1){ apps.value[i].status='approved'; save() } }
function reject(id){ const i = apps.value.findIndex(a=>a.id===id); if(i!==-1){ apps.value[i].status='rejected'; save() } }
</script>
