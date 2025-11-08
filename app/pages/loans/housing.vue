<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Hero Section -->
    <section class="bg-white">
      <div class="mx-auto max-w-7xl px-6 py-16">
        <div class="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 class="text-4xl font-bold text-gray-900 mb-6">Housing Microloans</h1>
            <p class="text-lg text-gray-600 mb-8">
              Affordable financing for home improvements, repairs, and basic housing needs. 
              Build better homes for your family with our flexible housing loan solutions.
            </p>
            <div class="flex gap-4">
              <NuxtLink to="/apply-loan-guest" class="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-md hover:bg-primary/90">
                Apply Now
              </NuxtLink>
              <NuxtLink to="/contact" class="inline-flex items-center gap-2 border border-gray-300 text-gray-700 px-6 py-3 rounded-md hover:bg-gray-50">
                Get Quote
              </NuxtLink>
            </div>
          </div>
          <div class="aspect-[4/3] rounded-lg overflow-hidden">
            <img src="https://images.unsplash.com/photo-1560448204-e1a3ecbb4d63?q=80&w=800&auto=format&fit=crop" alt="Home improvement" class="w-full h-full object-cover">
          </div>
        </div>
      </div>
    </section>

    <!-- What You Can Finance -->
    <section class="py-16">
      <div class="mx-auto max-w-7xl px-6">
        <h2 class="text-3xl font-bold text-center mb-12">What You Can Finance</h2>
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div class="text-center p-6 bg-white rounded-lg shadow-sm">
            <div class="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Hammer class="w-8 h-8 text-blue-600" />
            </div>
            <h3 class="text-xl font-semibold mb-3">Home Repairs</h3>
            <p class="text-gray-600">Roofing, plumbing, electrical work, and structural repairs to maintain your home.</p>
          </div>
          <div class="text-center p-6 bg-white rounded-lg shadow-sm">
            <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Paintbrush class="w-8 h-8 text-green-600" />
            </div>
            <h3 class="text-xl font-semibold mb-3">Renovations</h3>
            <p class="text-gray-600">Kitchen upgrades, bathroom renovations, and interior improvements for better living.</p>
          </div>
          <div class="text-center p-6 bg-white rounded-lg shadow-sm">
            <div class="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Zap class="w-8 h-8 text-purple-600" />
            </div>
            <h3 class="text-xl font-semibold mb-3">Utilities</h3>
            <p class="text-gray-600">Solar panels, water systems, and energy-efficient appliances for modern living.</p>
          </div>
          <div class="text-center p-6 bg-white rounded-lg shadow-sm">
            <div class="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield class="w-8 h-8 text-yellow-600" />
            </div>
            <h3 class="text-xl font-semibold mb-3">Security</h3>
            <p class="text-gray-600">Gates, fencing, security doors, and safety improvements for family protection.</p>
          </div>
          <div class="text-center p-6 bg-white rounded-lg shadow-sm">
            <div class="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Droplets class="w-8 h-8 text-red-600" />
            </div>
            <h3 class="text-xl font-semibold mb-3">Water & Sanitation</h3>
            <p class="text-gray-600">Borehole drilling, water tanks, septic systems, and sanitation facilities.</p>
          </div>
          <div class="text-center p-6 bg-white rounded-lg shadow-sm">
            <div class="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <TreePine class="w-8 h-8 text-orange-600" />
            </div>
            <h3 class="text-xl font-semibold mb-3">Landscaping</h3>
            <p class="text-gray-600">Compound development, gardens, and outdoor living spaces for family enjoyment.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Loan Details -->
    <section class="py-16 bg-white">
      <div class="mx-auto max-w-7xl px-6">
        <div class="grid lg:grid-cols-2 gap-12">
          <div>
            <h2 class="text-3xl font-bold mb-6">Housing Loan Features</h2>
            <div class="space-y-6">
              <div class="flex items-start gap-4">
                <CheckCircle2 class="w-6 h-6 text-green-600 mt-1" />
                <div>
                  <h3 class="font-semibold">Loan Amount</h3>
                  <p class="text-gray-600">GHS 500 - 50,000 for various housing improvement projects</p>
                </div>
              </div>
              <div class="flex items-start gap-4">
                <CheckCircle2 class="w-6 h-6 text-green-600 mt-1" />
                <div>
                  <h3 class="font-semibold">Flexible Terms</h3>
                  <p class="text-gray-600">6-36 months repayment with affordable monthly installments</p>
                </div>
              </div>
              <div class="flex items-start gap-4">
                <CheckCircle2 class="w-6 h-6 text-green-600 mt-1" />
                <div>
                  <h3 class="font-semibold">Competitive Rates</h3>
                  <p class="text-gray-600">Starting from 14% per annum for housing improvements</p>
                </div>
              </div>
              <div class="flex items-start gap-4">
                <CheckCircle2 class="w-6 h-6 text-green-600 mt-1" />
                <div>
                  <h3 class="font-semibold">Quick Approval</h3>
                  <p class="text-gray-600">Fast processing within 2-3 business days for urgent repairs</p>
                </div>
              </div>
              <div class="flex items-start gap-4">
                <CheckCircle2 class="w-6 h-6 text-green-600 mt-1" />
                <div>
                  <h3 class="font-semibold">No Collateral</h3>
                  <p class="text-gray-600">Unsecured loans based on your income and creditworthiness</p>
                </div>
              </div>
            </div>
          </div>
          <div class="bg-gray-50 rounded-lg p-8">
            <h3 class="text-xl font-semibold mb-4">Application Requirements</h3>
            <ul class="space-y-3 text-gray-600 mb-6">
              <li class="flex items-start gap-2">
                <FileText class="w-4 h-4 text-primary mt-1" />
                <span>Proof of ownership or lease agreement</span>
              </li>
              <li class="flex items-start gap-2">
                <FileText class="w-4 h-4 text-primary mt-1" />
                <span>Income verification documents</span>
              </li>
              <li class="flex items-start gap-2">
                <FileText class="w-4 h-4 text-primary mt-1" />
                <span>Project cost estimates or quotes</span>
              </li>
              <li class="flex items-start gap-2">
                <FileText class="w-4 h-4 text-primary mt-1" />
                <span>Identification documents</span>
              </li>
              <li class="flex items-start gap-2">
                <FileText class="w-4 h-4 text-primary mt-1" />
                <span>Recent passport photographs</span>
              </li>
            </ul>

            <div class="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 class="font-semibold text-blue-900 mb-2">Free Consultation</h4>
              <p class="text-sm text-blue-800">Our housing finance experts can help you plan your project and determine the right loan amount for your needs.</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Process -->
    <section class="py-16">
      <div class="mx-auto max-w-7xl px-6">
        <h2 class="text-3xl font-bold text-center mb-12">Simple Application Process</h2>
        <div class="grid md:grid-cols-4 gap-8">
          <div class="text-center">
            <div class="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <span class="text-xl font-bold text-primary">1</span>
            </div>
            <h3 class="font-semibold mb-2">Plan Your Project</h3>
            <p class="text-sm text-gray-600">Define your housing improvement needs and get cost estimates</p>
          </div>
          <div class="text-center">
            <div class="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <span class="text-xl font-bold text-primary">2</span>
            </div>
            <h3 class="font-semibold mb-2">Apply Online</h3>
            <p class="text-sm text-gray-600">Submit your application with required documents through our portal</p>
          </div>
          <div class="text-center">
            <div class="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <span class="text-xl font-bold text-primary">3</span>
            </div>
            <h3 class="font-semibold mb-2">Get Approved</h3>
            <p class="text-sm text-gray-600">Receive approval decision within 2-3 business days</p>
          </div>
          <div class="text-center">
            <div class="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <span class="text-xl font-bold text-primary">4</span>
            </div>
            <h3 class="font-semibold mb-2">Start Building</h3>
            <p class="text-sm text-gray-600">Receive funds and begin your home improvement project</p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="py-16 bg-primary">
      <div class="mx-auto max-w-4xl px-6 text-center">
        <h2 class="text-3xl font-bold text-white mb-4">Ready to Improve Your Home?</h2>
        <p class="text-xl text-primary-foreground/90 mb-8">Apply for a housing microloan today and create the home your family deserves.</p>
        <NuxtLink to="/apply-loan-guest" class="inline-flex items-center gap-2 bg-white text-primary px-8 py-4 rounded-md hover:bg-gray-50 font-semibold">
          Apply for Housing Loan
        </NuxtLink>
      </div>
    </section>
  </div>
</template>

<script setup>
import { 
  Hammer, 
  Paintbrush, 
  Zap, 
  Shield, 
  Droplets, 
  TreePine, 
  CheckCircle2, 
  FileText 
} from 'lucide-vue-next'

// Meta tags
useHead({
  title: 'Housing Microloans - Innovative Finance',
  meta: [
    {
      name: 'description',
      content: 'Housing microloans for home improvements, repairs, and basic housing needs. Affordable financing for better homes in Ghana.'
    }
  ]
})
</script>