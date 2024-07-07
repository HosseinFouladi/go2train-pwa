import { createRouter, createWebHistory } from 'vue-router'

import { useAuthStore } from '@/stores'
import { AuthRoutes } from '@/router/auth-routes'
import { ProfileRoutes } from '@/router/profile-routes'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [...AuthRoutes, ...ProfileRoutes]
})

router.beforeEach(async (to, from, next) => {
  const { isAuthenticated } = useAuthStore()
  console.log(to.meta.middleware)
  if (to.meta.middleware === 'auth') {
    if (isAuthenticated) {
      next()
    } else {
      next({ name: 'sign-in' })
    }
  } else {
    next()
  }
})

export default router
