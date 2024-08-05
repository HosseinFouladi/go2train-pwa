import { Colours, Font } from './src/design-tokens'

/** @type {import('tailwindcss').Config} */
export default {
	plugins: [require("@headlessui/tailwindcss", { prefix: "ui" })],
	content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
	theme: {
		fontWeight: Font.Weights,
		fontSize: {
			...Font.Sizes.SmallScreens,
			...Font.Sizes.LargsScreens,
		},
		fontFamily: {
			iransans: ["iransans-x"],
			inter: ["inter"],
		},
		colors: { ...Colours },

		extend: {
			boxShadow: {
				md: "0px 4px 4px 0px rgba(19, 19, 20, 0.20);",
				lg: "0px 4px 6.1px 0px rgba(19, 19, 20, 0.20);",
			},
			backgroundImage: {
				"auth-layout": "url('@/assets/images/login.webp')",
				"bronze-gradient": `linear-gradient(
            206.6deg,
            rgba(213, 113, 85, 0.25) 2.35%,
            rgba(213, 113, 85, 0.5) 99.3%
          )`,
				"silver-gradient": `linear-gradient(
            206.6deg,
            rgba(119, 119, 119, 0.25) 2.35%,
            rgba(119, 119, 119, 0.5) 99.3%
          )`,
				"gold-gradient": `linear-gradient(
            206.6deg,
            rgba(223, 149, 49, 0.25) 2.35%,
            rgba(223, 149, 49, 0.5) 99.3%
          )`,
				"divider-gradient":
					"linear-gradient(90deg, #FFF 0%, #DAD9E6 17%, #DAD9E6 81%, #FFF 100%);",
			},
			// breakpoints are tailwinds default
			screens: {},
		},
	},
};
