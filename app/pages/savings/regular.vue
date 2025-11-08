<template>
  <div>
    <!-- Hero Section -->
    <section class="bg-gradient-to-br from-blue-50 to-indigo-50">
      <div class="mx-auto max-w-7xl px-6 py-16 md:py-20">
        <div class="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h1 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Regular Savings Account
            </h1>
            <p class="text-lg text-gray-600 mb-6">
              Start your savings journey with our flexible regular savings account. Earn competitive interest while maintaining easy access to your funds.
            </p>
            <div class="flex flex-col sm:flex-row gap-4">
              <NuxtLink to="/open-account?type=regular" class="flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-md hover:bg-primary/90">
                Open Account
                <ArrowRight class="w-4 h-4" />
              </NuxtLink>
              <Button variant="outline" size="lg">
                Calculate Earnings
              </Button>
            </div>
          </div>
          <div class="relative">
            <div class="aspect-square w-full max-w-md mx-auto bg-white rounded-full flex items-center justify-center shadow-lg">
              <PiggyBank class="w-32 h-32 text-primary" />
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Key Features -->
    <section class="bg-white py-16">
      <div class="mx-auto max-w-7xl px-6">
        <h2 class="text-2xl font-bold text-center mb-12">Key Features & Benefits</h2>
        <div class="grid md:grid-cols-3 gap-8">
          <div class="text-center p-6">
            <div class="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Percent class="w-8 h-8 text-primary" />
            </div>
            <h3 class="font-semibold mb-2">Competitive Interest</h3>
            <p class="text-gray-600">Earn 2.5% annual interest on your savings, calculated daily and paid monthly.</p>
          </div>
          <div class="text-center p-6">
            <div class="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Zap class="w-8 h-8 text-primary" />
            </div>
            <h3 class="font-semibold mb-2">Instant Access</h3>
            <p class="text-gray-600">Access your funds anytime through ATMs, online banking, or our mobile app.</p>
          </div>
          <div class="text-center p-6">
            <div class="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield class="w-8 h-8 text-primary" />
            </div>
            <h3 class="font-semibold mb-2">No Minimum Balance</h3>
            <p class="text-gray-600">Start saving with any amount - no minimum balance requirements or monthly fees.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Account Details -->
    <section class="bg-gray-50 py-16">
      <div class="mx-auto max-w-4xl px-6">
        <h2 class="text-2xl font-bold text-center mb-12">Account Details</h2>
        <div class="bg-white rounded-lg shadow-sm border p-8">
          <div class="grid md:grid-cols-2 gap-8">
            <div>
              <h3 class="font-semibold mb-4">Account Features</h3>
              <ul class="space-y-3">
                <li class="flex items-center gap-3">
                  <CheckCircle2 class="w-5 h-5 text-primary" />
                  <span>2.5% annual interest rate</span>
                </li>
                <li class="flex items-center gap-3">
                  <CheckCircle2 class="w-5 h-5 text-primary" />
                  <span>No minimum balance required</span>
                </li>
                <li class="flex items-center gap-3">
                  <CheckCircle2 class="w-5 h-5 text-primary" />
                  <span>No monthly maintenance fees</span>
                </li>
                <li class="flex items-center gap-3">
                  <CheckCircle2 class="w-5 h-5 text-primary" />
                  <span>Free debit card included</span>
                </li>
                <li class="flex items-center gap-3">
                  <CheckCircle2 class="w-5 h-5 text-primary" />
                  <span>Online and mobile banking</span>
                </li>
                <li class="flex items-center gap-3">
                  <CheckCircle2 class="w-5 h-5 text-primary" />
                  <span>FDIC insured up to GHS 250,000</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 class="font-semibold mb-4">Requirements</h3>
              <ul class="space-y-3">
                <li class="flex items-center gap-3">
                  <Dot class="w-5 h-5 text-gray-400" />
                  <span>Valid government ID</span>
                </li>
                <li class="flex items-center gap-3">
                  <Dot class="w-5 h-5 text-gray-400" />
                  <span>Proof of address</span>
                </li>
                <li class="flex items-center gap-3">
                  <Dot class="w-5 h-5 text-gray-400" />
                  <span>Minimum age of 18 years</span>
                </li>
                <li class="flex items-center gap-3">
                  <Dot class="w-5 h-5 text-gray-400" />
                  <span>Initial deposit (any amount)</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="bg-primary py-16">
      <div class="mx-auto max-w-4xl px-6 text-center">
        <h2 class="text-2xl font-bold text-white mb-4">Ready to Start Saving?</h2>
        <p class="text-primary-foreground/80 mb-8">Open your regular savings account today and start earning competitive interest on your savings.</p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <NuxtLink to="/open-account?type=regular" class="inline-flex items-center gap-2 bg-white text-primary px-6 py-3 rounded-md hover:bg-gray-50 font-semibold">
            Open Account Now
          </NuxtLink>
          <NuxtLink to="/contact" class="inline-flex items-center gap-2 border-2 border-white text-white px-6 py-3 rounded-md hover:bg-white hover:text-primary font-semibold">
            Schedule a Consultation
          </NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { 
  PiggyBank, 
  ArrowRight, 
  Percent, 
  Zap, 
  Shield,
  CheckCircle2,
  Dot
} from 'lucide-vue-next'
import Button from '~/components/ui/button/Button.vue'

// Meta tags
useHead({
  title: 'Regular Savings Account - Innovative Finance',
  meta: [
    {
      name: 'description',
      content: 'Open a regular savings account with Innovative Finance. Earn 2.5% annual interest with no minimum balance requirements and free access to your funds anytime.'
    }
  ]
})
</script>