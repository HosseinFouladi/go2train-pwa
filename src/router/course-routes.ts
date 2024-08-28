import type { RouteRecordRaw } from 'vue-router'

export const CourseRoutes: Array<RouteRecordRaw> = [
  {
    path: '/courses',
    name: 'courses',
    component: () => import('@/layouts/profile-layout/pages-layout.vue'),
    children: [
      {
        path: '',
        name: 'course_list',
        component: () => import('@/views/courses/index.vue')
      }
    ]
  }
]
