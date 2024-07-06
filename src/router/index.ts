import { createRouter, createWebHistory } from 'vue-router'

import { useAuthStore } from '@/stores'
import { AuthRoutes } from '@/router/auth-routes'
import { ProfileRoutes } from '@/router/profile-routes'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [...AuthRoutes, ...ProfileRoutes]
})

router.beforeEach(async (to, from) => {
  const { isAuthenticated } = useAuthStore()
  if (
    // make sure the user is authenticated
    !isAuthenticated &&
    // ❗️ Avoid an infinite redirect
    to.name !== 'sign-in'
  ) {
    // redirect the user to the login page
    return { name: 'sign-in' }
  }
})

export default router
