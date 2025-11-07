<script setup lang="ts">
definePageMeta({
  layout: false,
  middleware: 'auth',
})

const email = ref('')
const password = ref('')
const loading = ref(false)
const error = ref('')

const { login } = useAuth()

async function handleLogin() {
  if (!email.value || !password.value) {
    error.value = 'Please enter email and password'
    return
  }

  loading.value = true
  error.value = ''

  const result = await login(email.value, password.value)

  if (result.success) {
    navigateTo('/admin')
  } else {
    error.value = 'Invalid credentials. Please try again.'
  }

  loading.value = false
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 px-4">
    <Card class="w-full max-w-md">
      <CardHeader class="space-y-1">
        <div class="flex items-center justify-center mb-6">
          <div class="aspect-square size-12 flex items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Icon name="lucide:landmark" class="size-6" />
          </div>
        </div>
        <CardTitle class="text-2xl font-bold text-center">Admin Dashboard</CardTitle>
        <CardDescription class="text-center">
          Sign in to access the Innovative Finance admin portal
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form @submit.prevent="handleLogin" class="space-y-4">
          <div class="space-y-2">
            <Label for="email">Email</Label>
            <Input
              id="email"
              v-model="email"
              type="email"
              placeholder="admin@example.com"
              :disabled="loading"
              required
            />
          </div>
          <div class="space-y-2">
            <Label for="password">Password</Label>
            <Input
              id="password"
              v-model="password"
              type="password"
              placeholder="••••••••"
              :disabled="loading"
              required
            />
          </div>

          <Alert v-if="error" variant="destructive">
            <Icon name="lucide:alert-circle" class="h-4 w-4" />
            <AlertDescription>{{ error }}</AlertDescription>
          </Alert>

          <Button type="submit" class="w-full" :disabled="loading">
            <Icon v-if="loading" name="lucide:loader-2" class="mr-2 h-4 w-4 animate-spin" />
            {{ loading ? 'Signing in...' : 'Sign In' }}
          </Button>
        </form>
      </CardContent>
      <CardFooter class="flex flex-col space-y-2">
        <div class="text-xs text-muted-foreground text-center">
          Default credentials: admin@example.com / admin123
        </div>
      </CardFooter>
    </Card>
  </div>
</template>
