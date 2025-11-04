<template>
    <NuxtLayout>
        <NuxtLoadingIndicator />
        <NuxtPage />
    </NuxtLayout>
    <Toaster richColors position="top-right" />
</template>

<script setup>
import { Toaster } from 'vue-sonner'
</script>
