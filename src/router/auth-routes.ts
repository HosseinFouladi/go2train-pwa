import { AuthLayout } from "@/layouts";
import type { RouteRecordRaw } from "vue-router";

export const AuthRoutes: Array<RouteRecordRaw> = [
	{
		path: "/",
		redirect: "/sign-in",
		component: AuthLayout,
		children: [
			{
				path: "/sign-in",
				name: "sign-in",
				component: () => import("@/views/auth/sign-in-view.vue"),
				children: [
					{
						path: "callback",
						name: "apple-singnin-callback",
						component: () => import("@/views/auth/auth-callback.vue"),
					},
				],
			},
			{
				path: "/sign-up",
				name: "sign-up",
				redirect: "/sign-up/choose-username",
				children: [
					{
						path: "choose-username",
						name: "choose-username",
						component: () =>
							import("@/views/auth/sign-up/choose-username-view.vue"),
					},
					{
						path: "choose-password",
						name: "choose-password",
						component: () =>
							import("@/views/auth/sign-up/choose-password-view.vue"),
					},
					{
						path: "choose-email-or-number",
						name: "choose-email-or-number",
						component: () =>
							import("@/views/auth/sign-up/choose-email-or-number-view.vue"),
					},
					{
						path: "confirm-code-email",
						name: "confirmation-code-email",
						component: () =>
							import(
								"@/views/auth/sign-up/code-confirmation/confirm-code-via-email-view.vue"
							),
					},
					{
						path: "confirm-code-mobile",
						name: "confirmation-code-mobile",
						component: () =>
							import(
								"@/views/auth/sign-up/code-confirmation/confirm-code-via-mobile-view.vue"
							),
					},
				],
			},
			{
				path: "/forget-password",
				name: "forget-password",
				redirect: "/forget-password/find-account",
				children: [
					{
						path: "find-account",
						name: "find-account",
						component: () =>
							import("@/views/auth/forget-password/find-account-view.vue"),
					},
					{
						path: "confirmation-code",
						name: "forget-password-confirm-code",
						component: () =>
							import("@/views/auth/forget-password/confirmation-code-view.vue"),
					},
					{
						path: "recover-password",
						name: "forget-password-recover-password",
						component: () =>
							import("@/views/auth/forget-password/recover-password-view.vue"),
					},
				],
			},
		],
	},
];
