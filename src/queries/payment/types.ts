export type PaymentPlanResponse = {
	name: string;
	username: string;
	today_date: string;
	plan: PaymentDetailPlan;
	pricing: PaymentDetailsPricing;
};

export type PaymentDetailPlan = {
	id: number;
	product_id: number;
	title: string;
	hint: string;
	description: string;
	duration: number;
	type: number;
	type_title: string;
	icon: string;
	banner: string;
	color: string;
	created_at: Date;
	expired_at: Date;
	priority: 1 | 2 | 3;
	prev_plan: PaymentDetailPlan;
};

export type PaymentDetailsPricing = {
	id: number;
	price: number;
	old_price: number;
	off_expired_at: number;
	unit_id: number;
	unit: string;
	unit_slug: string;
	unit_sign: string;
};
