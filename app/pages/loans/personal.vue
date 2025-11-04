<template>
  <div>
    <Breadcrumb :items="[
      { name: 'Loans', href: '/loans' },
      { name: 'Personal Loans', href: '/loans/personal' }
    ]" />
    
    <div class="relative">
      <div class="bg-primary/10 py-24">
        <div class="mx-auto max-w-7xl px-6">
          <h1 class="text-4xl font-bold mb-4">Personal Loans</h1>
          <p class="text-xl text-gray-600 max-w-2xl">Get the financial flexibility you need with our personal loans. Whether it's for debt consolidation, home improvement, or unexpected expenses, we've got you covered.</p>
        </div>
      </div>
    </div>

    <div class="mx-auto max-w-7xl px-6 py-16">
      <div class="grid md:grid-cols-2 gap-12">
        <div class="space-y-6">
          <h2 class="text-3xl font-semibold">Why Choose Our Personal Loan?</h2>
          <div class="space-y-4">
            <div class="flex items-start gap-4">
              <div class="mt-1">
                <CheckCircle2 class="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 class="font-semibold text-lg">Competitive Interest Rates</h3>
                <p class="text-gray-600">Starting from 8.99% APR, our rates are designed to be affordable and transparent.</p>
              </div>
            </div>
            <div class="flex items-start gap-4">
              <div class="mt-1">
                <CheckCircle2 class="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 class="font-semibold text-lg">Flexible Loan Amounts</h3>
                <p class="text-gray-600">Borrow between GHS 5,000 to GHS 50,000 based on your needs and eligibility.</p>
              </div>
            </div>
            <div class="flex items-start gap-4">
              <div class="mt-1">
                <CheckCircle2 class="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 class="font-semibold text-lg">Convenient Repayment Terms</h3>
                <p class="text-gray-600">Choose repayment terms from 1 to 7 years to suit your financial situation.</p>
              </div>
            </div>
          </div>
        </div>
        <div class="bg-gray-50 p-6 rounded-lg">
          <Calculator />
        </div>
      </div>

      <div class="mt-16 space-y-8">
        <h2 class="text-3xl font-semibold">How to Apply</h2>
        <div class="grid md:grid-cols-3 gap-8">
          <div class="p-6 bg-white rounded-lg shadow-sm">
            <div class="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <ClipboardCheck class="w-6 h-6 text-primary" />
            </div>
            <h3 class="font-semibold text-lg mb-2">1. Check Eligibility</h3>
            <p class="text-gray-600">Verify your eligibility using our quick online assessment tool.</p>
          </div>
          <div class="p-6 bg-white rounded-lg shadow-sm">
            <div class="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <FileText class="w-6 h-6 text-primary" />
            </div>
            <h3 class="font-semibold text-lg mb-2">2. Submit Documents</h3>
            <p class="text-gray-600">Upload required documents through our secure online portal.</p>
          </div>
          <div class="p-6 bg-white rounded-lg shadow-sm">
            <div class="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <BadgeCheck class="w-6 h-6 text-primary" />
            </div>
            <h3 class="font-semibold text-lg mb-2">3. Get Approved</h3>
            <p class="text-gray-600">Receive your loan decision within 24 hours of document verification.</p>
          </div>
        </div>
      </div>

      <div class="mt-16">
        <Button size="lg" class="w-full md:w-auto">Apply Now</Button>
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
import { CheckCircle2, ClipboardCheck, FileText, BadgeCheck } from 'lucide-vue-next'
</script>