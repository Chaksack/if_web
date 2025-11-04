<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'nuxt/app'
import { useAuth } from '@/lib/auth'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { toast } from 'vue-sonner'

const email = ref('')
const password = ref('')
const rememberMe = ref(false)
const isLoading = ref(false)
const showResetForm = ref(false)
const resetEmail = ref('')
const router = useRouter()
const auth = useAuth()
import { ref as ref2 } from 'vue'
const errors = ref({ email: '', password: '' })

function validateField(field: string) {
  switch (field) {
    case 'email':
      errors.value.email = /^\S+@\S+\.\S+$/.test(email.value) ? '' : 'Enter a valid email'
      break
    case 'password':
      errors.value.password = password.value.length >= 6 ? '' : 'Password must be at least 6 characters'
      break
  }
}

async function handleSignIn() {
  try {
    isLoading.value = true
    const response = await fetch('http://localhost:8080/api/v1/admin/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email.value,
        password: password.value,
      }),
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.message || 'Failed to sign in')
    }

    // Store the token based on remember me preference
    auth.setToken(data.token, rememberMe.value)
    
    toast.success('Successfully signed in')

    // Redirect to dashboard or home
    router.push('/')
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : 'An unexpected error occurred'
    toast.error(message)
  } finally {
    isLoading.value = false
  }
}

async function handlePasswordReset() {
  try {
    isLoading.value = true
    const response = await fetch('http://localhost:8080/api/v1/admin/reset-password', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: resetEmail.value,
      }),
    })

    if (!response.ok) {
      const data = await response.json()
      throw new Error(data.message || 'Failed to request password reset')
    }

    toast.success('Password reset instructions have been sent to your email')
    showResetForm.value = false
    resetEmail.value = ''
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : 'An unexpected error occurred'
    toast.error(message)
  } finally {
    isLoading.value = false
  }
}
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter-from, .fade-leave-to { opacity: 0; }

.animate-shake {
  animation: shake 0.35s ease-in-out;
}
@keyframes shake {
  10%, 90% { transform: translateX(-2px); }
  20%, 80% { transform: translateX(4px); }
  30%, 50%, 70% { transform: translateX(-8px); }
  40%, 60% { transform: translateX(8px); }
}
</style>

<template>
  <div>
    <div class="relative bg-primary/10">
      <div class="mx-auto max-w-7xl px-6 py-24">
        <div class="max-w-3xl">
          <h1 class="text-4xl font-bold tracking-tight mb-4">Sign in</h1>
          <p class="text-xl text-gray-600">Access your account to manage loans and applications.</p>
        </div>
      </div>
    </div>

    <div class="py-16">
      <div class="mx-auto max-w-3xl px-6">
        <form v-if="!showResetForm" class="space-y-6 bg-white p-8 rounded-lg shadow-sm" @submit.prevent="handleSignIn">
          <div>
            <Label>Email</Label>
            <Input
              v-model="email"
              type="email"
              placeholder="you@example.com"
              :class="{'border-red-500': errors.email, 'transition-all': true}"
              @input="validateField('email')"
              required
            />
            <Transition name="fade">
              <p v-if="errors.email" class="text-sm text-red-500 mt-1">{{ errors.email }}</p>
            </Transition>
          </div>

          <div>
            <Label>Password</Label>
            <Input
              v-model="password"
              type="password"
              placeholder="Your password"
              :class="{'border-red-500': errors.password, 'transition-all': true}"
              @input="validateField('password')"
              required
            />
            <Transition name="fade">
              <p v-if="errors.password" class="text-sm text-red-500 mt-1">{{ errors.password }}</p>
            </Transition>
          </div>

          <div class="flex items-center justify-between">
            <div class="flex items-center space-x-2">
              <Checkbox id="remember" v-model:checked="rememberMe" />
              <label for="remember" class="text-sm">Remember me</label>
            </div>
            <Button variant="link" class="px-0 text-sm" @click.prevent="showResetForm = true">Forgot your password?</Button>
          </div>

          <Button type="submit" size="lg" class="w-full" :disabled="isLoading">{{ isLoading ? 'Signing in...' : 'Sign in' }}</Button>

          <div class="text-center text-sm">
            <span class="text-muted-foreground">Don't have an account?</span>
            <Button variant="link" class="px-0 text-sm" @click="router.push('/sign-up')">Sign up</Button>
          </div>
        </form>

        <form v-else class="space-y-6 bg-white p-8 rounded-lg shadow-sm" @submit.prevent="handlePasswordReset">
          <div>
            <Label>Email</Label>
            <Input v-model="resetEmail" type="email" placeholder="you@example.com" required />
          </div>
          <div class="flex items-center justify-between">
            <Button type="submit" class="w-full" :disabled="isLoading">{{ isLoading ? 'Sending reset instructions...' : 'Send Reset Instructions' }}</Button>
          </div>
          <div class="text-center text-sm">
            <Button variant="link" class="px-0 text-sm" @click.prevent="showResetForm = false">Back to sign in</Button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped>
.min-h-screen {
  min-height: 100vh;
}
</style>