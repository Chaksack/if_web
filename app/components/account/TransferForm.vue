<template>
  <div class="p-4 border rounded bg-white">
    <h4 class="font-semibold mb-2">Quick transfer / deposit</h4>
    <form @submit.prevent="onSubmit" class="space-y-3">
      <div>
        <label class="text-sm text-gray-500">Amount (GHS)</label>
        <input v-model.number="form.amount" type="number" min="1" required class="w-full mt-1 input" />
      </div>
      <div>
        <label class="text-sm text-gray-500">Channel</label>
        <select v-model="form.channel" class="w-full mt-1 input">
          <option value="mobile_money">Mobile money</option>
          <option value="bank">Bank</option>
          <option value="cash">Cash</option>
        </select>
      </div>
      <div>
        <label class="text-sm text-gray-500">Recipient (phone or account)</label>
        <input v-model="form.recipient" type="text" required class="w-full mt-1 input" />
      </div>
      <div class="flex items-center gap-2">
        <button type="submit" class="px-4 py-2 bg-primary text-white rounded" :disabled="submitting">Send</button>
        <button type="button" class="px-4 py-2 border rounded" @click="$emit('cancel')">Cancel</button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useTransactions } from '~/composables/useTransactions'
import { toast } from 'vue-sonner'

const emit = defineEmits(['completed','cancel'])

const form = ref({ amount: 0, channel: 'mobile_money', recipient: '' })
const submitting = ref(false)
const txApi = useTransactions()

async function onSubmit() {
  if (submitting.value) return
  submitting.value = true
  try {
    const payload = {
      amount: form.value.amount,
      channel: form.value.channel,
      reference: `TX-${Date.now()}`,
      type: form.value.amount > 0 ? 'deposit' : 'withdrawal',
      customer_id: undefined,
      notes: `Transfer to ${form.value.recipient}`,
    }
    const res = await txApi.createTransaction(payload as any)
    const data = (res as any).data || (await res).data || res
    toast.success('Transfer created')
    emit('completed', data)
  } catch (e) {
    toast.error('Failed to create transfer')
  }
  submitting.value = false
}
</script>

<style scoped>
</style>
