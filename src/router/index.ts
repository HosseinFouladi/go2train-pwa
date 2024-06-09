import { createRouter, createWebHistory } from 'vue-router'

import { Layouts } from '@/constants'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/sign-in'
    },
    {
      path: '/sign-in',
      name: 'sign-in',
      meta: { layout: Layouts.AuthLayout },
      component: () => import('@/views/auth/sign-in-view.vue')
    },
    {
      path: '/sign-up',
      name: 'sign-up',
      meta: { layout: Layouts.AuthLayout },
      component: () => import('@/views/auth/sign-up-view.vue')
    },
    {
      path: '/forget-password',
      name: 'forget-password',
      meta: { layout: Layouts.AuthLayout },
      component: () => import('@/views/auth/forget-password/find-account-view.vue')
    },
    {
      path: '/confirmation-code',
      name: 'confirmation-code',
      meta: { layout: Layouts.AuthLayout },
      component: () =>
        import('@/views/auth/forget-password/confirmation-code-view.vue')
    },
    {
      path: '/recover-password',
      name: 'recover-password',
      meta: { layout: Layouts.AuthLayout },
      component: () =>
        import('@/views/auth/forget-password/recover-password-view.vue')
    }
  ]
})

export default router
