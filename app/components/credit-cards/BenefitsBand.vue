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
  { title: 'Zero Liability Protection', desc: 'You won’t be responsible for unauthorized charges.' },
  { title: 'Contactless Payments', desc: 'Tap-to-pay convenience with enhanced security.' },
  { title: '24/7 Support', desc: 'Dedicated assistance whenever you need it.' },
]
</script>

