<template>
  <div>
    <div class="relative bg-primary/10">
      <div class="mx-auto max-w-7xl px-6 py-24">
        <div class="max-w-3xl">
          <h1 class="text-4xl font-bold tracking-tight mb-4">Apply for a loan</h1>
          <p class="text-xl text-gray-600">Quick, self-service loan application. Fill out the form and we'll process your request.</p>
        </div>
      </div>
    </div>

    <div class="py-16">
      <div class="mx-auto max-w-4xl px-6">
        <div v-if="!user" class="bg-white p-8 rounded-lg text-center">
          <h3 class="text-xl font-semibold mb-2">You need an account</h3>
          <p class="text-gray-600 mb-4">Please sign in or create an account to apply for a loan.</p>
          <div class="flex justify-center gap-4">
            <Button @click="goToSignIn">Sign in</Button>
            <Button variant="outline" @click="goToSignUp">Create account</Button>
          </div>
        </div>

        <form v-else class="space-y-6 bg-white p-8 rounded-lg shadow-sm" @submit.prevent="handleSubmit">
          <div class="grid sm:grid-cols-2 gap-6">
            <div>
              <Label>Loan Amount (GHS)</Label>
              <Input v-model.number="app.amount" type="number" min="500" placeholder="5000" />
              <p v-if="errors.amount" class="text-sm text-red-500">{{ errors.amount }}</p>
            </div>
            <div>
              <Label>Term (months)</Label>
              <Select v-model="app.term">
                <option value="12">12</option>
                <option value="24">24</option>
                <option value="36">36</option>
                <option value="48">48</option>
                <option value="60">60</option>
              </Select>
              <p v-if="errors.term" class="text-sm text-red-500">{{ errors.term }}</p>
            </div>
          </div>

          <div>
            <Label>Purpose</Label>
            <Input v-model="app.purpose" placeholder="e.g., Home improvement" />
            <p v-if="errors.purpose" class="text-sm text-red-500">{{ errors.purpose }}</p>
          </div>

          <div>
            <Label>Monthly Income (GHS)</Label>
            <Input v-model.number="app.income" type="number" placeholder="3000" />
            <p v-if="errors.income" class="text-sm text-red-500">{{ errors.income }}</p>
          </div>

          <div>
            <Label>Employment status</Label>
            <Select v-model="app.employment">
              <option value="employed">Employed</option>
              <option value="self">Self-employed</option>
              <option value="unemployed">Unemployed</option>
            </Select>
          </div>

          <div>
            <Label>Additional details</Label>
            <Textarea v-model="app.details" rows="4" placeholder="Any additional information" />
          </div>

          <div class="flex items-center justify-between">
            <div class="text-sm text-gray-600">Logged in as <span class="font-medium">{{ user?.email }}</span></div>
            <Button type="submit" :disabled="isSubmitting">{{ isSubmitting ? 'Submitting...' : 'Submit application' }}</Button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'nuxt/app'
import { toast } from 'vue-sonner'
import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import { Label } from '~/components/ui/label'
import { Select } from '~/components/ui/select'
import { Textarea } from '~/components/ui/textarea'

const router = useRouter()
const user = ref(null)
const isSubmitting = ref(false)

const app = ref({ amount: 5000, term: 12, purpose: '', income: null, employment: 'employed', details: '' })
const errors = ref({})

onMounted(() => {
  try {
    const raw = localStorage.getItem('if_user')
    if (raw) user.value = JSON.parse(raw)
  } catch (e) { console.error(e) }
})

function goToSignIn() { router.push('/sign-in') }
function goToSignUp() { router.push('/sign-up') }

function validate() {
  errors.value = {}
  if (!app.value.amount || app.value.amount < 500) errors.value.amount = 'Minimum amount is GHS 500'
  if (!app.value.term) errors.value.term = 'Please select a term'
  if (!app.value.purpose) errors.value.purpose = 'Please provide a purpose'
  if (!app.value.income || app.value.income <= 0) errors.value.income = 'Please enter your monthly income'
  return Object.keys(errors.value).length === 0
}

async function handleSubmit() {
  if (!validate()) { toast.error('Please fix the errors'); return }
  isSubmitting.value = true
  try {
    // Simulate API POST -> store application in localStorage
    const applications = JSON.parse(localStorage.getItem('if_applications') || '[]')
    const newApp = { id: Date.now(), applicant: user.value?.email || null, createdAt: new Date().toISOString(), ...app.value }
    applications.push(newApp)
    localStorage.setItem('if_applications', JSON.stringify(applications))
    toast.success('Application submitted')
    await new Promise(r => setTimeout(r, 600))
    router.push('/loans/apply/success')
  } catch (err) {
    console.error(err)
    toast.error('Failed to submit application')
  } finally { isSubmitting.value = false }
}
</script>
