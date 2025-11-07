<template>
  <Teleport to="body">
    <div class="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div class="w-full max-w-2xl bg-white rounded shadow-lg overflow-hidden">
        <div class="p-4 border-b flex items-center justify-between">
          <h3 class="text-lg font-semibold">Transaction details</h3>
          <button @click="$emit('close')" class="text-gray-600 hover:text-gray-900">Close</button>
        </div>

        <div class="p-6 space-y-4">
          <div class="grid grid-cols-2 gap-4">
            <div>
              <div class="text-sm text-gray-500">Reference</div>
              <div class="font-medium">{{ tx.reference }}</div>
            </div>
            <div>
              <div class="text-sm text-gray-500">Type</div>
              <div class="font-medium">{{ tx.type }}</div>
            </div>
            <div>
              <div class="text-sm text-gray-500">Channel</div>
              <div class="font-medium">{{ tx.channel }}</div>
            </div>
            <div>
              <div class="text-sm text-gray-500">Amount</div>
              <div class="font-medium">GHS {{ tx.amount }}</div>
            </div>
            <div>
              <div class="text-sm text-gray-500">Status</div>
              <div :class="tx.status === 'completed' ? 'text-green-600' : tx.status === 'failed' ? 'text-red-600' : 'text-yellow-600'" class="font-medium">{{ tx.status }}</div>
            </div>
            <div>
              <div class="text-sm text-gray-500">Created</div>
              <div class="font-medium">{{ formatDate(tx.created_at) }}</div>
            </div>
          </div>

          <div>
            <div class="text-sm text-gray-500">Notes</div>
            <div class="mt-2 text-sm text-gray-700">{{ tx.notes || '—' }}</div>
          </div>

          <div>
            <label class="text-sm text-gray-500">Add note</label>
            <textarea v-model="note" rows="3" class="w-full mt-2 input"></textarea>
            <div class="mt-3 flex items-center justify-end gap-2">
              <button @click="onAddNote" class="px-4 py-2 bg-primary text-white rounded">Save note</button>
              <button v-if="!tx.is_flagged" @click="onFlag" class="px-4 py-2 bg-yellow-500 text-white rounded">Flag</button>
              <button v-else @click="onUnflag" class="px-4 py-2 bg-gray-100 rounded">Unflag</button>
              <button @click="onResolve" class="px-4 py-2 bg-green-600 text-white rounded">Resolve</button>
              <button class="px-4 py-2 bg-gray-100 rounded" @click="$emit('close')">Close</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'

import { ref } from 'vue'
import { useTransactions } from '~/composables/useTransactions'
import { toast } from 'vue-sonner'

const props = defineProps<{ tx: any }>()
const note = ref('')
const txApi = useTransactions()

function formatDate(d?: string) {
  if (!d) return ''
  return new Date(d).toLocaleString()
}

async function onAddNote() {
  try {
    const res = await txApi.addTransactionNote(props.tx.id, note.value)
    const updated = (res as any).data || (await res).data || res
    toast.success('Note saved')
    // emit updated transaction so parent can update list
    // prefer to use returned payload if available
    const payload = updated || { ...props.tx, notes: note.value }
    // clear note input
    note.value = ''
    // notify parent
    // @ts-ignore
    // emit via custom event
    const ev = new CustomEvent('updated', { detail: payload })
    window.dispatchEvent(ev)
  } catch (e) {
    toast.error('Failed to save note')
  }
}

async function onFlag() {
  try {
    const res = await txApi.flagTransaction(props.tx.id, 'manually flagged')
    const updated = (res as any).data || (await res).data || res
    toast.success('Transaction flagged')
    const payload = updated || { ...props.tx, is_flagged: true }
    const ev = new CustomEvent('updated', { detail: payload })
    window.dispatchEvent(ev)
  } catch (e) {
    toast.error('Failed to flag')
  }
}

async function onUnflag() {
  try {
    const res = await txApi.unflagTransaction(props.tx.id)
    const updated = (res as any).data || (await res).data || res
    toast.success('Transaction unflagged')
    const payload = updated || { ...props.tx, is_flagged: false }
    const ev = new CustomEvent('updated', { detail: payload })
    window.dispatchEvent(ev)
  } catch (e) {
    toast.error('Failed to unflag')
  }
}

async function onResolve() {
  try {
    const res = await txApi.resolveTransaction(props.tx.id, 'resolved via modal')
    const updated = (res as any).data || (await res).data || res
    toast.success('Transaction resolved')
    const payload = updated || { ...props.tx, status: 'resolved' }
    const ev = new CustomEvent('updated', { detail: payload })
    window.dispatchEvent(ev)
  } catch (e) {
    toast.error('Failed to resolve')
  }
}
</script>

<style scoped>
/* scoped minimal modal styling; layout uses app Tailwind */
</style>
