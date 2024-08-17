import { createRouter, createWebHistory } from 'vue-router'

import { useAuthStore } from '@/stores'
import { AuthRoutes } from '@/router/auth-routes'
import { ProfileRoutes } from '@/router/profile-routes'
import { setAuthCredentials } from '@/utils'
import { PaymentRoutes } from "./payement";

const router = createRouter({
	strict: true,
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [...AuthRoutes, ...ProfileRoutes, ...PaymentRoutes],
});

router.beforeEach(async (to, from, next) => {
  const { isAuthenticated } = useAuthStore()

  // 1. check if the query params exists
  const { token } = to.query
  if (token && from.path === '/') {
    // 2. validate the token
    setAuthCredentials(token as string, () =>
      router.replace({ name: 'user-subscriptions' })
    )
  }

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
