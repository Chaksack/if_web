<template>
  <section class="bg-gray-50">
    <div class="mx-auto max-w-6xl px-4 py-12">
      <h2 class="text-center text-xl font-medium text-gray-900">Your news and information</h2>
      <div class="mt-8 grid gap-6 sm:grid-cols-2 md:grid-cols-4">
        <article v-for="item in items" :key="item.title" class="overflow-hidden rounded-lg bg-white shadow-sm">
          <img :src="item.img" class="h-36 w-full object-cover" :alt="item.title" />
          <div class="p-4">
            <h3 class="font-medium text-gray-900">{{ item.title }}</h3>
            <p class="mt-2 text-sm text-gray-600">{{ item.desc }}</p>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup>
const items = [
  { img: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=800&auto=format&fit=crop', title: 'When NOT Using Credit Cards Can Hurt You', desc: 'Tips and insights on credit usage.' },
  { img: 'https://images.unsplash.com/photo-1517423440428-a5a00ad493e8?q=80&w=800&auto=format&fit=crop', title: 'Keep Your Children Safe from Financial Fraud', desc: 'Practical safety guidance.' },
  { img: 'https://images.unsplash.com/photo-1517430816045-df4b7de11d1d?q=80&w=800&auto=format&fit=crop', title: "You're Making More Money. Here's How to Save", desc: 'Build a better savings habit.' },
  { img: 'https://images.unsplash.com/photo-1485217988980-11786ced9454?q=80&w=800&auto=format&fit=crop', title: 'Help and guidance: Personal Financial Advice Service', desc: 'Get help from experts.' },
]
</script>

