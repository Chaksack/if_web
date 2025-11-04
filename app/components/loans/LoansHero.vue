<template>
  <section class="bg-gray-100">
    <div class="mx-auto max-w-7xl px-6 py-14">
      <h1 class="text-[30px] md:text-[42px] font-semibold text-gray-900">Loans</h1>
      <p class="mt-3 max-w-3xl text-[15px] text-gray-600">Discover our loan options, compare rates, and find the right financing solution for your needs.</p>
      <div class="mt-6 flex flex-wrap items-center gap-3 text-[13px]">
        <button v-for="tab in tabs" :key="tab" class="rounded-full border bg-white px-4 py-2 text-gray-700 hover:bg-gray-50">
          {{ tab }}
        </button>
      </div>
    </div>
  </section>
</template>

<script setup>
const tabs = ['Personal Loans', 'Business Loans', 'Home Loans', 'Auto Loans', 'Education Loans']
</script>