import { ProfileLayout } from '@/layouts'
import type { RouteRecordRaw } from 'vue-router'

export const ProfileRoutes: Array<RouteRecordRaw> = [
	{
		path: "/profile",
		name: "profile",
		component: ProfileLayout,
		meta: { middleware: "auth" },
		children: [
			{
				path: "account",
				name: "user-account",
				component: () => import("@/views/profile/account.vue"),
			},
			// not shipping this feature in this version
			// {
			//   path: 'courses',
			//   name: 'courses',
			//   component: () => import('@/views/profile/courses.vue')
			// },
			{
				path: "subscriptions",
				name: "user-subscriptions",
				component: () => import("@/views/profile/subscriptions.vue"),
			},
			{
				path: "settings",
				name: "settings",
				component: () => import("@/views/profile/settings.vue"),
			},
			{
				path: "crash-report",
				name: "crash-report",
				component: () => import("@/views/profile/crash-report.vue"),
			},
		],
	},
];
