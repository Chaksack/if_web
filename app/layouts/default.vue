<script setup>
import LiveChat from '~/components/ui/live-chat/LiveChat.vue'
</script>

<template>
  <div>
    <Navbar />
    <slot />
    <Footer />
    <LiveChat />
  </div>
</template>

<style scoped>
</style>

