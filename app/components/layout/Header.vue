<script setup lang="ts">
const route = useRoute()

function setLinks() {
  if (route.fullPath === '/' || route.fullPath === '/admin') {
    return [{ title: 'Dashboard', href: '/' }]
  }

  const segments = route.fullPath.split('/').filter(item => item !== '' && item !== 'admin')

  const breadcrumbs = segments.map((item, index) => {
    const str = item.replace(/-/g, ' ')
    const title = str
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ')

    return {
      title,
      href: `/${segments.slice(0, index + 1).join('/')}`,
    }
  })

  return [{ title: 'Dashboard', href: '/' }, ...breadcrumbs]
}

const links = ref<{
  title: string
  href: string
}[]>(setLinks())

watch(() => route.fullPath, (val) => {
  if (val) {
    links.value = setLinks()
  }
})
</script>

<template>
  <header class="sticky top-0 z-10 h-(--header-height) flex items-center gap-4 border-b bg-background px-4 md:px-6">
    <div class="w-full flex items-center gap-4 h-4">
      <SidebarTrigger />
      <Separator orientation="vertical" />
      <BaseBreadcrumbCustom :links="links" />
    </div>
    <div class="ml-auto flex items-center gap-2">
      <slot />
    </div>
  </header>
</template>
