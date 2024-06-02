import { createRouter, createWebHistory } from 'vue-router'

import { Layouts } from '@/constants'
import { ForgetPasswordView, SignInView, SignUpView } from '@/views'

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
      component: () => SignInView
    },
    {
      path: '/sign-up',
      name: 'sign-up',
      meta: { layout: Layouts.AuthLayout },
      component: () => SignUpView
    },
    {
      path: '/forget-password',
      name: 'forget-password',
      meta: { layout: Layouts.AuthLayout },
      component: () => ForgetPasswordView
    }
  ]
})

export default router
