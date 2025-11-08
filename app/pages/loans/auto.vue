<template>
  <div>
    <Breadcrumb :items="[
      { name: 'Loans', href: '/loans' },
      { name: 'Auto Loans', href: '/loans/auto' }
    ]" />
    
    <div class="relative">
      <div class="bg-primary/10 py-24">
        <div class="mx-auto max-w-7xl px-6">
          <h1 class="text-4xl font-bold mb-4">Auto Loans</h1>
          <p class="text-xl text-gray-600 max-w-2xl">Drive your dream car with our competitive auto financing options. New or used, we offer great rates and flexible terms to get you on the road.</p>
        </div>
      </div>
    </div>

    <div class="mx-auto max-w-7xl px-6 py-16">
      <div class="grid md:grid-cols-2 gap-12">
        <div class="space-y-6">
          <h2 class="text-3xl font-semibold">Why Choose Our Auto Loan?</h2>
          <div class="space-y-4">
            <div class="flex items-start gap-4">
              <div class="mt-1">
                <CheckCircle2 class="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 class="font-semibold text-lg">Competitive Rates</h3>
                <p class="text-gray-600">Starting from 6.49% APR for qualified buyers with flexible terms.</p>
              </div>
            </div>
            <div class="flex items-start gap-4">
              <div class="mt-1">
                <CheckCircle2 class="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 class="font-semibold text-lg">Quick Approval</h3>
                <p class="text-gray-600">Get pre-approved in minutes and shop with confidence.</p>
              </div>
            </div>
            <div class="flex items-start gap-4">
              <div class="mt-1">
                <CheckCircle2 class="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 class="font-semibold text-lg">Flexible Terms</h3>
                <p class="text-gray-600">Choose repayment terms up to 72 months to fit your budget.</p>
              </div>
            </div>
          </div>
        </div>
        <div class="bg-gray-50 p-6 rounded-lg">
          <Calculator />
        </div>
      </div>

      <div class="mt-16">
        <h2 class="text-3xl font-semibold mb-8">Available Auto Loan Options</h2>
        <div class="grid md:grid-cols-3 gap-8">
          <div class="p-6 bg-white rounded-lg shadow-sm">
            <Car class="w-8 h-8 text-primary mb-4" />
            <h3 class="font-semibold text-lg mb-2">New Car Loans</h3>
            <p class="text-gray-600">Finance your brand new vehicle with our best rates.</p>
            <ul class="mt-4 space-y-2 text-sm text-gray-600">
              <li class="flex items-center gap-2">
                <CircleDot class="w-4 h-4 text-primary" />
                <span>Rates from 6.49% APR</span>
              </li>
              <li class="flex items-center gap-2">
                <CircleDot class="w-4 h-4 text-primary" />
                <span>Up to 90% financing</span>
              </li>
            </ul>
          </div>
          <div class="p-6 bg-white rounded-lg shadow-sm">
            <CarTaxiFront class="w-8 h-8 text-primary mb-4" />
            <h3 class="font-semibold text-lg mb-2">Used Car Loans</h3>
            <p class="text-gray-600">Great rates for pre-owned vehicles up to 7 years old.</p>
            <ul class="mt-4 space-y-2 text-sm text-gray-600">
              <li class="flex items-center gap-2">
                <CircleDot class="w-4 h-4 text-primary" />
                <span>Competitive rates</span>
              </li>
              <li class="flex items-center gap-2">
                <CircleDot class="w-4 h-4 text-primary" />
                <span>Flexible down payments</span>
              </li>
            </ul>
          </div>
          <div class="p-6 bg-white rounded-lg shadow-sm">
            <Repeat class="w-8 h-8 text-primary mb-4" />
            <h3 class="font-semibold text-lg mb-2">Refinancing</h3>
            <p class="text-gray-600">Lower your current auto loan payments.</p>
            <ul class="mt-4 space-y-2 text-sm text-gray-600">
              <li class="flex items-center gap-2">
                <CircleDot class="w-4 h-4 text-primary" />
                <span>Lower your rate</span>
              </li>
              <li class="flex items-center gap-2">
                <CircleDot class="w-4 h-4 text-primary" />
                <span>Adjust your term</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div class="mt-16">
        <h2 class="text-3xl font-semibold mb-8">How to Apply</h2>
        <div class="relative">
          <div class="absolute top-0 left-1/2 h-full w-px bg-gray-200 -translate-x-1/2 md:block hidden"></div>
          <div class="space-y-12">
            <div class="grid md:grid-cols-2 gap-8">
              <div class="md:text-right space-y-2">
                <div class="inline-flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white font-semibold">1</div>
                <h3 class="text-lg font-semibold">Check Your Rate</h3>
                <p class="text-gray-600">Get pre-qualified without impacting your credit score</p>
              </div>
              <div></div>
            </div>
            <div class="grid md:grid-cols-2 gap-8">
              <div></div>
              <div class="space-y-2">
                <div class="inline-flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white font-semibold">2</div>
                <h3 class="text-lg font-semibold">Choose Your Vehicle</h3>
                <p class="text-gray-600">Shop with confidence knowing your budget</p>
              </div>
            </div>
            <div class="grid md:grid-cols-2 gap-8">
              <div class="md:text-right space-y-2">
                <div class="inline-flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white font-semibold">3</div>
                <h3 class="text-lg font-semibold">Submit Documents</h3>
                <p class="text-gray-600">Complete your application with required documentation</p>
              </div>
              <div></div>
            </div>
            <div class="grid md:grid-cols-2 gap-8">
              <div></div>
              <div class="space-y-2">
                <div class="inline-flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white font-semibold">4</div>
                <h3 class="text-lg font-semibold">Get Approved</h3>
                <p class="text-gray-600">Receive your funds and drive away in your new car</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="mt-16">
        <NuxtLink to="/apply-loan?type=auto" class="inline-flex items-center justify-center px-6 py-3 text-base font-medium text-white bg-primary hover:bg-primary/90 border border-transparent rounded-md transition-colors">
          Start Your Application
        </NuxtLink>
      </div>
    </div>

    <FAQs />
  </div>
</template>

<script setup>
import Calculator from '~/components/loans/Calculator.vue'
import FAQs from '~/components/loans/FAQs.vue'
import Breadcrumb from '~/components/ui/breadcrumb/Breadcrumb.vue'
import { CheckCircle2, CircleDot, Car, CarTaxiFront, Repeat } from 'lucide-vue-next'
</script>