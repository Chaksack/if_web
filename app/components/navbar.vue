<template>
  <header class="w-full">
    <!-- Thin brand accent line -->
    <div class="hidden h-1 bg-red-600 md:block"></div>
    <!-- Top category bar -->
    <div class="hidden bg-gray-100 text-[12px] text-gray-700 md:block">
      <div class="mx-auto flex max-w-7xl items-center justify-between px-6">
        <nav>
          <ul class="flex items-center gap-6">
            <li>
              <a href="#" class="relative block py-2 pl-3 pr-3 text-gray-900 after:absolute after:left-0 after:top-0 after:h-[3px] after:w-full after:bg-red-600">About Bank</a>
            </li>
            <li><a href="#" class="block py-2 pl-3 pr-3 hover:text-gray-900">Careers</a></li>
            <li><NuxtLink to="/credit-cards" class="block py-2 pl-3 pr-3 hover:text-gray-900">Credit Cards</NuxtLink></li>
            <li><a href="#" class="block py-2 pl-3 pr-3 hover:text-gray-900">Services</a></li>
          </ul>
        </nav>
        <div class="hidden items-center gap-2 md:flex">
          <span class="grid h-6 w-6 place-items-center rounded-full bg-gray-200 text-[11px] text-gray-600"></span>
          <span class="grid h-6 w-6 place-items-center rounded-full bg-gray-200 text-[11px] text-gray-600"></span>
          <span class="grid h-6 w-6 place-items-center rounded-full bg-gray-200 text-[11px] text-gray-600"></span>
          <span class="grid h-6 w-6 place-items-center rounded-full bg-gray-200 text-[11px] text-gray-600"></span>
          <span class="grid h-6 w-6 place-items-center rounded-full bg-gray-200 text-[11px] text-gray-600"></span>
        </div>
      </div>
    </div>
    <!-- Utility bar (merged into logo row on desktop) -->
    <div class="md:hidden border-b bg-white text-[12px] leading-4 text-gray-600">
      <div class="mx-auto flex max-w-7xl items-center justify-end gap-6 px-6 py-2">
        <a href="#" class="inline-flex items-center gap-2 hover:text-gray-900"><span>💬</span>Contact Us</a>
        <a href="#" class="inline-flex items-center gap-2 hover:text-gray-900"><span>📍</span>Locations</a>
        <a href="#" class="inline-flex items-center gap-2 hover:text-gray-900"><span>👤</span>Sign In</a>
        <button class="inline-flex items-center gap-2 rounded-full border px-3 py-1 hover:bg-white"><span>🔍</span>Search</button>
      </div>
    </div>

    <!-- Logo + utility row -->
    <div class="bg-white">
      <div class="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <div class="flex items-center gap-2">
          <span class="h-2.5 w-2.5 rounded-full bg-red-600"></span>
          <span class="text-[20px] font-semibold tracking-tight text-gray-900">Innovative Finance</span>
        </div>
        <!-- Desktop utility links aligned with logo -->
        <div class="hidden items-center gap-6 text-[12px] leading-4 text-gray-600 md:flex">
          <a href="#" class="inline-flex items-center gap-2 hover:text-gray-900"><span>💬</span>Contact Us</a>
          <a href="#" class="inline-flex items-center gap-2 hover:text-gray-900"><span>📍</span>Locations</a>
          <a href="#" class="inline-flex items-center gap-2 hover:text-gray-900"><span>👤</span>Sign In</a>
          <button class="inline-flex items-center gap-2 rounded-full border px-3 py-1 hover:bg-white"><span>🔍</span>Search</button>
        </div>
        <button class="md:hidden" @click="open = !open" aria-label="Toggle menu">
          <span class="i">☰</span>
        </button>
      </div>
      <!-- Primary nav row (below logo) -->
      <nav class="border-t">
        <div class="mx-auto max-w-7xl px-6">
          <ul class="relative flex items-center gap-8 text-[14px] font-medium text-gray-700">
            <li><NuxtLink :class="linkClass('/')" to="/">Home</NuxtLink></li>
            <li><NuxtLink :class="linkClass('/credit-cards')" to="/credit-cards">Credit Cards</NuxtLink></li>
            <li><NuxtLink :class="linkClass('/features')" to="/features">Features</NuxtLink></li>
            <li><NuxtLink :class="linkClass('/shortcodes')" to="/shortcodes">Shortcodes</NuxtLink></li>
            <li><NuxtLink :class="linkClass('/post-types')" to="/post-types">Post Types</NuxtLink></li>
            <li><NuxtLink :class="linkClass('/news')" to="/news">News</NuxtLink></li>
          </ul>
        </div>
      </nav>
      <!-- Mobile menu -->
      <div v-if="open" class="border-t md:hidden">
        <ul class="mx-auto max-w-7xl px-6 py-3 text-sm text-gray-700">
          <li class="py-2"><NuxtLink class="block" to="/">Home</NuxtLink></li>
          <li class="py-2"><NuxtLink class="block" to="/credit-cards">Credit Cards</NuxtLink></li>
          <li class="py-2"><NuxtLink class="block" to="/features">Features</NuxtLink></li>
          <li class="py-2"><NuxtLink class="block" to="/shortcodes">Shortcodes</NuxtLink></li>
          <li class="py-2"><NuxtLink class="block" to="/post-types">Post Types</NuxtLink></li>
          <li class="py-2"><NuxtLink class="block" to="/news">News</NuxtLink></li>
        </ul>
      </div>
    </div>
  </header>
  
</template>

<script setup lang="ts">
const open = ref(false)
const route = useRoute()

const linkClass = (path: string) => {
  const active = route.path === path
  return [
    'relative block pb-3 hover:text-gray-900',
    active ? 'text-gray-900 after:absolute after:left-0 after:-bottom-[1px] after:h-[3px] after:w-full after:bg-red-500' : 'text-gray-700'
  ]
}
</script>

