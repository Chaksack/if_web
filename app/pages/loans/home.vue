<template>
  <div>
    <Breadcrumb :items="[
      { name: 'Loans', href: '/loans' },
      { name: 'Home Loans', href: '/loans/home' }
    ]" />
    
    <div class="relative">
      <div class="bg-primary/10 py-24">
        <div class="mx-auto max-w-7xl px-6">
          <h1 class="text-4xl font-bold mb-4">Home Loans</h1>
          <p class="text-xl text-gray-600 max-w-2xl">Make your dream home a reality with our competitive mortgage solutions. Our expert team will guide you through every step of the home buying process.</p>
        </div>
      </div>
    </div>

    <div class="mx-auto max-w-7xl px-6 py-16">
      <div class="grid md:grid-cols-2 gap-12">
        <div class="space-y-6">
          <h2 class="text-3xl font-semibold">Why Choose Our Home Loan?</h2>
          <div class="space-y-4">
            <div class="flex items-start gap-4">
              <div class="mt-1">
                <CheckCircle2 class="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 class="font-semibold text-lg">Competitive Interest Rates</h3>
                <p class="text-gray-600">Fixed rates starting from 5.99% APR with flexible terms.</p>
              </div>
            </div>
            <div class="flex items-start gap-4">
              <div class="mt-1">
                <CheckCircle2 class="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 class="font-semibold text-lg">Low Down Payment Options</h3>
                <p class="text-gray-600">Down payments as low as 10% for qualified buyers.</p>
              </div>
            </div>
            <div class="flex items-start gap-4">
              <div class="mt-1">
                <CheckCircle2 class="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 class="font-semibold text-lg">Expert Support</h3>
                <p class="text-gray-600">Dedicated mortgage advisors to guide you through the process.</p>
              </div>
            </div>
          </div>
        </div>
        <div class="bg-gray-50 p-6 rounded-lg">
          <Calculator />
        </div>
      </div>

      <div class="mt-16">
        <h2 class="text-3xl font-semibold mb-8">Available Home Loan Options</h2>
        <div class="grid md:grid-cols-3 gap-8">
          <div class="p-6 bg-white rounded-lg shadow-sm">
            <Home class="w-8 h-8 text-primary mb-4" />
            <h3 class="font-semibold text-lg mb-2">First-Time Buyer</h3>
            <p class="text-gray-600">Special rates and support for first-time homeowners.</p>
            <ul class="mt-4 space-y-2 text-sm text-gray-600">
              <li class="flex items-center gap-2">
                <CircleDot class="w-4 h-4 text-primary" />
                <span>Lower down payment requirements</span>
              </li>
              <li class="flex items-center gap-2">
                <CircleDot class="w-4 h-4 text-primary" />
                <span>Flexible credit criteria</span>
              </li>
            </ul>
          </div>
          <div class="p-6 bg-white rounded-lg shadow-sm">
            <HomeCheck class="w-8 h-8 text-primary mb-4" />
            <h3 class="font-semibold text-lg mb-2">Home Purchase</h3>
            <p class="text-gray-600">Standard home purchase loans with competitive rates.</p>
            <ul class="mt-4 space-y-2 text-sm text-gray-600">
              <li class="flex items-center gap-2">
                <CircleDot class="w-4 h-4 text-primary" />
                <span>Fixed & variable rates</span>
              </li>
              <li class="flex items-center gap-2">
                <CircleDot class="w-4 h-4 text-primary" />
                <span>Terms up to 30 years</span>
              </li>
            </ul>
          </div>
          <div class="p-6 bg-white rounded-lg shadow-sm">
            <Hammer class="w-8 h-8 text-primary mb-4" />
            <h3 class="font-semibold text-lg mb-2">Construction Loan</h3>
            <p class="text-gray-600">Finance your home construction project.</p>
            <ul class="mt-4 space-y-2 text-sm text-gray-600">
              <li class="flex items-center gap-2">
                <CircleDot class="w-4 h-4 text-primary" />
                <span>Stage-based disbursement</span>
              </li>
              <li class="flex items-center gap-2">
                <CircleDot class="w-4 h-4 text-primary" />
                <span>Interest-only during construction</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div class="mt-16">
        <h2 class="text-3xl font-semibold mb-8">Application Process</h2>
        <div class="relative">
          <div class="absolute top-0 left-1/2 h-full w-px bg-gray-200 -translate-x-1/2 md:block hidden"></div>
          <div class="space-y-12">
            <div class="grid md:grid-cols-2 gap-8">
              <div class="md:text-right space-y-2">
                <div class="inline-flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white font-semibold">1</div>
                <h3 class="text-lg font-semibold">Initial Consultation</h3>
                <p class="text-gray-600">Meet with our mortgage advisor to discuss your needs and options</p>
              </div>
              <div></div>
            </div>
            <div class="grid md:grid-cols-2 gap-8">
              <div></div>
              <div class="space-y-2">
                <div class="inline-flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white font-semibold">2</div>
                <h3 class="text-lg font-semibold">Document Submission</h3>
                <p class="text-gray-600">Provide required documentation for loan assessment</p>
              </div>
            </div>
            <div class="grid md:grid-cols-2 gap-8">
              <div class="md:text-right space-y-2">
                <div class="inline-flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white font-semibold">3</div>
                <h3 class="text-lg font-semibold">Property Valuation</h3>
                <p class="text-gray-600">Professional assessment of the property value</p>
              </div>
              <div></div>
            </div>
            <div class="grid md:grid-cols-2 gap-8">
              <div></div>
              <div class="space-y-2">
                <div class="inline-flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white font-semibold">4</div>
                <h3 class="text-lg font-semibold">Loan Approval</h3>
                <p class="text-gray-600">Final review and loan approval process</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="mt-16">
        <Button size="lg" class="w-full md:w-auto">Start Your Application</Button>
      </div>
    </div>

    <FAQs />
  </div>
</template>

<script setup>
import { Button } from '~/components/ui/button'
import Calculator from '~/components/loans/Calculator.vue'
import FAQs from '~/components/loans/FAQs.vue'
import Breadcrumb from '~/components/ui/breadcrumb/Breadcrumb.vue'
import { CheckCircle2, CircleDot, Home, HomeCheck, Hammer } from 'lucide-vue-next'
</script>