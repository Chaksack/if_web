<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Hero Section -->
    <section class="bg-white">
      <div class="mx-auto max-w-7xl px-6 py-16">
        <div class="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 class="text-4xl font-bold text-gray-900 mb-6">Group Lending Solutions</h1>
            <p class="text-lg text-gray-600 mb-8">
              Join a community of entrepreneurs supporting each other's success. Our group lending model 
              provides access to capital with shared responsibility and collective growth.
            </p>
            <div class="flex gap-4">
              <NuxtLink to="/apply-loan-guest" class="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-md hover:bg-primary/90">
                Join a Group
              </NuxtLink>
              <NuxtLink to="/contact" class="inline-flex items-center gap-2 border border-gray-300 text-gray-700 px-6 py-3 rounded-md hover:bg-gray-50">
                Learn More
              </NuxtLink>
            </div>
          </div>
          <div class="aspect-[4/3] rounded-lg overflow-hidden">
            <img src="https://images.unsplash.com/photo-1559136555-9303baea8ebd?q=80&w=800&auto=format&fit=crop" alt="Group of entrepreneurs" class="w-full h-full object-cover">
          </div>
        </div>
      </div>
    </section>

    <!-- How It Works -->
    <section class="py-16">
      <div class="mx-auto max-w-7xl px-6">
        <h2 class="text-3xl font-bold text-center mb-12">How Group Lending Works</h2>
        <div class="grid md:grid-cols-3 gap-8">
          <div class="text-center">
            <div class="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span class="text-xl font-bold text-blue-600">1</span>
            </div>
            <h3 class="text-xl font-semibold mb-3">Form or Join a Group</h3>
            <p class="text-gray-600">Create a group with 3-5 trusted members or join an existing group in your community.</p>
          </div>
          <div class="text-center">
            <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span class="text-xl font-bold text-green-600">2</span>
            </div>
            <h3 class="text-xl font-semibold mb-3">Apply Together</h3>
            <p class="text-gray-600">Submit a collective loan application with shared responsibility and mutual guarantee.</p>
          </div>
          <div class="text-center">
            <div class="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span class="text-xl font-bold text-purple-600">3</span>
            </div>
            <h3 class="text-xl font-semibold mb-3">Grow Together</h3>
            <p class="text-gray-600">Support each other's success and build stronger businesses through collective learning.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Benefits -->
    <section class="py-16 bg-white">
      <div class="mx-auto max-w-7xl px-6">
        <h2 class="text-3xl font-bold text-center mb-12">Benefits of Group Lending</h2>
        <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div class="text-center p-6 rounded-lg border">
            <Users class="w-12 h-12 text-primary mx-auto mb-4" />
            <h3 class="font-semibold mb-2">Community Support</h3>
            <p class="text-sm text-gray-600">Benefit from peer support and shared business knowledge</p>
          </div>
          <div class="text-center p-6 rounded-lg border">
            <Shield class="w-12 h-12 text-green-600 mx-auto mb-4" />
            <h3 class="font-semibold mb-2">Lower Risk</h3>
            <p class="text-sm text-gray-600">Reduced interest rates through collective guarantee</p>
          </div>
          <div class="text-center p-6 rounded-lg border">
            <TrendingUp class="w-12 h-12 text-blue-600 mx-auto mb-4" />
            <h3 class="font-semibold mb-2">Business Growth</h3>
            <p class="text-sm text-gray-600">Learn from successful group members and best practices</p>
          </div>
          <div class="text-center p-6 rounded-lg border">
            <Clock class="w-12 h-12 text-purple-600 mx-auto mb-4" />
            <h3 class="font-semibold mb-2">Quick Processing</h3>
            <p class="text-sm text-gray-600">Faster approval through group verification</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Loan Details -->
    <section class="py-16">
      <div class="mx-auto max-w-7xl px-6">
        <div class="grid lg:grid-cols-2 gap-12">
          <div>
            <h2 class="text-3xl font-bold mb-6">Group Loan Details</h2>
            <div class="space-y-6">
              <div class="flex items-start gap-4">
                <CheckCircle2 class="w-6 h-6 text-green-600 mt-1" />
                <div>
                  <h3 class="font-semibold">Group Size</h3>
                  <p class="text-gray-600">3-5 members per group with similar business profiles</p>
                </div>
              </div>
              <div class="flex items-start gap-4">
                <CheckCircle2 class="w-6 h-6 text-green-600 mt-1" />
                <div>
                  <h3 class="font-semibold">Individual Loan Amount</h3>
                  <p class="text-gray-600">GHS 1,000 - 25,000 per group member</p>
                </div>
              </div>
              <div class="flex items-start gap-4">
                <CheckCircle2 class="w-6 h-6 text-green-600 mt-1" />
                <div>
                  <h3 class="font-semibold">Interest Rate</h3>
                  <p class="text-gray-600">Reduced rates from 10% per annum for group loans</p>
                </div>
              </div>
              <div class="flex items-start gap-4">
                <CheckCircle2 class="w-6 h-6 text-green-600 mt-1" />
                <div>
                  <h3 class="font-semibold">Repayment Term</h3>
                  <p class="text-gray-600">6-18 months with weekly or bi-weekly meetings</p>
                </div>
              </div>
            </div>
          </div>
          <div class="bg-gray-50 rounded-lg p-8">
            <h3 class="text-xl font-semibold mb-4">Group Requirements</h3>
            <ul class="space-y-3 text-gray-600">
              <li class="flex items-start gap-2">
                <CheckCircle2 class="w-4 h-4 text-green-600 mt-1" />
                <span>All members must be local residents</span>
              </li>
              <li class="flex items-start gap-2">
                <CheckCircle2 class="w-4 h-4 text-green-600 mt-1" />
                <span>Each member must have an active business</span>
              </li>
              <li class="flex items-start gap-2">
                <CheckCircle2 class="w-4 h-4 text-green-600 mt-1" />
                <span>Group guarantees each member's loan</span>
              </li>
              <li class="flex items-start gap-2">
                <CheckCircle2 class="w-4 h-4 text-green-600 mt-1" />
                <span>Regular group meetings required</span>
              </li>
              <li class="flex items-start gap-2">
                <CheckCircle2 class="w-4 h-4 text-green-600 mt-1" />
                <span>Financial literacy training participation</span>
              </li>
            </ul>

            <div class="mt-6 p-4 bg-blue-50 border border-blue-200 rounded">
              <h4 class="font-semibold text-blue-900 mb-2">Success Stories</h4>
              <p class="text-sm text-blue-800">"Our group of 5 women traders has grown our businesses by 300% in just one year with group lending support!" - Akosua, Group Leader</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="py-16 bg-primary">
      <div class="mx-auto max-w-4xl px-6 text-center">
        <h2 class="text-3xl font-bold text-white mb-4">Ready to Join a Business Community?</h2>
        <p class="text-xl text-primary-foreground/90 mb-8">Start your group lending journey today and grow your business with community support.</p>
        <div class="flex gap-4 justify-center">
          <NuxtLink to="/apply-loan-guest" class="inline-flex items-center gap-2 bg-white text-primary px-6 py-3 rounded-md hover:bg-gray-50 font-semibold">
            Join a Group
          </NuxtLink>
          <NuxtLink to="/contact" class="inline-flex items-center gap-2 border-2 border-white text-white px-6 py-3 rounded-md hover:bg-white hover:text-primary font-semibold">
            Contact Us
          </NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { Users, Shield, TrendingUp, Clock, CheckCircle2 } from 'lucide-vue-next'

// Meta tags
useHead({
  title: 'Group Lending - Innovative Finance',
  meta: [
    {
      name: 'description',
      content: 'Join our group lending program for community-based microfinance. Lower rates, shared support, and collective business growth.'
    }
  ]
})
</script>