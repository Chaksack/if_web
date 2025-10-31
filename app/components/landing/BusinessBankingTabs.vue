<template>
  <section class="bg-gray-50">
    <div class="mx-auto max-w-6xl px-4 py-12">
      <h2 class="text-center text-2xl font-medium text-gray-900">Business Banking</h2>
      <div class="mt-6 flex flex-wrap items-center justify-center gap-4 text-sm text-gray-600">
        <button v-for="tab in tabs" :key="tab" class="rounded-full border px-4 py-2 hover:bg-white">{{ tab }}</button>
      </div>
      <div class="mt-8 grid gap-8 md:grid-cols-2 md:items-center">
        <div>
          <img class="w-full rounded-lg shadow-sm" src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=1200&auto=format&fit=crop" alt="colleagues" />
        </div>
        <div>
          <h3 class="text-xl font-semibold text-gray-900">Nothing is impossible. We can help you achieve your goals!</h3>
          <p class="mt-3 text-gray-600">Find out more about our approach and what it means for you.</p>
          <button class="mt-6 rounded-md bg-red-500 px-5 py-2 text-white hover:bg-red-600">Learn more</button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const tabs = ['Investing Basics', 'Find a Credit Card', 'Payment Technologies', 'Card Benefits', 'Digital Wallets']
</script>

