import { ProfileLayout } from '@/layouts'
import PagesLayout from '@/layouts/profile-layout/pages-layout.vue';
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
			{
				path: "user-courses",
				name: "user-courses",
				component: () => import("@/views/profile/courses/course-list.vue"),
			},
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
	{
		path: "/",
		name: "course",
		component: PagesLayout,
		children: [
			{
				path: "course/:course_id",
				name: "course details",
				component: () => import("@/views/profile/courses/course-details.vue"),
				props: (route) => ({ course_id: route.params.course_id }),
			},
		],
	},
];
