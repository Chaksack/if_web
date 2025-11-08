<template>
  <div class="min-h-screen bg-gray-50">
    <section class="py-16">
      <div class="mx-auto max-w-md px-6">
        <div class="bg-white rounded-lg shadow-sm p-8">
          <div class="text-center mb-8">
            <div class="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <KeyRound class="w-8 h-8 text-primary" />
            </div>
            <h1 class="text-2xl font-bold text-gray-900">Reset Your Password</h1>
            <p class="text-gray-600 mt-2">Enter your email address and we'll send you a reset link</p>
          </div>

          <form @submit.prevent="submitReset" class="space-y-6">
            <div>
              <label for="email" class="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input 
                id="email"
                v-model="form.email"
                type="email" 
                required
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                placeholder="Enter your email address"
              >
            </div>

            <Button 
              type="submit" 
              :disabled="isSubmitting"
              class="w-full"
            >
              <span v-if="isSubmitting">Sending...</span>
              <span v-else>Send Reset Link</span>
            </Button>
          </form>

          <div class="mt-8 text-center">
            <p class="text-sm text-gray-600">
              Remember your password? 
              <NuxtLink to="/sign-in" class="text-primary hover:underline font-medium">
                Sign in instead
              </NuxtLink>
            </p>
          </div>

          <div class="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <h3 class="text-sm font-medium text-blue-900 mb-2">Need Help?</h3>
            <ul class="text-xs text-blue-800 space-y-1">
              <li>• Check your email for the reset link</li>
              <li>• The link will expire in 24 hours</li>
              <li>• Contact support if you don't receive the email</li>
            </ul>
            <NuxtLink to="/help-support" class="text-xs text-blue-600 hover:underline mt-2 inline-block">
              Contact Support →
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { KeyRound } from 'lucide-vue-next'
import Button from '~/components/ui/button/Button.vue'

// Meta tags
useHead({
  title: 'Reset Password - Innovative Finance',
  meta: [
    {
      name: 'description',
      content: 'Reset your Innovative Finance account password. Enter your email to receive a secure password reset link.'
    }
  ]
})

const isSubmitting = ref(false)
const form = ref({
  email: ''
})

const submitReset = async () => {
  isSubmitting.value = true
  
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // Here you would typically send the reset email
    console.log('Password reset requested for:', form.value.email)
    
    alert(`Password reset link sent to ${form.value.email}. Please check your email and follow the instructions.`)
    
    // Clear form
    form.value.email = ''
    
  } catch (error) {
    console.error('Reset error:', error)
    alert('There was an error sending the reset email. Please try again.')
  } finally {
    isSubmitting.value = false
  }
}
</script>