export default defineNuxtRouteMiddleware((to) => {
  // Client-side check only. Redirect non-admins to sign-in or home.
  if (typeof window === 'undefined') return
  try {
    const raw = (typeof window !== 'undefined') ? localStorage.getItem('if_user') : null
    if (!raw) return navigateTo('/sign-in')
    const user = JSON.parse(raw as string)
    if (!user || !user.is_admin) return navigateTo('/')
  } catch (e) {
    return navigateTo('/sign-in')
  }
})
