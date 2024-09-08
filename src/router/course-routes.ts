import type { RouteRecordRaw } from 'vue-router'

export const CourseRoutes: Array<RouteRecordRaw> = [
  {
    path: '/courses',
    name: 'courses',
    meta: { middleware: 'auth' },
    component: () => import('@/layouts/profile-layout/pages-layout.vue'),
    children: [
      {
        path: '',
        name: 'course_list',
        component: () => import('@/views/courses/index.vue')
      },
      {
        path: '/course_lessons/:courseId',
        name: 'course_lessons',
        component: () => import('@/views/course-lessons/index.vue')
      }
    ]
  }
]
