export const PaymentEndpoints = Object.freeze({
	/**
	 * This endpoint accepts username inside the body and checks if the
	 * username is valid
	 *
	 * if valid -> return the user's firstname and lastname
	 *
	 * if valid & user does not set firstname or lastname -> returns back the username itself
	 *
	 * @body username 		String
	 * @body plan_id     	Number
	 * @body plan_price_id	Number
	 *
	 * @returns API Endpoint string
	 */
	PaymentDetails: "/payment-details",

	/**
	 * @body username       String
	 * @body plan_id        Number
	 * @body plan_price_id  Number
	 * @body gateway_id     Number
	 *
	 * @returns API Endpoint string
	 */
	SubscribeByUsername: "/v2/plans/subscribe-by-username",
});
