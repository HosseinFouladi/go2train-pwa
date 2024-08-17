import type { RouteRecordRaw } from "vue-router";

export const PaymentRoutes: Array<RouteRecordRaw> = [
	{
		path: "/payment",
		name: "payment",
		component: () => import("@/views/payment/payment.vue"),
	},
];
