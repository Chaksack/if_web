<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Hero Section -->
    <section class="bg-white">
      <div class="mx-auto max-w-7xl px-6 py-16">
        <div class="text-center">
          <h1 class="text-4xl font-bold text-gray-900 mb-4">Branch Locations</h1>
          <p class="text-lg text-gray-600 mb-8">Find Innovative Finance branches and ATMs near you</p>
        </div>
      </div>
    </section>

    <!-- Coming Soon -->
    <section class="py-16">
      <div class="mx-auto max-w-4xl px-6 text-center">
        <div class="bg-white rounded-lg shadow-sm p-12">
          <div class="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <MapPin class="w-12 h-12 text-primary" />
          </div>
          <h2 class="text-2xl font-bold text-gray-900 mb-4">Branch Locator Coming Soon</h2>
          <p class="text-gray-600 mb-8">We're working on an interactive branch locator to help you find our nearest location and services.</p>
          
          <div class="grid md:grid-cols-3 gap-6 text-left">
            <div class="p-6 bg-gray-50 rounded-lg">
              <h3 class="font-semibold mb-2">Head Office</h3>
              <p class="text-sm text-gray-600 mb-3">
                Innovative Finance HQ<br>
                Ring Road Central<br>
                Accra, Ghana<br>
                +233 123 456 789
              </p>
            </div>
            <div class="p-6 bg-gray-50 rounded-lg">
              <h3 class="font-semibold mb-2">Kumasi Branch</h3>
              <p class="text-sm text-gray-600 mb-3">
                Adum Commercial Area<br>
                Kumasi, Ashanti<br>
                Ghana<br>
                +233 123 456 790
              </p>
            </div>
            <div class="p-6 bg-gray-50 rounded-lg">
              <h3 class="font-semibold mb-2">Tamale Branch</h3>
              <p class="text-sm text-gray-600 mb-3">
                Central Market Area<br>
                Tamale, Northern<br>
                Ghana<br>
                +233 123 456 791
              </p>
            </div>
          </div>

          <div class="mt-8">
            <NuxtLink to="/contact" class="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-md hover:bg-primary/90">
              Contact Us for Directions
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { MapPin } from 'lucide-vue-next'

// Meta tags
useHead({
  title: 'Branch Locations - Innovative Finance',
  meta: [
    {
      name: 'description',
      content: 'Find Innovative Finance branch locations and ATMs across Ghana. Visit us for in-person banking services and support.'
    }
  ]
})
</script>