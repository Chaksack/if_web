<script setup lang="ts">
import { useSidebar } from '@/components/ui/sidebar'

const { isMobile } = useSidebar()
</script>

<template>
  <SidebarMenu>
    <SidebarMenuItem>
      <SidebarMenuButton
        size="lg"
        class="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
        as-child
      >
        <NuxtLink to="/" class="flex items-center gap-2">
          <div class="aspect-square size-8 flex items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
            <Icon name="lucide:landmark" class="size-4" />
          </div>
          <div class="grid flex-1 text-left text-sm leading-tight">
            <span class="truncate font-semibold">
              Innovative Finance
            </span>
            <span class="truncate text-xs">Admin Dashboard</span>
          </div>
        </NuxtLink>
      </SidebarMenuButton>
    </SidebarMenuItem>
  </SidebarMenu>
</template>
