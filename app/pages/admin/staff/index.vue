<script setup lang="ts">
// Use the same admin layout
definePageMeta({ layout: 'admin' })

// Redirect to canonical staff management page
await navigateTo('/admin/users', { redirectCode: 302 })
</script>

<template>
  <div />
</template>
