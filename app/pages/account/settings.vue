<template>
  <div>
    <div class="relative bg-primary/10">
      <div class="mx-auto max-w-7xl px-6 py-24">
        <div class="max-w-3xl">
          <h1 class="text-4xl font-bold tracking-tight mb-4">Edit Profile</h1>
          <p class="text-xl text-gray-600">Update your personal details.</p>
        </div>
      </div>
    </div>

    <div class="py-16">
      <div class="mx-auto max-w-3xl px-6">
        <form class="bg-white p-8 rounded-lg shadow-sm space-y-4" @submit.prevent="save">
          <div class="grid sm:grid-cols-2 gap-6">
            <div>
              <Label>First name</Label>
              <Input v-model="user.firstName" />
            </div>
            <div>
              <Label>Last name</Label>
              <Input v-model="user.lastName" />
            </div>
          </div>

          <div>
            <Label>Email</Label>
            <Input v-model="user.email" disabled />
          </div>

          <div>
            <Label>Phone</Label>
            <Input v-model="user.phone" />
          </div>

          <div class="flex items-center justify-between">
            <Button type="submit">Save</Button>
            <Button variant="outline" @click="cancel">Cancel</Button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'nuxt/app'
import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import { Label } from '~/components/ui/label'
import { toast } from 'vue-sonner'

const user = ref({})
const router = useRouter()

onMounted(() => {
  try { user.value = JSON.parse(localStorage.getItem('if_user') || '{}') } catch (e) { user.value = {} }
})

function save() {
  try {
    localStorage.setItem('if_user', JSON.stringify(user.value))
    // update in if_users list
    try {
      const users = JSON.parse(localStorage.getItem('if_users') || '[]')
      const idx = users.findIndex(u => u.email === user.value.email)
      if (idx !== -1) { users[idx] = user.value; localStorage.setItem('if_users', JSON.stringify(users)) }
    } catch (e) { /* noop */ }
    toast.success('Profile updated')
    router.push('/account')
  } catch (e) { toast.error('Failed to save') }
}

function cancel() { router.back() }
</script>
