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
      component: () => import('@/views/auth/sign-up/choose-username-view.vue')
    },
    {
      path: '/sign-up/choose-password',
      name: 'choose-password',
      meta: { layout: Layouts.AuthLayout },
      component: () => import('@/views/auth/sign-up/choose-password-view.vue')
    },
    {
      path: '/sign-up/choose-email-or-number',
      name: 'choose-email-or-number',
      meta: { layout: Layouts.AuthLayout },
      component: () => import('@/views/auth/sign-up/choose-email-or-number-view.vue')
    },
    {
      path: '/sign-up/confirm-code-email',
      name: 'confirmation-code-email',
      meta: { layout: Layouts.AuthLayout },
      component: () =>
        import(
          '@/views/auth/sign-up/code-confirmation/confirm-code-via-email-view.vue'
        )
    },
    {
      path: '/sign-up/confirm-code-mobile',
      name: 'confirmation-code-mobile',
      meta: { layout: Layouts.AuthLayout },
      component: () =>
        import(
          '@/views/auth/sign-up/code-confirmation/confirm-code-via-mobile-view.vue'
        )
    },
    {
      path: '/forget-password',
      name: 'forget-password',
      meta: { layout: Layouts.AuthLayout },
      component: () => import('@/views/auth/forget-password/find-account-view.vue')
    },
    {
      path: '/forget-password/confirm-code',
      name: 'forget-password-confirm-code',
      meta: { layout: Layouts.AuthLayout },
      component: () =>
        import('@/views/auth/forget-password/confirmation-code-view.vue')
    },
    {
      path: '/forget-password/recover-password',
      name: 'forget-password-recover-password',
      meta: { layout: Layouts.AuthLayout },
      component: () =>
        import('@/views/auth/forget-password/recover-password-view.vue')
    }
  ]
})

export default router
