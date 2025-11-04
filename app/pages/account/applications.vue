<template>
  <div>
    <div class="relative bg-primary/10">
      <div class="mx-auto max-w-7xl px-6 py-24">
        <div class="max-w-3xl">
          <h1 class="text-4xl font-bold tracking-tight mb-4">My Applications</h1>
          <p class="text-xl text-gray-600">View the status of your loan applications.</p>
        </div>
      </div>
    </div>

    <div class="py-16">
      <div class="mx-auto max-w-4xl px-6">
        <div class="bg-white p-6 rounded-lg shadow-sm">
          <div v-if="apps.length === 0" class="text-gray-600">No applications found.</div>
          <ul v-else class="space-y-3">
            <li v-for="app in apps" :key="app.id" class="p-3 border rounded-md">
              <div class="flex items-center justify-between">
                <div>
                  <div class="font-medium">GHS {{ app.amount }} · {{ app.term }} months</div>
                  <div class="text-sm text-gray-600">{{ app.purpose }}</div>
                </div>
                <div class="text-sm">
                  <span :class="app.status === 'approved' ? 'text-green-600' : app.status === 'rejected' ? 'text-red-600' : 'text-yellow-600'">{{ app.status || 'pending' }}</span>
                </div>
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
const apps = ref([])

onMounted(() => {
  const user = JSON.parse(localStorage.getItem('if_user') || 'null')
  const applications = JSON.parse(localStorage.getItem('if_applications') || '[]')
  apps.value = applications.filter(a => a.applicant === user?.email)
})
</script>
