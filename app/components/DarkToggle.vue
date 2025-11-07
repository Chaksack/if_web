<script setup lang="ts">
const color = useColorMode()
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <Button variant="ghost" size="icon" title="Toggle Color Scheme" aria-label="button dark toggle">
        <Icon name="lucide:sun" class="h-5 w-5 dark:hidden" />
        <Icon name="lucide:moon" class="hidden h-5 w-5 dark:block" />
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent>
      <DropdownMenuGroup>
        <DropdownMenuItem
          class="flex gap-2"
          :class="{ 'bg-accent text-accent-foreground': color.preference === 'light' }"
          @click="color.preference = 'light'"
        >
          <Icon name="lucide:sun" size="16" />
          <span>Light</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          class="flex gap-2"
          :class="{ 'bg-accent text-accent-foreground': color.preference === 'dark' }"
          @click="color.preference = 'dark'"
        >
          <Icon name="lucide:moon" size="16" />
          <span>Dark</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          class="flex gap-2"
          :class="{ 'bg-accent text-accent-foreground': color.preference === 'system' }"
          @click="color.preference = 'system'"
        >
          <Icon name="lucide:monitor" size="16" />
          <span>System</span>
        </DropdownMenuItem>
      </DropdownMenuGroup>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
