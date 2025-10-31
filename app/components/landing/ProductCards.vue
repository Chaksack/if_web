<template>
  <section class="bg-white">
    <div class="mx-auto max-w-6xl px-4 py-12">
      <h2 class="text-center text-gray-700">Presenting products and services that are right for you</h2>
      <div class="mt-8 grid gap-6 sm:grid-cols-2 md:grid-cols-4">
        <div v-for="card in cards" :key="card.title" class="rounded-lg border bg-white p-5 shadow-sm hover:shadow">
          <div class="text-red-500 text-2xl">{{ card.icon }}</div>
          <h3 class="mt-4 font-semibold text-gray-900">{{ card.title }}</h3>
          <p class="mt-2 text-sm text-gray-600">{{ card.desc }}</p>
          <div class="mt-4">
            <a href="#" class="text-sm font-medium text-gray-900 hover:underline">{{ card.cta }}</a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const cards = [
  { icon: '🏦', title: 'Online Business', desc: 'Explore the power of simpler and smarter banking.', cta: 'Apply online' },
  { icon: '🧭', title: 'Business Plan', desc: 'From shares to shopping centers and term deposits.', cta: 'Take the first step' },
  { icon: '📱', title: 'Mobile Bank', desc: 'The power of simpler and smarter banking.', cta: 'Find out more' },
  { icon: '🛟', title: 'Online Deposit', desc: 'Bank online with over 250 services.', cta: 'Learn more' },
]
</script>

