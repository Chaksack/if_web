<template>
  <div class="max-w-7xl mx-auto">
    <div class="mb-6 flex items-center justify-between">
      <h2 class="text-2xl font-semibold">Users</h2>
      <div class="flex items-center gap-2">
        <Input v-model="search" placeholder="Search users..." />
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
                <th class="py-2">Admin</th>
                <th class="py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="u in paginated" :key="u.email" class="border-t">
                <td class="py-3">{{ u.name || (u.firstName + ' ' + u.lastName) }}</td>
                <td class="py-3">{{ u.email }}</td>
                <td class="py-3">{{ u.is_admin ? 'Yes' : 'No' }}</td>
                <td class="py-3">
                  <div class="flex gap-2">
                    <Button size="sm" @click="toggleAdmin(u.email)">Toggle Admin</Button>
                    <Button size="sm" variant="destructive" @click="remove(u.email)">Delete</Button>
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
</template>

<script setup>
definePageMeta({ middleware: 'admin', layout: 'admin' })
import { ref, computed, onMounted } from 'vue'
import { Card, CardContent } from '~/components/ui/card'
import { Input } from '~/components/ui/input'
import { Button } from '~/components/ui/button'
import Pagination from '~/components/ui/pagination/Pagination.vue'

const users = ref([])
const search = ref('')
const page = ref(1)
const perPage = ref(10)
onMounted(()=>{ users.value = JSON.parse(localStorage.getItem('if_users') || '[]') })

const filtered = computed(()=>{
  const term = (search.value||'').toLowerCase().trim()
  if(!term) return users.value
  return users.value.filter(u=> (u.email||'').toLowerCase().includes(term) || ((u.name||'') + ' ' + (u.email||'')).toLowerCase().includes(term))
})

const paginated = computed(()=>{
  const start = (page.value-1)*perPage.value
  return filtered.value.slice(start, start + perPage.value)
})

function refresh(){ users.value = JSON.parse(localStorage.getItem('if_users') || '[]') }
function save(){ localStorage.setItem('if_users', JSON.stringify(users.value)) }
function toggleAdmin(email){ const idx = users.value.findIndex(u=>u.email===email); if(idx!==-1){ users.value[idx].is_admin = !users.value[idx].is_admin; save() } }
function remove(email){ users.value = users.value.filter(u=>u.email!==email); save() }
</script>

