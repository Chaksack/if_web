<template>
  <section class="bg-white">
    <div class="mx-auto max-w-3xl px-6 py-12">
      <h2 class="text-xl font-semibold text-gray-900">Frequently Asked Questions</h2>
      <div class="mt-6 divide-y rounded-md border bg-white">
        <details v-for="q in faqs" :key="q.q" class="group">
          <summary class="cursor-pointer list-none px-4 py-3 text-[15px] font-medium text-gray-900 hover:bg-gray-50">{{ q.q }}</summary>
          <div class="px-4 pb-4 pt-2 text-[14px] text-gray-600">{{ q.a }}</div>
        </details>
      </div>
    </div>
  </section>
</template>

<script setup>
const faqs = [
  { q: 'How do I apply for a loan?', a: 'Select your desired loan type and click Apply now to start the secure application process.' },
  { q: 'What documents do I need?', a: 'Required documents vary by loan type but typically include proof of income, ID, and financial statements.' },
  { q: 'How long is the approval process?', a: 'Most applications are processed within 24-48 hours, with funds available shortly after approval.' },
]
</script>