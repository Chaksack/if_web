<template>
  <div class="py-24">
    <div class="mx-auto max-w-3xl px-6 text-center">
      <CheckCircle2 class="mx-auto mb-6 w-16 h-16 text-primary" />
      <h2 class="text-2xl font-semibold">Account created</h2>
      <p class="text-gray-600 mt-2">Your account has been created successfully. You can now sign in and apply for loans.</p>
      <div class="mt-6">
        <Button @click="goToSignIn">Sign in</Button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'nuxt/app'
import { Button } from '~/components/ui/button'
import { CheckCircle2 } from 'lucide-vue-next'

const router = useRouter()
function goToSignIn() { router.push('/sign-in') }
</script>
