<template>
  <div>
    <Breadcrumb :items="[
      { name: 'Loans', href: '/loans' },
      { name: 'Education Loans', href: '/loans/education' }
    ]" />
    
    <div class="relative">
      <div class="bg-primary/10 py-24">
        <div class="mx-auto max-w-7xl px-6">
          <h1 class="text-4xl font-bold mb-4">Education Loans</h1>
          <p class="text-xl text-gray-600 max-w-2xl">Invest in your future with our education financing solutions. We offer competitive rates and flexible repayment options for students and parents.</p>
        </div>
      </div>
    </div>

    <div class="mx-auto max-w-7xl px-6 py-16">
      <div class="grid md:grid-cols-2 gap-12">
        <div class="space-y-6">
          <h2 class="text-3xl font-semibold">Why Choose Our Education Loan?</h2>
          <div class="space-y-4">
            <div class="flex items-start gap-4">
              <div class="mt-1">
                <CheckCircle2 class="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 class="font-semibold text-lg">Competitive Interest Rates</h3>
                <p class="text-gray-600">Starting from 4.99% APR with flexible repayment options.</p>
              </div>
            </div>
            <div class="flex items-start gap-4">
              <div class="mt-1">
                <CheckCircle2 class="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 class="font-semibold text-lg">Deferred Payments</h3>
                <p class="text-gray-600">Option to postpone payments until after graduation.</p>
              </div>
            </div>
            <div class="flex items-start gap-4">
              <div class="mt-1">
                <CheckCircle2 class="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 class="font-semibold text-lg">No Collateral Required</h3>
                <p class="text-gray-600">Unsecured loans based on future earning potential.</p>
              </div>
            </div>
          </div>
        </div>
        <div class="bg-gray-50 p-6 rounded-lg">
          <Calculator />
        </div>
      </div>

      <div class="mt-16">
        <h2 class="text-3xl font-semibold mb-8">Education Loan Programs</h2>
        <div class="grid md:grid-cols-3 gap-8">
          <div class="p-6 bg-white rounded-lg shadow-sm">
            <GraduationCap class="w-8 h-8 text-primary mb-4" />
            <h3 class="font-semibold text-lg mb-2">Undergraduate Loans</h3>
            <p class="text-gray-600">Fund your bachelor's degree with flexible terms.</p>
            <ul class="mt-4 space-y-2 text-sm text-gray-600">
              <li class="flex items-center gap-2">
                <CircleDot class="w-4 h-4 text-primary" />
                <span>Lowest rates available</span>
              </li>
              <li class="flex items-center gap-2">
                <CircleDot class="w-4 h-4 text-primary" />
                <span>6-month grace period</span>
              </li>
            </ul>
          </div>
          <div class="p-6 bg-white rounded-lg shadow-sm">
            <Scroll class="w-8 h-8 text-primary mb-4" />
            <h3 class="font-semibold text-lg mb-2">Graduate Loans</h3>
            <p class="text-gray-600">Support for master's and doctoral programs.</p>
            <ul class="mt-4 space-y-2 text-sm text-gray-600">
              <li class="flex items-center gap-2">
                <CircleDot class="w-4 h-4 text-primary" />
                <span>Higher loan limits</span>
              </li>
              <li class="flex items-center gap-2">
                <CircleDot class="w-4 h-4 text-primary" />
                <span>Research funding options</span>
              </li>
            </ul>
          </div>
          <div class="p-6 bg-white rounded-lg shadow-sm">
            <Users class="w-8 h-8 text-primary mb-4" />
            <h3 class="font-semibold text-lg mb-2">Parent Loans</h3>
            <p class="text-gray-600">Help fund your child's education journey.</p>
            <ul class="mt-4 space-y-2 text-sm text-gray-600">
              <li class="flex items-center gap-2">
                <CircleDot class="w-4 h-4 text-primary" />
                <span>Immediate repayment option</span>
              </li>
              <li class="flex items-center gap-2">
                <CircleDot class="w-4 h-4 text-primary" />
                <span>Cosigner release available</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div class="mt-16">
        <h2 class="text-3xl font-semibold mb-8">What's Covered</h2>
        <div class="grid md:grid-cols-4 gap-6">
          <div class="p-4 bg-gray-50 rounded-lg text-center">
            <BookOpen class="w-6 h-6 text-primary mx-auto mb-2" />
            <h3 class="font-semibold">Tuition Fees</h3>
          </div>
          <div class="p-4 bg-gray-50 rounded-lg text-center">
            <Building class="w-6 h-6 text-primary mx-auto mb-2" />
            <h3 class="font-semibold">Housing Costs</h3>
          </div>
          <div class="p-4 bg-gray-50 rounded-lg text-center">
            <BookMarked class="w-6 h-6 text-primary mx-auto mb-2" />
            <h3 class="font-semibold">Study Materials</h3>
          </div>
          <div class="p-4 bg-gray-50 rounded-lg text-center">
            <Laptop class="w-6 h-6 text-primary mx-auto mb-2" />
            <h3 class="font-semibold">Equipment</h3>
          </div>
        </div>
      </div>

      <div class="mt-16 bg-white rounded-lg shadow-sm p-8">
        <h2 class="text-3xl font-semibold mb-6">Application Requirements</h2>
        <div class="grid md:grid-cols-2 gap-8">
          <ul class="space-y-4">
            <li class="flex items-start gap-3">
              <CheckCircle2 class="w-6 h-6 text-primary mt-1" />
              <div>
                <h3 class="font-semibold">Proof of Admission</h3>
                <p class="text-gray-600">Acceptance letter from an accredited institution</p>
              </div>
            </li>
            <li class="flex items-start gap-3">
              <CheckCircle2 class="w-6 h-6 text-primary mt-1" />
              <div>
                <h3 class="font-semibold">Academic Records</h3>
                <p class="text-gray-600">Previous academic transcripts and certificates</p>
              </div>
            </li>
          </ul>
          <ul class="space-y-4">
            <li class="flex items-start gap-3">
              <CheckCircle2 class="w-6 h-6 text-primary mt-1" />
              <div>
                <h3 class="font-semibold">Income Documentation</h3>
                <p class="text-gray-600">Proof of income or cosigner information</p>
              </div>
            </li>
            <li class="flex items-start gap-3">
              <CheckCircle2 class="w-6 h-6 text-primary mt-1" />
              <div>
                <h3 class="font-semibold">Identity Verification</h3>
                <p class="text-gray-600">Government-issued ID and proof of address</p>
              </div>
            </li>
          </ul>
        </div>
      </div>

      <div class="mt-16">
        <NuxtLink to="/apply-loan?type=education" class="inline-flex items-center justify-center px-6 py-3 text-base font-medium text-white bg-primary hover:bg-primary/90 border border-transparent rounded-md transition-colors">
          Apply for Education Loan
        </NuxtLink>
      </div>
    </div>

    <FAQs />
  </div>
</template>

<script setup>
import Calculator from '~/components/loans/Calculator.vue'
import FAQs from '~/components/loans/FAQs.vue'
import { 
  CheckCircle2, 
  CircleDot, 
  GraduationCap, 
  Scroll, 
  Users, 
  BookOpen, 
  Building, 
  BookMarked, 
  Laptop 
} from 'lucide-vue-next'
</script>