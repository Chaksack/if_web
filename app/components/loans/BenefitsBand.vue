<template>
  <section class="bg-blue-50">
    <div class="mx-auto max-w-7xl px-6 py-12 grid gap-8 md:grid-cols-3">
      <div v-for="b in benefits" :key="b.title" class="rounded-lg bg-white p-6 shadow-sm">
        <h3 class="text-base font-semibold text-gray-900">{{ b.title }}</h3>
        <p class="mt-2 text-sm text-gray-600">{{ b.desc }}</p>
      </div>
    </div>
  </section>
</template>

<script setup>
const benefits = [
  { title: 'Competitive Rates', desc: 'Get access to market-leading interest rates and transparent pricing.' },
  { title: 'Quick Approvals', desc: 'Fast application process with decisions in as little as 24 hours.' },
  { title: 'Dedicated Support', desc: 'Expert loan officers available to guide you through the process.' },
]
</script>