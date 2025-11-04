<template>
  <div class="relative group">
    <button 
      @mouseenter="isOpen = true"
      @mouseleave="isOpen = false"
      class="flex items-center gap-1 relative"
      :class="[baseClass, isActive ? activeClass : '']"
    >
      <slot name="trigger" />
      <svg 
        class="w-4 h-4 transition-transform duration-200"
        :class="{ 'rotate-180': isOpen }"
        viewBox="0 0 24 24"
      >
        <path 
          fill="currentColor" 
          d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"
        />
      </svg>
    </button>

    <div 
      v-show="isOpen"
      @mouseenter="isOpen = true"
      @mouseleave="isOpen = false"
      class="absolute left-0 top-full mt-1 w-60 rounded-md bg-white py-2 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50"
    >
      <div class="px-2 py-2">
        <slot name="content" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

defineProps({
  baseClass: {
    type: String,
    default: 'block py-2 pl-3 pr-3 hover:text-gray-900'
  },
  activeClass: {
    type: String,
    default: 'text-gray-900 after:absolute after:left-0 after:top-0 after:h-[3px] after:w-full after:bg-red-600'
  },
  isActive: {
    type: Boolean,
    default: false
  }
})

const isOpen = ref(false)
</script>