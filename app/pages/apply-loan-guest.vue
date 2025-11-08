<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <section class="bg-white shadow-sm">
      <div class="mx-auto max-w-4xl px-6 py-8">
        <div class="text-center">
          <h1 class="text-3xl font-bold text-gray-900">Get Started with Your Loan Application</h1>
          <p class="mt-2 text-gray-600">Create an account or sign in to apply for a microfinance loan</p>
        </div>
      </div>
    </section>

    <!-- Main Content -->
    <section class="py-12">
      <div class="mx-auto max-w-4xl px-6">
        <div class="grid md:grid-cols-2 gap-8">
          <!-- Sign Up Section -->
          <div class="bg-white rounded-lg shadow-sm p-8">
            <div class="text-center mb-6">
              <div class="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <UserPlus class="w-8 h-8 text-primary" />
              </div>
              <h2 class="text-2xl font-bold text-gray-900">New to Innovative Finance?</h2>
              <p class="text-gray-600 mt-2">Create an account to get started with your loan application</p>
            </div>

            <form @submit.prevent="submitSignUp" class="space-y-4">
              <div class="grid grid-cols-2 gap-4">
                <div>
                  <label for="firstName" class="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                  <input 
                    id="firstName"
                    v-model="signUpForm.firstName"
                    type="text" 
                    required
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary text-sm"
                    placeholder="John"
                  >
                </div>
                <div>
                  <label for="lastName" class="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                  <input 
                    id="lastName"
                    v-model="signUpForm.lastName"
                    type="text" 
                    required
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary text-sm"
                    placeholder="Doe"
                  >
                </div>
              </div>

              <div>
                <label for="email" class="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                <input 
                  id="email"
                  v-model="signUpForm.email"
                  type="email" 
                  required
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary text-sm"
                  placeholder="john@example.com"
                >
              </div>

              <div>
                <label for="phone" class="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                <input 
                  id="phone"
                  v-model="signUpForm.phone"
                  type="tel" 
                  required
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary text-sm"
                  placeholder="+233 XX XXX XXXX"
                >
              </div>

              <div>
                <label for="password" class="block text-sm font-medium text-gray-700 mb-1">Create Password</label>
                <input 
                  id="password"
                  v-model="signUpForm.password"
                  type="password" 
                  required
                  minlength="8"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary text-sm"
                  placeholder="At least 8 characters"
                >
              </div>

              <div class="flex items-start gap-3">
                <input 
                  v-model="signUpForm.agreeToTerms"
                  type="checkbox" 
                  required
                  class="mt-1"
                >
                <label class="text-xs text-gray-600">
                  I agree to the <NuxtLink to="/terms-conditions" class="text-primary hover:underline">Terms and Conditions</NuxtLink> 
                  and <NuxtLink to="/privacy-policy" class="text-primary hover:underline">Privacy Policy</NuxtLink>
                </label>
              </div>

              <Button 
                type="submit" 
                :disabled="isSubmittingSignUp"
                class="w-full"
              >
                <span v-if="isSubmittingSignUp">Creating Account...</span>
                <span v-else>Create Account & Apply</span>
              </Button>
            </form>
          </div>

          <!-- Sign In Section -->
          <div class="bg-white rounded-lg shadow-sm p-8">
            <div class="text-center mb-6">
              <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <LogIn class="w-8 h-8 text-green-600" />
              </div>
              <h2 class="text-2xl font-bold text-gray-900">Already have an account?</h2>
              <p class="text-gray-600 mt-2">Sign in to continue with your loan application</p>
            </div>

            <form @submit.prevent="submitSignIn" class="space-y-4">
              <div>
                <label for="signInEmail" class="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                <input 
                  id="signInEmail"
                  v-model="signInForm.email"
                  type="email" 
                  required
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary text-sm"
                  placeholder="Enter your email"
                >
              </div>

              <div>
                <label for="signInPassword" class="block text-sm font-medium text-gray-700 mb-1">Password</label>
                <input 
                  id="signInPassword"
                  v-model="signInForm.password"
                  type="password" 
                  required
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary text-sm"
                  placeholder="Enter your password"
                >
              </div>

              <div class="flex items-center justify-between text-sm">
                <label class="flex items-center gap-2">
                  <input v-model="signInForm.rememberMe" type="checkbox" class="rounded">
                  <span class="text-gray-600">Remember me</span>
                </label>
                <NuxtLink to="/forgot-password" class="text-primary hover:underline">Forgot password?</NuxtLink>
              </div>

              <Button 
                type="submit" 
                :disabled="isSubmittingSignIn"
                class="w-full"
                variant="outline"
              >
                <span v-if="isSubmittingSignIn">Signing In...</span>
                <span v-else>Sign In & Apply</span>
              </Button>
            </form>

            <!-- Quick Application Preview -->
            <div class="mt-8 p-4 bg-gray-50 rounded-lg">
              <h4 class="font-medium text-gray-900 mb-2">What happens next?</h4>
              <ul class="text-sm text-gray-600 space-y-1">
                <li class="flex items-center gap-2">
                  <CheckCircle2 class="w-4 h-4 text-green-600" />
                  <span>Choose your loan type and amount</span>
                </li>
                <li class="flex items-center gap-2">
                  <CheckCircle2 class="w-4 h-4 text-green-600" />
                  <span>Complete application in 5 minutes</span>
                </li>
                <li class="flex items-center gap-2">
                  <CheckCircle2 class="w-4 h-4 text-green-600" />
                  <span>Get approval decision within 24 hours</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <!-- Loan Types Preview -->
        <div class="mt-12 bg-white rounded-lg shadow-sm p-8">
          <h2 class="text-2xl font-bold text-center mb-8">Available Loan Types</h2>
          <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div class="text-center p-4 border rounded-lg hover:border-primary transition-colors">
              <div class="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Briefcase class="w-6 h-6 text-blue-600" />
              </div>
              <h3 class="font-semibold mb-1">Business Loans</h3>
              <p class="text-sm text-gray-600 mb-2">GHS 1,000 - 100,000</p>
              <p class="text-xs text-gray-500">For business expansion and operations</p>
            </div>

            <div class="text-center p-4 border rounded-lg hover:border-primary transition-colors">
              <div class="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <User class="w-6 h-6 text-green-600" />
              </div>
              <h3 class="font-semibold mb-1">Personal Loans</h3>
              <p class="text-sm text-gray-600 mb-2">GHS 500 - 50,000</p>
              <p class="text-xs text-gray-500">For personal financial needs</p>
            </div>

            <div class="text-center p-4 border rounded-lg hover:border-primary transition-colors">
              <div class="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Wheat class="w-6 h-6 text-yellow-600" />
              </div>
              <h3 class="font-semibold mb-1">Agricultural Loans</h3>
              <p class="text-sm text-gray-600 mb-2">GHS 2,000 - 200,000</p>
              <p class="text-xs text-gray-500">Seasonal financing for farmers</p>
            </div>

            <div class="text-center p-4 border rounded-lg hover:border-primary transition-colors">
              <div class="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <AlertCircle class="w-6 h-6 text-red-600" />
              </div>
              <h3 class="font-semibold mb-1">Emergency Loans</h3>
              <p class="text-sm text-gray-600 mb-2">GHS 200 - 10,000</p>
              <p class="text-xs text-gray-500">Quick access for urgent needs</p>
            </div>
          </div>
        </div>

        <!-- Why Choose Us -->
        <div class="mt-12 bg-gradient-to-r from-primary to-blue-600 rounded-lg p-8 text-white text-center">
          <h2 class="text-2xl font-bold mb-4">Why Choose Innovative Finance?</h2>
          <div class="grid md:grid-cols-3 gap-6">
            <div>
              <div class="text-3xl font-bold mb-2">24hrs</div>
              <p class="text-sm opacity-90">Quick approval process</p>
            </div>
            <div>
              <div class="text-3xl font-bold mb-2">15%</div>
              <p class="text-sm opacity-90">Competitive interest rates</p>
            </div>
            <div>
              <div class="text-3xl font-bold mb-2">50k+</div>
              <p class="text-sm opacity-90">Loans successfully disbursed</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { 
  UserPlus, 
  LogIn,
  CheckCircle2,
  Briefcase,
  User,
  Wheat,
  AlertCircle
} from 'lucide-vue-next'
import Button from '~/components/ui/button/Button.vue'

// Meta tags
useHead({
  title: 'Loan Application - Sign Up or Sign In - Innovative Finance',
  meta: [
    {
      name: 'description',
      content: 'Apply for a microfinance loan with Innovative Finance. Create an account or sign in to access business, personal, agricultural, and emergency loans.'
    }
  ]
})

const isSubmittingSignUp = ref(false)
const isSubmittingSignIn = ref(false)

const signUpForm = ref({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  password: '',
  agreeToTerms: false
})

const signInForm = ref({
  email: '',
  password: '',
  rememberMe: false
})

const submitSignUp = async () => {
  isSubmittingSignUp.value = true
  
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // Here you would typically create the user account
    console.log('Creating account:', signUpForm.value)
    
    // Simulate successful account creation and auto-login
    const userData = {
      firstName: signUpForm.value.firstName,
      lastName: signUpForm.value.lastName,
      email: signUpForm.value.email,
      phone: signUpForm.value.phone,
      id: Date.now() // Simulated user ID
    }
    
    // Store user data in localStorage (in real app, this would be handled by your auth system)
    localStorage.setItem('if_user', JSON.stringify(userData))
    
    alert('Account created successfully! Redirecting to loan application...')
    
    // Redirect to loan application
    navigateTo('/apply-loan')
    
  } catch (error) {
    console.error('Sign up error:', error)
    alert('There was an error creating your account. Please try again.')
  } finally {
    isSubmittingSignUp.value = false
  }
}

const submitSignIn = async () => {
  isSubmittingSignIn.value = true
  
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    // Here you would typically authenticate the user
    console.log('Signing in:', signInForm.value)
    
    // Simulate successful login
    const userData = {
      firstName: 'John',
      lastName: 'Doe',
      email: signInForm.value.email,
      phone: '+233 XX XXX XXXX',
      id: Date.now() // Simulated user ID
    }
    
    // Store user data in localStorage (in real app, this would be handled by your auth system)
    localStorage.setItem('if_user', JSON.stringify(userData))
    
    // Redirect to loan application
    navigateTo('/apply-loan')
    
  } catch (error) {
    console.error('Sign in error:', error)
    alert('Invalid email or password. Please try again.')
  } finally {
    isSubmittingSignIn.value = false
  }
}
</script>