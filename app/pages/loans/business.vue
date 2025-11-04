<template>
  <div>
    <Breadcrumb :items="[
      { name: 'Loans', href: '/loans' },
      { name: 'Business Loans', href: '/loans/business' }
    ]" />
    
    <div class="relative">
      <div class="bg-primary/10 py-24">
        <div class="mx-auto max-w-7xl px-6">
          <h1 class="text-4xl font-bold mb-4">Business Loans</h1>
          <p class="text-xl text-gray-600 max-w-2xl">Fuel your business growth with our range of business financing solutions. From working capital to expansion funds, we help you achieve your business goals.</p>
        </div>
      </div>
    </div>

    <div class="mx-auto max-w-7xl px-6 py-16">
      <div class="grid md:grid-cols-2 gap-12">
        <div class="space-y-6">
          <h2 class="text-3xl font-semibold">Why Choose Our Business Loan?</h2>
          <div class="space-y-4">
            <div class="flex items-start gap-4">
              <div class="mt-1">
                <CheckCircle2 class="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 class="font-semibold text-lg">Competitive Rates</h3>
                <p class="text-gray-600">Rates starting from 7.49% APR for qualified businesses.</p>
              </div>
            </div>
            <div class="flex items-start gap-4">
              <div class="mt-1">
                <CheckCircle2 class="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 class="font-semibold text-lg">Substantial Funding</h3>
                <p class="text-gray-600">Access up to GHS 250,000 to support your business growth.</p>
              </div>
            </div>
            <div class="flex items-start gap-4">
              <div class="mt-1">
                <CheckCircle2 class="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 class="font-semibold text-lg">Quick Decisions</h3>
                <p class="text-gray-600">Get funding decisions within 48 hours of complete application.</p>
              </div>
            </div>
          </div>
        </div>
        <div class="bg-gray-50 p-6 rounded-lg">
          <Calculator />
        </div>
      </div>

      <div class="mt-16">
        <h2 class="text-3xl font-semibold mb-8">Loan Types</h2>
        <div class="grid md:grid-cols-3 gap-8">
          <div class="p-6 bg-white rounded-lg shadow-sm">
            <Building2 class="w-8 h-8 text-primary mb-4" />
            <h3 class="font-semibold text-lg mb-2">Working Capital</h3>
            <p class="text-gray-600">Short-term funding for day-to-day operations and cash flow management.</p>
          </div>
          <div class="p-6 bg-white rounded-lg shadow-sm">
            <TrendingUp class="w-8 h-8 text-primary mb-4" />
            <h3 class="font-semibold text-lg mb-2">Business Expansion</h3>
            <p class="text-gray-600">Long-term financing for growth initiatives and market expansion.</p>
          </div>
          <div class="p-6 bg-white rounded-lg shadow-sm">
            <Wrench class="w-8 h-8 text-primary mb-4" />
            <h3 class="font-semibold text-lg mb-2">Equipment Financing</h3>
            <p class="text-gray-600">Specific funding for purchasing or upgrading business equipment.</p>
          </div>
        </div>
      </div>

      <div class="mt-16">
        <h2 class="text-3xl font-semibold mb-8">Application Process</h2>
        <div class="grid md:grid-cols-4 gap-8">
          <div class="text-center">
            <div class="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <FileText class="w-6 h-6 text-primary" />
            </div>
            <h3 class="font-semibold mb-2">Submit Application</h3>
            <p class="text-sm text-gray-600">Complete our online business loan application</p>
          </div>
          <div class="text-center">
            <div class="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <FileCheck class="w-6 h-6 text-primary" />
            </div>
            <h3 class="font-semibold mb-2">Document Review</h3>
            <p class="text-sm text-gray-600">We review your business documents</p>
          </div>
          <div class="text-center">
            <div class="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Phone class="w-6 h-6 text-primary" />
            </div>
            <h3 class="font-semibold mb-2">Consultation</h3>
            <p class="text-sm text-gray-600">Discussion with our business loan expert</p>
          </div>
          <div class="text-center">
            <div class="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <BadgeCheck class="w-6 h-6 text-primary" />
            </div>
            <h3 class="font-semibold mb-2">Approval & Funding</h3>
            <p class="text-sm text-gray-600">Get your funds within 48 hours of approval</p>
          </div>
        </div>
      </div>

      <div class="mt-16">
        <Button size="lg" class="w-full md:w-auto">Apply for Business Loan</Button>
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
import { CheckCircle2, Building2, TrendingUp, Wrench, FileText, FileCheck, Phone, BadgeCheck } from 'lucide-vue-next'
</script>