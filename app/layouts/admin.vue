<script setup lang="ts">
definePageMeta({
  middleware: 'auth',
})

// Fetch user data on layout mount
const { getMe, user } = useAuth()
onMounted(async () => {
  if (!user.value) {
    await getMe()
  }
})
</script>

<template>
  <SidebarProvider>
    <LayoutAppSidebar />
    <SidebarInset class="overflow-hidden">
      <LayoutHeader />
      <div class="min-w-0 w-full flex-1 overflow-x-auto p-4 lg:p-6">
        <slot />
      </div>
    </SidebarInset>
  </SidebarProvider>
</template>
