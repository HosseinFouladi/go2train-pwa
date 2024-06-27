import { createRouter, createWebHistory } from 'vue-router'

import { AuthRoutes } from '@/router/auth-routes'
import { ProfileRoutes } from '@/router/profile-routes'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [...AuthRoutes, ...ProfileRoutes]
})

export default router
