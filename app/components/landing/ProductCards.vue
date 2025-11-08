<template>
  <section class="bg-white">
    <div class="mx-auto max-w-6xl px-4 py-12">
      <h2 class="text-center text-gray-700">Microfinance solutions tailored for entrepreneurs and small businesses</h2>
      <div class="mt-8 grid gap-6 sm:grid-cols-2 md:grid-cols-4">
        <div v-for="card in cards" :key="card.title" class="rounded-lg border bg-white p-5 shadow-sm hover:shadow">
          <div class="text-red-500 text-2xl">{{ card.icon }}</div>
          <h3 class="mt-4 font-semibold text-gray-900">{{ card.title }}</h3>
          <p class="mt-2 text-sm text-gray-600">{{ card.desc }}</p>
          <div class="mt-4">
            <NuxtLink :to="card.link" class="text-sm font-medium text-gray-900 hover:underline">{{ card.cta }}</NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const cards = [
  { icon: '💼', title: 'Business Microloans', desc: 'Quick funding for small businesses and entrepreneurs to grow and thrive.', cta: 'Apply now', link: '/apply-loan-guest' },
  { icon: '🌾', title: 'Agricultural Finance', desc: 'Seasonal loans for farmers and agricultural cooperatives.', cta: 'Get funding', link: '/loans/agricultural' },
  { icon: '👥', title: 'Group Lending', desc: 'Community-based lending with shared responsibility and support.', cta: 'Join a group', link: '/loans/group' },
  { icon: '🏠', title: 'Housing Microloans', desc: 'Small loans for home improvements and basic housing needs.', cta: 'Learn more', link: '/loans/housing' },
]
</script>

