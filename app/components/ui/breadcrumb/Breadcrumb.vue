<template>
  <nav class="bg-white">
    <ol class="mx-auto flex max-w-7xl items-center space-x-4 px-6 py-4 text-sm">
      <li>
        <div>
          <NuxtLink to="/" class="text-gray-400 hover:text-gray-500">
            <Home class="h-5 w-5 flex-shrink-0" aria-hidden="true" />
            <span class="sr-only">Home</span>
          </NuxtLink>
        </div>
      </li>
      <li v-for="(item, index) in items" :key="index">
        <div class="flex items-center">
          <ChevronRight class="h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
          <NuxtLink
            :to="item.href"
            :class="[
              index === items.length - 1 ? 'text-gray-700' : 'text-gray-500 hover:text-gray-700',
              'ml-4'
            ]"
          >
            {{ item.name }}
          </NuxtLink>
        </div>
      </li>
    </ol>
  </nav>
</template>

<script setup lang="ts">
import { Home, ChevronRight } from 'lucide-vue-next'

defineProps<{
  items: Array<{
    name: string
    href: string
  }>
}>()
</script>