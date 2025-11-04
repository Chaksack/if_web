<template>
  <div class="flex items-center gap-2 justify-end mt-4">
    <button class="px-2 py-1 border rounded" :disabled="page<=1" @click="$emit('update:page', page-1)">Prev</button>
    <template v-for="p in pages" :key="p">
      <button
        class="px-2 py-1 rounded" 
        :class="p===page ? 'bg-primary text-white' : 'border'"
        @click="$emit('update:page', p)">
        {{ p }}
      </button>
    </template>
    <button class="px-2 py-1 border rounded" :disabled="page>=totalPages" @click="$emit('update:page', page+1)">Next</button>
  </div>
</template>

<script setup>
import { computed } from 'vue'
const props = defineProps({ page: { type: Number, default: 1 }, perPage: { type: Number, default: 10 }, total: { type: Number, default: 0 } })
const emit = defineEmits(['update:page'])

const totalPages = computed(() => Math.max(1, Math.ceil(props.total / props.perPage)))
const pages = computed(() => {
  const arr = []
  const start = Math.max(1, props.page - 2)
  const end = Math.min(totalPages.value, props.page + 2)
  for (let i = start; i <= end; i++) arr.push(i)
  return arr
})
</script>
