<template>
  <section class="bg-white">
    <div class="mx-auto max-w-7xl px-6 py-12">
      <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <article v-for="loan in loans" :key="loan.title" class="rounded-lg border bg-white p-6 shadow-sm hover:shadow">
          <div class="h-40 w-full rounded-md bg-gray-100"></div>
          <h3 class="mt-5 text-lg font-semibold text-gray-900">{{ loan.title }}</h3>
          <p class="mt-2 text-sm text-gray-600">{{ loan.desc }}</p>
          <ul class="mt-4 space-y-1 text-[13px] text-gray-700">
            <li v-for="f in loan.features" :key="f">• {{ f }}</li>
          </ul>
          <div class="mt-5 flex items-center justify-between">
            <span class="text-[13px] text-gray-500">Interest from {{ loan.rate }}</span>
            <button class="rounded-sm bg-red-500 px-4 py-2 text-[13px] text-white hover:bg-red-600">Apply now</button>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup>
const loans = [
  { 
    title: 'Personal Loan', 
    desc: 'Flexible financing for your personal needs.', 
    rate: '8.99%', 
    features: ['Borrow up to $50,000', 'Flexible repayment terms', 'No prepayment penalties'] 
  },
  { 
    title: 'Business Loan', 
    desc: 'Grow your business with our financing solutions.', 
    rate: '7.49%', 
    features: ['Up to $250,000', 'Competitive rates', 'Fast approval process'] 
  },
  { 
    title: 'Home Loan', 
    desc: 'Make your dream home a reality.', 
    rate: '5.99%', 
    features: ['Low down payment options', 'Fixed & variable rates', 'Expert guidance'] 
  },
  { 
    title: 'Auto Loan', 
    desc: 'Finance your next vehicle purchase.', 
    rate: '6.49%', 
    features: ['New & used vehicles', 'Quick approvals', 'Competitive rates'] 
  },
  { 
    title: 'Education Loan', 
    desc: 'Invest in your future with our education financing.', 
    rate: '4.99%', 
    features: ['Grace period options', 'Flexible repayment plans', 'No collateral required'] 
  },
  { 
    title: 'Equipment Loan', 
    desc: 'Finance equipment for your business growth.', 
    rate: '7.99%', 
    features: ['Up to 100% financing', 'Tax benefits', 'Fast processing'] 
  }
]
</script>