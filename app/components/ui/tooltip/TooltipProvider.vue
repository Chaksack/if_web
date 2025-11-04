<script setup lang="ts">
// SSR-safe fallback TooltipProvider wrapper.
// The project originally wrapped an external `reka-ui` TooltipProvider which
// can be undefined during server-side rendering and cause "Invalid vnode type"
// errors. To avoid that, this component provides a tiny, dependency-free
// pass-through that accepts the same prop shape we used and renders its slot.

const props = withDefaults(defineProps<{
  delayDuration?: number
}>(), {
  delayDuration: 0,
})
</script>

<template>
  <!-- Fallback provider: no-op for SSR, preserves slot structure for consumers -->
  <div aria-hidden="true">
    <slot />
  </div>
</template>
