<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Hero Section -->
    <section class="bg-white">
      <div class="mx-auto max-w-7xl px-6 py-16">
        <div class="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 class="text-4xl font-bold text-gray-900 mb-6">Agricultural Finance Solutions</h1>
            <p class="text-lg text-gray-600 mb-8">
              Empowering farmers and agricultural businesses with flexible financing solutions. 
              From seasonal crop loans to equipment financing, we support Ghana's agricultural sector.
            </p>
            <div class="flex gap-4">
              <NuxtLink to="/apply-loan?type=agricultural" class="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-md hover:bg-primary/90">
                Apply Now
              </NuxtLink>
              <NuxtLink to="/contact" class="inline-flex items-center gap-2 border border-gray-300 text-gray-700 px-6 py-3 rounded-md hover:bg-gray-50">
                Contact Us
              </NuxtLink>
            </div>
          </div>
          <div class="aspect-[4/3] rounded-lg overflow-hidden">
            <img src="https://images.unsplash.com/photo-1500937386664-56d1dfef3854?q=80&w=800&auto=format&fit=crop" alt="Agricultural farming" class="w-full h-full object-cover">
          </div>
        </div>
      </div>
    </section>

    <!-- Features -->
    <section class="py-16">
      <div class="mx-auto max-w-7xl px-6">
        <h2 class="text-3xl font-bold text-center mb-12">Agricultural Loan Features</h2>
        <div class="grid md:grid-cols-3 gap-8">
          <div class="text-center">
            <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Wheat class="w-8 h-8 text-green-600" />
            </div>
            <h3 class="text-xl font-semibold mb-3">Seasonal Financing</h3>
            <p class="text-gray-600">Flexible repayment terms aligned with harvest cycles and agricultural seasons.</p>
          </div>
          <div class="text-center">
            <div class="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <DollarSign class="w-8 h-8 text-blue-600" />
            </div>
            <h3 class="text-xl font-semibold mb-3">Competitive Rates</h3>
            <p class="text-gray-600">Low interest rates designed specifically for agricultural businesses and farmers.</p>
          </div>
          <div class="text-center">
            <div class="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users class="w-8 h-8 text-yellow-600" />
            </div>
            <h3 class="text-xl font-semibold mb-3">Expert Support</h3>
            <p class="text-gray-600">Dedicated agricultural finance specialists to guide you through the process.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Loan Details -->
    <section class="py-16 bg-white">
      <div class="mx-auto max-w-7xl px-6">
        <div class="grid lg:grid-cols-2 gap-12">
          <div>
            <h2 class="text-3xl font-bold mb-6">Loan Details</h2>
            <div class="space-y-6">
              <div class="flex items-start gap-4">
                <CheckCircle2 class="w-6 h-6 text-green-600 mt-1" />
                <div>
                  <h3 class="font-semibold">Loan Amount</h3>
                  <p class="text-gray-600">GHS 2,000 - 200,000 depending on your farming needs and capacity</p>
                </div>
              </div>
              <div class="flex items-start gap-4">
                <CheckCircle2 class="w-6 h-6 text-green-600 mt-1" />
                <div>
                  <h3 class="font-semibold">Repayment Terms</h3>
                  <p class="text-gray-600">6-24 months with flexible seasonal repayment options</p>
                </div>
              </div>
              <div class="flex items-start gap-4">
                <CheckCircle2 class="w-6 h-6 text-green-600 mt-1" />
                <div>
                  <h3 class="font-semibold">Interest Rate</h3>
                  <p class="text-gray-600">Starting from 12% per annum for qualified borrowers</p>
                </div>
              </div>
              <div class="flex items-start gap-4">
                <CheckCircle2 class="w-6 h-6 text-green-600 mt-1" />
                <div>
                  <h3 class="font-semibold">Processing Time</h3>
                  <p class="text-gray-600">Quick approval within 3-5 business days</p>
                </div>
              </div>
            </div>
          </div>
          <div class="bg-gray-50 rounded-lg p-8">
            <h3 class="text-xl font-semibold mb-4">What You Can Finance</h3>
            <ul class="space-y-3 text-gray-600">
              <li class="flex items-center gap-2">
                <Sprout class="w-4 h-4 text-green-600" />
                Seeds, fertilizers, and farming inputs
              </li>
              <li class="flex items-center gap-2">
                <Tractor class="w-4 h-4 text-green-600" />
                Agricultural equipment and machinery
              </li>
              <li class="flex items-center gap-2">
                <Home class="w-4 h-4 text-green-600" />
                Farm infrastructure and storage facilities
              </li>
              <li class="flex items-center gap-2">
                <Truck class="w-4 h-4 text-green-600" />
                Transportation for farm produce
              </li>
              <li class="flex items-center gap-2">
                <PiggyBank class="w-4 h-4 text-green-600" />
                Working capital for operations
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="py-16 bg-primary">
      <div class="mx-auto max-w-4xl px-6 text-center">
        <h2 class="text-3xl font-bold text-white mb-4">Ready to Grow Your Agricultural Business?</h2>
        <p class="text-xl text-primary-foreground/90 mb-8">Apply for agricultural financing today and take your farming operations to the next level.</p>
        <NuxtLink to="/apply-loan?type=agricultural" class="inline-flex items-center gap-2 bg-white text-primary px-8 py-4 rounded-md hover:bg-gray-50 font-semibold">
          Apply for Agricultural Loan
        </NuxtLink>
      </div>
    </section>
  </div>
</template>

<script setup>
import { Wheat, DollarSign, Users, CheckCircle2, Sprout, Home, Truck, PiggyBank } from 'lucide-vue-next'

// Meta tags
useHead({
  title: 'Agricultural Finance - Innovative Finance',
  meta: [
    {
      name: 'description',
      content: 'Agricultural financing solutions for farmers and agribusiness. Seasonal loans, equipment financing, and working capital with flexible terms.'
    }
  ]
})
</script>