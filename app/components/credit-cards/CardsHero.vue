<template>
  <section class="bg-gray-100">
    <div class="mx-auto max-w-7xl px-6 py-14">
      <h1 class="text-[30px] md:text-[42px] font-semibold text-gray-900">Credit Cards</h1>
      <p class="mt-3 max-w-3xl text-[15px] text-gray-600">Explore our card lineup, compare benefits, and find the card that fits your lifestyle.</p>
      <div class="mt-6 flex flex-wrap items-center gap-3 text-[13px]">
        <button v-for="tab in tabs" :key="tab" class="rounded-full border bg-white px-4 py-2 text-gray-700 hover:bg-gray-50">
          {{ tab }}
        </button>
      </div>
    </div>
  </section>
</template>

<script setup>
const tabs = ['Cashback', 'Travel', 'No Annual Fee', 'Student', 'Business']
</script>

