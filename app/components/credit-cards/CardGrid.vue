<template>
  <section class="bg-white">
    <div class="mx-auto max-w-7xl px-6 py-12">
      <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <article v-for="card in cards" :key="card.title" class="rounded-lg border bg-white p-6 shadow-sm hover:shadow">
          <div class="h-40 w-full rounded-md bg-gray-100"></div>
          <h3 class="mt-5 text-lg font-semibold text-gray-900">{{ card.title }}</h3>
          <p class="mt-2 text-sm text-gray-600">{{ card.desc }}</p>
          <ul class="mt-4 space-y-1 text-[13px] text-gray-700">
            <li v-for="f in card.features" :key="f">• {{ f }}</li>
          </ul>
          <div class="mt-5 flex items-center justify-between">
            <span class="text-[13px] text-gray-500">APR from {{ card.apr }}</span>
            <button class="rounded-sm bg-red-500 px-4 py-2 text-[13px] text-white hover:bg-red-600">Apply now</button>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup>
const cards = [
  { title: 'Alister Cashback', desc: 'Earn cash rewards on daily purchases.', apr: '13.99%', features: ['1.5% cashback on all purchases', 'No annual fee', 'Fraud protection'] },
  { title: 'Alister Travel', desc: 'Miles and perks for frequent travelers.', apr: '15.49%', features: ['2x miles on travel & dining', 'Lounge access', 'No FX fees'] },
  { title: 'Alister Student', desc: 'Build credit responsibly with guidance.', apr: '17.99%', features: ['Cashback on categories', 'Credit education', 'No annual fee'] },
]
</script>

