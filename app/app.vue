<script setup lang="ts">
import { Toaster } from 'vue-sonner'
import { ConfigProvider } from 'reka-ui'

const title = 'Admin Dashboard - Innovative Finance'
const description = 'Modern admin dashboard for agent onboarding management built with Nuxt, Shadcn Vue, and TailwindCSS.'

useSeoMeta({
  title,
  description,
  ogTitle: title,
  ogDescription: description,
  twitterTitle: title,
  twitterDescription: description,
  twitterCard: 'summary_large_image',
})

const textDirection = useTextDirection({ initialValue: 'ltr' })
const dir = computed(() => textDirection.value === 'rtl' ? 'rtl' : 'ltr')

// Force light mode and a constant theme palette
useHead({
  htmlAttrs: {
    lang: 'en',
    dir: dir,
  },
  bodyAttrs: {
    class: 'color-default theme-scaled',
  },
})
</script>

<template>
  <Body class="overscroll-none antialiased bg-background text-foreground">
    <ConfigProvider :dir="dir">
      <div id="app" vaul-drawer-wrapper class="relative">
        <NuxtLayout>
          <NuxtLoadingIndicator />
          <NuxtPage />
        </NuxtLayout>
      </div>

      <Toaster theme="light" richColors position="top-right" />
    </ConfigProvider>
  </Body>
</template>
