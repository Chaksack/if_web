<script setup lang="ts">
import { ref, computed } from 'vue'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { Label } from '../ui/label'

const loanAmount = ref(10000)
const interestRate = ref(8.99)
const loanTerm = ref(36)

const monthlyPayment = computed(() => {
  const r = (interestRate.value / 100) / 12
  const n = loanTerm.value
  const p = loanAmount.value
  return (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1)
})

const totalPayment = computed(() => {
  return monthlyPayment.value * loanTerm.value
})

const totalInterest = computed(() => {
  return totalPayment.value - loanAmount.value
})
</script>

<template>
  <div class="space-y-6">
    <h3 class="text-xl font-semibold">Loan Calculator</h3>
    
    <div class="space-y-4">
      <div class="space-y-2">
        <Label>Loan Amount</Label>
        <div class="flex items-center">
          <span class="bg-gray-100 px-3 py-2 border border-r-0 rounded-l-md">GHS</span>
          <Input
            type="number"
            v-model="loanAmount"
            class="rounded-l-none"
            min="1000"
            max="1000000"
          />
        </div>
      </div>

      <div class="space-y-2">
        <Label>Interest Rate (APR)</Label>
        <div class="flex items-center">
          <Input
            type="number"
            v-model="interestRate"
            class="rounded-r-none"
            min="1"
            max="30"
            step="0.01"
          />
          <span class="bg-gray-100 px-3 py-2 border border-l-0 rounded-r-md">%</span>
        </div>
      </div>

      <div class="space-y-2">
        <Label>Loan Term (Months)</Label>
        <Input
          type="number"
          v-model="loanTerm"
          min="12"
          max="360"
        />
      </div>
    </div>

    <div class="bg-gray-50 p-4 rounded-lg space-y-3">
      <div class="flex justify-between">
        <span class="text-gray-600">Monthly Payment:</span>
        <span class="font-semibold">GHS {{ monthlyPayment.toFixed(2) }}</span>
      </div>
      <div class="flex justify-between">
        <span class="text-gray-600">Total Payment:</span>
        <span class="font-semibold">GHS {{ totalPayment.toFixed(2) }}</span>
      </div>
      <div class="flex justify-between">
        <span class="text-gray-600">Total Interest:</span>
        <span class="font-semibold">GHS {{ totalInterest.toFixed(2) }}</span>
      </div>
    </div>

    <Button class="w-full">Calculate</Button>
  </div>
</template>