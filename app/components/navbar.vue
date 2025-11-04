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
            <li><NuxtLink to="/careers" class="block py-2 pl-3 pr-3 hover:text-gray-900">Careers</NuxtLink></li>
            <li><NuxtLink to="/help-support" class="block py-2 pl-3 pr-3 hover:text-gray-900">Help & Support</NuxtLink></li>
            <li><NuxtLink to="/contact" class="block py-2 pl-3 pr-3 hover:text-gray-900">Contact Us</NuxtLink></li>
          </ul>
        </nav>
        <div class="hidden items-center gap-2 md:flex">
          <span class="grid h-6 w-6 place-items-center rounded-full bg-gray-200 text-[11px] text-gray-600">t</span>
          <span class="grid h-6 w-6 place-items-center rounded-full bg-gray-200 text-[11px] text-gray-600">f</span>
          <span class="grid h-6 w-6 place-items-center rounded-full bg-gray-200 text-[11px] text-gray-600">I</span>
          <span class="grid h-6 w-6 place-items-center rounded-full bg-gray-200 text-[11px] text-gray-600">l</span>
        </div>
      </div>
    </div>
    <!-- Utility bar (merged into logo row on desktop) -->
    <div class="md:hidden border-b bg-white text-[12px] leading-4 text-gray-600">
      <div class="mx-auto flex max-w-7xl items-center justify-end gap-6 px-6 py-2">
        <a href="/sign-in" class="inline-flex items-center gap-2 hover:text-gray-900">Sign In</a>
        <a href="/sign-up" class="inline-flex items-center gap-2 hover:text-gray-900">Sign Up</a>
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
          <template v-if="user">
            <div class="relative">
              <button @click="menuOpen = !menuOpen" class="flex items-center gap-3 rounded-full px-3 py-1 hover:bg-gray-50">
                <div class="h-8 w-8 rounded-full bg-gray-200 grid place-items-center text-sm font-medium text-gray-700">{{ userInitials }}</div>
                <div class="text-sm text-gray-800">{{ user.firstName }}</div>
              </button>
              <div v-if="menuOpen" class="absolute right-0 mt-2 w-48 bg-white border rounded shadow-sm z-50">
                <NuxtLink to="/account" class="block px-4 py-2 hover:bg-gray-50">My Account</NuxtLink>
                <NuxtLink to="/account/applications" class="block px-4 py-2 hover:bg-gray-50">Applications</NuxtLink>
                <NuxtLink v-if="user.is_admin" to="/admin" class="block px-4 py-2 hover:bg-gray-50">Admin</NuxtLink>
                <button @click="signOut" class="w-full text-left px-4 py-2 text-sm hover:bg-gray-50">Sign out</button>
              </div>
            </div>
          </template>
          <template v-else>
            <NuxtLink to="/sign-in" class="inline-flex items-center gap-2 hover:text-gray-900">Sign In</NuxtLink>
            <NuxtLink to="/sign-up" class="inline-flex items-center gap-2 hover:text-gray-900">Sign Up</NuxtLink>
          </template>
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
            <li>
              <DropdownNav 
                :is-active="route.path.startsWith('/loans')"
                :base-class="'relative block pb-3 hover:text-gray-900'"
                :active-class="'text-gray-900 after:absolute after:left-0 after:-bottom-[1px] after:h-[3px] after:w-full after:bg-red-500'"
              >
                <template #trigger>
                  <span>Loans</span>
                </template>
                <template #content>
                  <div class="space-y-2">
                    <NuxtLink 
                      v-for="category in loanCategories" 
                      :key="category.path"
                      :to="category.path"
                      class="flex items-start gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
                    >
                      <component 
                        :is="category.icon" 
                        class="w-5 h-5 mt-0.5 text-gray-500"
                      />
                      <div>
                        <div class="font-medium">{{ category.title }}</div>
                        <div class="text-xs text-gray-500">{{ category.description }}</div>
                      </div>
                    </NuxtLink>
                  </div>
                </template>
              </DropdownNav>
            </li>
            <li><NuxtLink :class="linkClass('/credit-cards')" to="/credit-cards">Credit Cards</NuxtLink></li>
            <li><NuxtLink :class="linkClass('/features')" to="/features">Features</NuxtLink></li>
            <li><NuxtLink :class="linkClass('/news')" to="/news">News</NuxtLink></li>
            <li><NuxtLink :class="linkClass('/account')" to="/account">My Account</NuxtLink></li>
          </ul>
        </div>
      </nav>
      <!-- Mobile menu -->
      <div v-if="open" class="border-t md:hidden">
        <ul class="mx-auto max-w-7xl px-6 py-3 text-sm text-gray-700">
          <li class="py-2"><NuxtLink class="block" to="/">Home</NuxtLink></li>
          <li class="py-2">
            <div class="block font-medium" to="/loans">Loans</div>
            <div class="ml-4 mt-2 space-y-2">
              <NuxtLink 
                v-for="category in loanCategories" 
                :key="category.path"
                :to="category.path"
                class="block py-1 text-sm"
              >
                {{ category.title }}
              </NuxtLink>
            </div>
          </li>
          <li class="py-2"><NuxtLink class="block" to="/credit-cards">Credit Cards</NuxtLink></li>
          <li class="py-2"><NuxtLink class="block" to="/features">Features</NuxtLink></li>
          <li class="py-2"><NuxtLink class="block" to="/news">News</NuxtLink></li>
          <li class="py-2"><NuxtLink class="block" to="/account">My Account</NuxtLink></li>
          <li class="border-t mt-2 pt-2">
            <div class="text-xs text-gray-500 mb-2 font-medium">Support</div>
            <div class="ml-4 space-y-2">
              <li class="py-1"><NuxtLink class="block text-sm" to="/help-support">Help & Support</NuxtLink></li>
              <li class="py-1"><NuxtLink class="block text-sm" to="/contact">Contact Us</NuxtLink></li>
              <li class="py-1"><NuxtLink class="block text-sm" to="/careers">Careers</NuxtLink></li>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </header>
  
</template>

<script setup lang="ts">
import DropdownNav from './ui/dropdown-nav/DropdownNav.vue'
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'nuxt/app'

const open = ref(false)
const menuOpen = ref(false)
const route = useRoute()
const router = useRouter()
const user = ref<Record<string, any> | null>(null)

onMounted(() => {
  try { user.value = JSON.parse(localStorage.getItem('if_user') || 'null') } catch (e) { user.value = null }
})

const userInitials = computed(() => {
  if (!user.value) return ''
  const fn = (user.value.firstName && String(user.value.firstName)) || ''
  const ln = (user.value.lastName && String(user.value.lastName)) || ''
  return ((fn[0] || '') + (ln[0] || '')).toUpperCase()
})

function signOut() {
  localStorage.removeItem('if_user')
  // keep users list
  user.value = null
  router.push('/')
}

import { 
  User, 
  Building2, 
  Home, 
  Truck, 
  GraduationCap, 
  Package 
} from 'lucide-vue-next'

const loanCategories = [
  {
    title: 'Personal Loans',
    description: 'Flexible financing for your personal needs',
    path: '/loans/personal',
    icon: User
  },
  {
    title: 'Business Loans',
    description: 'Grow your business with our financing solutions',
    path: '/loans/business',
    icon: Building2
  },
  {
    title: 'Home Loans',
    description: 'Make your dream home a reality',
    path: '/loans/home',
    icon: Home
  },
  {
    title: 'Auto Loans',
    description: 'Finance your next vehicle purchase',
    path: '/loans/auto',
    icon: Truck
  },
  {
    title: 'Education Loans',
    description: 'Invest in your future with education financing',
    path: '/loans/education',
    icon: GraduationCap
  },
  {
    title: 'Equipment Loans',
    description: 'Finance equipment for business growth',
    path: '/loans/equipment',
    icon: Package
  }
]

const linkClass = (path: string) => {
  const active = route.path === path || (path === '/loans' && route.path.startsWith('/loans/'))
  return [
    'relative block pb-3 hover:text-gray-900',
    active ? 'text-gray-900 after:absolute after:left-0 after:-bottom-[1px] after:h-[3px] after:w-full after:bg-red-500' : 'text-gray-700'
  ]
}
</script>

