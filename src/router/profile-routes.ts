import { ProfileLayout } from '@/layouts'
import type { RouteRecordRaw } from 'vue-router'

export const ProfileRoutes: Array<RouteRecordRaw> = [
  {
    path: '/profile',
    name: 'profile',
    component: ProfileLayout,
    meta: { middleware: 'auth' },
    children: [
      {
        path: 'subscriptions',
        name: 'user-subscriptions',
        component: () => import('@/views/profile/subscriptions.vue')
      }
    ]
  }
]
