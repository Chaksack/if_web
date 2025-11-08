<template>
  <div>
    <SavingsHero />
    
    <div class="bg-white py-16">
      <div class="mx-auto max-w-7xl px-6">
        <div class="text-center max-w-3xl mx-auto mb-16">
          <h2 class="text-3xl font-bold mb-4">Grow Your Savings with Us</h2>
          <p class="text-gray-600">Build your financial future with our range of savings products designed to help you reach your goals. Choose from flexible savings options with competitive interest rates.</p>
        </div>

        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <!-- Regular Savings Card -->
          <div class="bg-white rounded-lg shadow-sm border p-6 hover:shadow-md transition-shadow">
            <PiggyBank class="w-10 h-10 text-primary mb-4" />
            <h3 class="text-xl font-semibold mb-2">Regular Savings</h3>
            <p class="text-gray-600 mb-4">Start building your savings with our flexible regular savings account. Perfect for everyday savers.</p>
            <ul class="space-y-2 mb-6">
              <li class="flex items-center gap-2 text-sm text-gray-600">
                <CheckCircle2 class="w-4 h-4 text-primary" />
                <span>2.5% annual interest rate</span>
              </li>
              <li class="flex items-center gap-2 text-sm text-gray-600">
                <CheckCircle2 class="w-4 h-4 text-primary" />
                <span>No minimum balance</span>
              </li>
              <li class="flex items-center gap-2 text-sm text-gray-600">
                <CheckCircle2 class="w-4 h-4 text-primary" />
                <span>Easy access to funds</span>
              </li>
            </ul>
            <div class="flex gap-3">
              <NuxtLink to="/savings/regular" class="flex-1">
                <Button class="w-full">Learn More</Button>
              </NuxtLink>
              <NuxtLink to="/savings/regular" class="hover:text-primary">
                <ArrowRight class="w-6 h-6" />
              </NuxtLink>
            </div>
          </div>

          <!-- Fixed Deposit Card -->
          <div class="bg-white rounded-lg shadow-sm border p-6 hover:shadow-md transition-shadow">
            <Landmark class="w-10 h-10 text-primary mb-4" />
            <h3 class="text-xl font-semibold mb-2">Fixed Deposits</h3>
            <p class="text-gray-600 mb-4">Lock in higher interest rates with our fixed deposit accounts. Guaranteed returns for your savings.</p>
            <ul class="space-y-2 mb-6">
              <li class="flex items-center gap-2 text-sm text-gray-600">
                <CheckCircle2 class="w-4 h-4 text-primary" />
                <span>Up to 8.5% annual interest</span>
              </li>
              <li class="flex items-center gap-2 text-sm text-gray-600">
                <CheckCircle2 class="w-4 h-4 text-primary" />
                <span>Terms from 3 to 60 months</span>
              </li>
              <li class="flex items-center gap-2 text-sm text-gray-600">
                <CheckCircle2 class="w-4 h-4 text-primary" />
                <span>Guaranteed returns</span>
              </li>
            </ul>
            <div class="flex gap-3">
              <NuxtLink to="/savings/fixed-deposit" class="flex-1">
                <Button class="w-full">Learn More</Button>
              </NuxtLink>
              <NuxtLink to="/savings/fixed-deposit" class="hover:text-primary">
                <ArrowRight class="w-6 h-6" />
              </NuxtLink>
            </div>
          </div>

          <!-- Children's Savings Card -->
          <div class="bg-white rounded-lg shadow-sm border p-6 hover:shadow-md transition-shadow">
            <Baby class="w-10 h-10 text-primary mb-4" />
            <h3 class="text-xl font-semibold mb-2">Children's Savings</h3>
            <p class="text-gray-600 mb-4">Start your child's financial journey early with our dedicated children's savings account.</p>
            <ul class="space-y-2 mb-6">
              <li class="flex items-center gap-2 text-sm text-gray-600">
                <CheckCircle2 class="w-4 h-4 text-primary" />
                <span>3.5% annual interest rate</span>
              </li>
              <li class="flex items-center gap-2 text-sm text-gray-600">
                <CheckCircle2 class="w-4 h-4 text-primary" />
                <span>No monthly fees</span>
              </li>
              <li class="flex items-center gap-2 text-sm text-gray-600">
                <CheckCircle2 class="w-4 h-4 text-primary" />
                <span>Educational resources included</span>
              </li>
            </ul>
            <div class="flex gap-3">
              <NuxtLink to="/savings/children" class="flex-1">
                <Button class="w-full">Learn More</Button>
              </NuxtLink>
              <NuxtLink to="/savings/children" class="hover:text-primary">
                <ArrowRight class="w-6 h-6" />
              </NuxtLink>
            </div>
          </div>

          <!-- Goal-Based Savings Card -->
          <div class="bg-white rounded-lg shadow-sm border p-6 hover:shadow-md transition-shadow">
            <Target class="w-10 h-10 text-primary mb-4" />
            <h3 class="text-xl font-semibold mb-2">Goal-Based Savings</h3>
            <p class="text-gray-600 mb-4">Save for specific goals with our structured savings plans designed to help you achieve your dreams.</p>
            <ul class="space-y-2 mb-6">
              <li class="flex items-center gap-2 text-sm text-gray-600">
                <CheckCircle2 class="w-4 h-4 text-primary" />
                <span>4.0% annual interest rate</span>
              </li>
              <li class="flex items-center gap-2 text-sm text-gray-600">
                <CheckCircle2 class="w-4 h-4 text-primary" />
                <span>Automatic savings plans</span>
              </li>
              <li class="flex items-center gap-2 text-sm text-gray-600">
                <CheckCircle2 class="w-4 h-4 text-primary" />
                <span>Progress tracking tools</span>
              </li>
            </ul>
            <div class="flex gap-3">
              <NuxtLink to="/savings/goal-based" class="flex-1">
                <Button class="w-full">Learn More</Button>
              </NuxtLink>
              <NuxtLink to="/savings/goal-based" class="hover:text-primary">
                <ArrowRight class="w-6 h-6" />
              </NuxtLink>
            </div>
          </div>

          <!-- Business Savings Card -->
          <div class="bg-white rounded-lg shadow-sm border p-6 hover:shadow-md transition-shadow">
            <Building2 class="w-10 h-10 text-primary mb-4" />
            <h3 class="text-xl font-semibold mb-2">Business Savings</h3>
            <p class="text-gray-600 mb-4">Maximize your business cash flow with our high-yield business savings accounts.</p>
            <ul class="space-y-2 mb-6">
              <li class="flex items-center gap-2 text-sm text-gray-600">
                <CheckCircle2 class="w-4 h-4 text-primary" />
                <span>5.0% annual interest rate</span>
              </li>
              <li class="flex items-center gap-2 text-sm text-gray-600">
                <CheckCircle2 class="w-4 h-4 text-primary" />
                <span>No transaction fees</span>
              </li>
              <li class="flex items-center gap-2 text-sm text-gray-600">
                <CheckCircle2 class="w-4 h-4 text-primary" />
                <span>Business banking integration</span>
              </li>
            </ul>
            <div class="flex gap-3">
              <NuxtLink to="/savings/business" class="flex-1">
                <Button class="w-full">Learn More</Button>
              </NuxtLink>
              <NuxtLink to="/savings/business" class="hover:text-primary">
                <ArrowRight class="w-6 h-6" />
              </NuxtLink>
            </div>
          </div>

          <!-- Emergency Fund Card -->
          <div class="bg-white rounded-lg shadow-sm border p-6 hover:shadow-md transition-shadow">
            <Shield class="w-10 h-10 text-primary mb-4" />
            <h3 class="text-xl font-semibold mb-2">Emergency Fund</h3>
            <p class="text-gray-600 mb-4">Build a safety net with our emergency fund savings account. Quick access when you need it most.</p>
            <ul class="space-y-2 mb-6">
              <li class="flex items-center gap-2 text-sm text-gray-600">
                <CheckCircle2 class="w-4 h-4 text-primary" />
                <span>3.0% annual interest rate</span>
              </li>
              <li class="flex items-center gap-2 text-sm text-gray-600">
                <CheckCircle2 class="w-4 h-4 text-primary" />
                <span>Instant withdrawal access</span>
              </li>
              <li class="flex items-center gap-2 text-sm text-gray-600">
                <CheckCircle2 class="w-4 h-4 text-primary" />
                <span>No penalties for withdrawals</span>
              </li>
            </ul>
            <div class="flex gap-3">
              <NuxtLink to="/savings/emergency" class="flex-1">
                <Button class="w-full">Learn More</Button>
              </NuxtLink>
              <NuxtLink to="/savings/emergency" class="hover:text-primary">
                <ArrowRight class="w-6 h-6" />
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </div>

    <SavingsBenefitsBand />
    <SavingsFAQs />
  </div>
</template>

<script setup>
import { 
  PiggyBank, 
  Landmark, 
  Baby, 
  Target, 
  Building2, 
  Shield,
  CheckCircle2,
  ArrowRight
} from 'lucide-vue-next'
import Button from '~/components/ui/button/Button.vue'

// Meta tags
useHead({
  title: 'Savings Products - Innovative Finance',
  meta: [
    {
      name: 'description',
      content: 'Discover our range of savings products designed to help you grow your wealth. From regular savings to fixed deposits, find the perfect savings solution for your financial goals.'
    }
  ]
})
</script>