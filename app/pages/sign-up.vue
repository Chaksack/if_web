<template>
  <div>
    <div class="relative bg-primary/10">
      <div class="mx-auto max-w-7xl px-6 py-24">
        <div class="max-w-3xl">
          <h1 class="text-4xl font-bold tracking-tight mb-4">Create an account</h1>
          <p class="text-xl text-gray-600">Sign up to manage your account, apply for loans, and track applications.</p>
        </div>
      </div>
    </div>

    <div class="py-16">
      <div class="mx-auto max-w-3xl px-6">
        <form class="space-y-6 bg-white p-8 rounded-lg shadow-sm" @submit.prevent="handleSubmit">
          <div class="grid sm:grid-cols-2 gap-6">
            <div>
              <Label>First name</Label>
              <Input
                v-model="form.firstName"
                placeholder="John"
                :class="{'border-red-500': errors.firstName, 'transition-all': true}"
                @input="validateField('firstName')"
              />
              <Transition name="fade">
                <p v-if="errors.firstName" class="text-sm text-red-500 mt-1">{{ errors.firstName }}</p>
              </Transition>
            </div>
            <div>
              <Label>Last name</Label>
              <Input
                v-model="form.lastName"
                placeholder="Doe"
                :class="{'border-red-500': errors.lastName, 'transition-all': true}"
                @input="validateField('lastName')"
              />
              <Transition name="fade">
                <p v-if="errors.lastName" class="text-sm text-red-500 mt-1">{{ errors.lastName }}</p>
              </Transition>
            </div>
          </div>

          <div>
            <Label>Email</Label>
            <Input type="email" v-model="form.email" placeholder="you@example.com" />
            <p v-if="errors.email" class="text-sm text-red-500">{{ errors.email }}</p>
          </div>

          <div>
            <Label>Phone</Label>
            <Input v-model="form.phone" placeholder="+233 XX XXX XXXX" />
            <p v-if="errors.phone" class="text-sm text-red-500">{{ errors.phone }}</p>
          </div>

          <div>
            <Label>Password</Label>
            <Input
              type="password"
              v-model="form.password"
              placeholder="Choose a strong password"
              :class="{'border-red-500': errors.password, 'transition-all': true}"
              @input="validateField('password')"
            />
            <div class="mt-2">
              <div class="h-2 w-full bg-gray-200 rounded overflow-hidden">
                <div :class="passwordBarClass" :style="{ width: passwordStrengthPercent + '%' }"></div>
              </div>
              <Transition name="fade">
                <p v-if="errors.password" class="text-sm text-red-500 mt-1">{{ errors.password }}</p>
              </Transition>
            </div>
            <p class="text-xs text-gray-500 mt-1">Password strength: <span class="font-medium">{{ passwordStrengthLabel }}</span></p>
          </div>

          <Button type="submit" size="lg" class="w-full">{{ isSubmitting ? 'Creating account...' : 'Create account' }}</Button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'nuxt/app'
import { toast } from 'vue-sonner'
import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import { Label } from '~/components/ui/label'

const router = useRouter()
const isSubmitting = ref(false)

const form = ref({ firstName: '', lastName: '', email: '', phone: '', password: '' })
const errors = ref({})

import { computed } from 'vue'

const passwordStrengthScore = computed(() => {
  const p = form.value.password || ''
  let score = 0
  if (p.length >= 8) score += 1
  if (/[A-Z]/.test(p)) score += 1
  if (/[0-9]/.test(p)) score += 1
  if (/[^A-Za-z0-9]/.test(p)) score += 1
  return score
})

const passwordStrengthLabel = computed(() => {
  const s = passwordStrengthScore.value
  return s <= 1 ? 'Weak' : s === 2 ? 'Medium' : 'Strong'
})

const passwordStrengthPercent = computed(() => (passwordStrengthScore.value / 4) * 100)

const passwordBarClass = computed(() => {
  const s = passwordStrengthScore.value
  if (s <= 1) return 'bg-red-500 h-full transition-all duration-300'
  if (s === 2) return 'bg-yellow-400 h-full transition-all duration-300'
  return 'bg-green-500 h-full transition-all duration-300'
})

function validateField(field) {
  // lightweight per-field validation
  switch (field) {
    case 'firstName':
      errors.value.firstName = form.value.firstName.trim() ? '' : 'Required'
      break
    case 'lastName':
      errors.value.lastName = form.value.lastName.trim() ? '' : 'Required'
      break
    case 'email':
      errors.value.email = /^\S+@\S+\.\S+$/.test(form.value.email) ? '' : 'Enter a valid email'
      break
    case 'phone':
      errors.value.phone = form.value.phone && form.value.phone.length >= 7 ? '' : 'Enter a valid phone'
      break
    case 'password':
      errors.value.password = form.value.password.length >= 8 ? '' : 'Password must be 8+ chars'
      break
  }
}

function validate() {
  errors.value = {}
  if (!form.value.firstName.trim()) errors.value.firstName = 'Required'
  if (!form.value.lastName.trim()) errors.value.lastName = 'Required'
  if (!form.value.email || !/^\S+@\S+\.\S+$/.test(form.value.email)) errors.value.email = 'Valid email required'
  if (!form.value.phone || form.value.phone.length < 7) errors.value.phone = 'Valid phone required'
  if (!form.value.password || form.value.password.length < 8) errors.value.password = 'Password must be 8+ chars'
  return Object.keys(errors.value).length === 0
}

async function handleSubmit() {
  if (!validate()) {
    toast.error('Please fix the errors in the form')
    return
  }

  isSubmitting.value = true
  try {
    // Simulate API call; save to localStorage for self-service demo
    const user = { ...form.value, createdAt: new Date().toISOString() }
    // Save current session
    localStorage.setItem('if_user', JSON.stringify(user))
    // Also append to users list for admin view
    try {
      const users = JSON.parse(localStorage.getItem('if_users') || '[]')
      users.push(user)
      localStorage.setItem('if_users', JSON.stringify(users))
    } catch (e) {
      console.warn('Failed to append to if_users', e)
    }
    toast.success('Account created')
    await new Promise(r => setTimeout(r, 500))
    router.push('/sign-up/success')
  } catch (err) {
    console.error(err)
    toast.error('Failed to create account')
  } finally {
    isSubmitting.value = false
  }
}
</script>

<style scoped>
.animate-shake {
  animation: shake 0.35s ease-in-out;
}
@keyframes shake {
  10%, 90% { transform: translateX(-2px); }
  20%, 80% { transform: translateX(4px); }
  30%, 50%, 70% { transform: translateX(-8px); }
  40%, 60% { transform: translateX(8px); }
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>
