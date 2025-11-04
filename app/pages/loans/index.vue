<template>
  <div>
    <LoansHero />
    
    <div class="bg-white py-16">
      <div class="mx-auto max-w-7xl px-6">
        <div class="text-center max-w-3xl mx-auto mb-16">
          <h2 class="text-3xl font-bold mb-4">Explore Our Loan Solutions</h2>
          <p class="text-gray-600">Whatever your financial needs, we have the right loan solution for you. Choose from our range of flexible financing options with competitive rates.</p>
        </div>

        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <!-- Personal Loans Card -->
          <div class="bg-white rounded-lg shadow-sm border p-6 hover:shadow-md transition-shadow">
            <User class="w-10 h-10 text-primary mb-4" />
            <h3 class="text-xl font-semibold mb-2">Personal Loans</h3>
            <p class="text-gray-600 mb-4">Get the financial flexibility you need for personal expenses, home improvements, or debt consolidation.</p>
            <ul class="space-y-2 mb-6">
              <li class="flex items-center gap-2 text-sm text-gray-600">
                <CheckCircle2 class="w-4 h-4 text-primary" />
                <span>Rates from 8.99% APR</span>
              </li>
              <li class="flex items-center gap-2 text-sm text-gray-600">
                <CheckCircle2 class="w-4 h-4 text-primary" />
                <span>Up to GHS 50,000</span>
              </li>
            </ul>
            <div class="flex gap-3">
              <NuxtLink to="/loans/personal" class="flex-1">
                <Button class="w-full">Learn More</Button>
              </NuxtLink>
              <NuxtLink to="/loans/personal" class="hover:text-primary">
                <ArrowRight class="w-6 h-6" />
              </NuxtLink>
            </div>
          </div>

          <!-- Business Loans Card -->
          <div class="bg-white rounded-lg shadow-sm border p-6 hover:shadow-md transition-shadow">
            <Building2 class="w-10 h-10 text-primary mb-4" />
            <h3 class="text-xl font-semibold mb-2">Business Loans</h3>
            <p class="text-gray-600 mb-4">Fuel your business growth with flexible financing solutions for working capital and expansion.</p>
            <ul class="space-y-2 mb-6">
              <li class="flex items-center gap-2 text-sm text-gray-600">
                <CheckCircle2 class="w-4 h-4 text-primary" />
                <span>Rates from 7.49% APR</span>
              </li>
              <li class="flex items-center gap-2 text-sm text-gray-600">
                <CheckCircle2 class="w-4 h-4 text-primary" />
                <span>Up to GHS 250,000</span>
              </li>
            </ul>
            <div class="flex gap-3">
              <NuxtLink to="/loans/business" class="flex-1">
                <Button class="w-full">Learn More</Button>
              </NuxtLink>
              <NuxtLink to="/loans/business" class="hover:text-primary">
                <ArrowRight class="w-6 h-6" />
              </NuxtLink>
            </div>
          </div>

          <!-- Home Loans Card -->
          <div class="bg-white rounded-lg shadow-sm border p-6 hover:shadow-md transition-shadow">
            <Home class="w-10 h-10 text-primary mb-4" />
            <h3 class="text-xl font-semibold mb-2">Home Loans</h3>
            <p class="text-gray-600 mb-4">Make your dream home a reality with our competitive mortgage solutions and expert guidance.</p>
            <ul class="space-y-2 mb-6">
              <li class="flex items-center gap-2 text-sm text-gray-600">
                <CheckCircle2 class="w-4 h-4 text-primary" />
                <span>Rates from 5.99% APR</span>
              </li>
              <li class="flex items-center gap-2 text-sm text-gray-600">
                <CheckCircle2 class="w-4 h-4 text-primary" />
                <span>Low down payment options</span>
              </li>
            </ul>
            <div class="flex gap-3">
              <NuxtLink to="/loans/home" class="flex-1">
                <Button class="w-full">Learn More</Button>
              </NuxtLink>
              <NuxtLink to="/loans/home" class="hover:text-primary">
                <ArrowRight class="w-6 h-6" />
              </NuxtLink>
            </div>
          </div>

          <!-- Auto Loans Card -->
          <div class="bg-white rounded-lg shadow-sm border p-6 hover:shadow-md transition-shadow">
            <Car class="w-10 h-10 text-primary mb-4" />
            <h3 class="text-xl font-semibold mb-2">Auto Loans</h3>
            <p class="text-gray-600 mb-4">Finance your dream car with competitive rates and flexible terms for new or used vehicles.</p>
            <ul class="space-y-2 mb-6">
              <li class="flex items-center gap-2 text-sm text-gray-600">
                <CheckCircle2 class="w-4 h-4 text-primary" />
                <span>Rates from 6.49% APR</span>
              </li>
              <li class="flex items-center gap-2 text-sm text-gray-600">
                <CheckCircle2 class="w-4 h-4 text-primary" />
                <span>Terms up to 72 months</span>
              </li>
            </ul>
            <div class="flex gap-3">
              <NuxtLink to="/loans/auto" class="flex-1">
                <Button class="w-full">Learn More</Button>
              </NuxtLink>
              <NuxtLink to="/loans/auto" class="hover:text-primary">
                <ArrowRight class="w-6 h-6" />
              </NuxtLink>
            </div>
          </div>

          <!-- Education Loans Card -->
          <div class="bg-white rounded-lg shadow-sm border p-6 hover:shadow-md transition-shadow">
            <GraduationCap class="w-10 h-10 text-primary mb-4" />
            <h3 class="text-xl font-semibold mb-2">Education Loans</h3>
            <p class="text-gray-600 mb-4">Invest in your future with flexible education financing and competitive rates for students.</p>
            <ul class="space-y-2 mb-6">
              <li class="flex items-center gap-2 text-sm text-gray-600">
                <CheckCircle2 class="w-4 h-4 text-primary" />
                <span>Rates from 4.99% APR</span>
              </li>
              <li class="flex items-center gap-2 text-sm text-gray-600">
                <CheckCircle2 class="w-4 h-4 text-primary" />
                <span>Deferred payment options</span>
              </li>
            </ul>
            <div class="flex gap-3">
              <NuxtLink to="/loans/education" class="flex-1">
                <Button class="w-full">Learn More</Button>
              </NuxtLink>
              <NuxtLink to="/loans/education" class="hover:text-primary">
                <ArrowRight class="w-6 h-6" />
              </NuxtLink>
            </div>
          </div>

          <!-- Equipment Loans Card -->
          <div class="bg-white rounded-lg shadow-sm border p-6 hover:shadow-md transition-shadow">
            <Wrench class="w-10 h-10 text-primary mb-4" />
            <h3 class="text-xl font-semibold mb-2">Equipment Loans</h3>
            <p class="text-gray-600 mb-4">Upgrade your business equipment with flexible financing options for machinery and technology.</p>
            <ul class="space-y-2 mb-6">
              <li class="flex items-center gap-2 text-sm text-gray-600">
                <CheckCircle2 class="w-4 h-4 text-primary" />
                <span>Rates from 7.99% APR</span>
              </li>
              <li class="flex items-center gap-2 text-sm text-gray-600">
                <CheckCircle2 class="w-4 h-4 text-primary" />
                <span>Up to 100% financing</span>
              </li>
            </ul>
            <div class="flex gap-3">
              <NuxtLink to="/loans/equipment" class="flex-1">
                <Button class="w-full">Learn More</Button>
              </NuxtLink>
              <NuxtLink to="/loans/equipment" class="hover:text-primary">
                <ArrowRight class="w-6 h-6" />
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </div>

    <BenefitsBand />
    <FAQs />
  </div>
</template>

<script setup>
import LoansHero from '~/components/loans/LoansHero.vue'
import BenefitsBand from '~/components/loans/BenefitsBand.vue'
import FAQs from '~/components/loans/FAQs.vue'
import { Button } from '~/components/ui/button'
import { CheckCircle2, User, Building2, Home, Car, GraduationCap, Wrench, ArrowRight } from 'lucide-vue-next'
</script>