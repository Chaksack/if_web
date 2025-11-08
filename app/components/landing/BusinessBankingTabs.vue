<template>
  <section class="bg-gray-50">
    <div class="mx-auto max-w-6xl px-4 py-12">
      <h2 class="text-center text-2xl font-medium text-gray-900">Microfinance Solutions</h2>
      <div class="mt-6 flex flex-wrap items-center justify-center gap-4 text-sm text-gray-600">
        <button v-for="tab in tabs" :key="tab" class="rounded-full border px-4 py-2 hover:bg-white">{{ tab }}</button>
      </div>
      <div class="mt-8 grid gap-8 md:grid-cols-2 md:items-center">
        <div>
          <img class="w-full rounded-lg shadow-sm" src="https://images.unsplash.com/photo-1559526324-4b87b5e36e44?q=80&w=1200&auto=format&fit=crop" alt="microfinance community" />
        </div>
        <div>
          <h3 class="text-xl font-semibold text-gray-900">Transforming lives through financial inclusion</h3>
          <p class="mt-3 text-gray-600">We believe everyone deserves access to financial services. Our microfinance solutions are designed to empower entrepreneurs and strengthen communities.</p>
          <NuxtLink to="/apply-loan-guest" class="mt-6 inline-block rounded-md bg-red-500 px-5 py-2 text-white hover:bg-red-600">Start your journey</NuxtLink>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const tabs = ['Small Business Loans', 'Agricultural Finance', 'Women Entrepreneurs', 'Group Lending', 'Financial Literacy']
</script>

