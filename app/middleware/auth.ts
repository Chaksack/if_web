export default defineNuxtRouteMiddleware((to, from) => {
  const token = useCookie('auth_token')

  // If trying to access admin routes without token, redirect to login
  if (!token.value && to.path.startsWith('/admin') && to.path !== '/admin/login') {
    return navigateTo('/admin/login')
  }

  // If logged in and trying to access login page, redirect to dashboard
  if (token.value && to.path === '/admin/login') {
    return navigateTo('/admin')
  }
})
