import type { Config } from "tailwindcss";

const config: Config = {
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	theme: {
		container: {
			center: true,
			padding: "1.5rem",
			screens: {
				"2xl": "1360px",
			},
		},
		extend: {
			backgroundImage: {
				"gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
				"gradient-conic":
					"conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
				"gradient-radial-purple-lighter":
					"radial-gradient(at center top, #482196, #1B0D48);",
				"gradient-radial-purple-darker":
					"radial-gradient(circle farthest-side at top center, #482196, #1B0D48);",
				"gradient-purple":
					"linear-gradient(to right top, #761beb, #8d55f4, #a57ffb, #bda7fe, #d8cdff, #d7ccfe, #d5cafe, #d4c9fd, #b6a1f9, #9878f2, #7a4ee9, #5a14de);",
			},
			boxShadow: {
				soft: "rgba(0, 0, 0, 0.1) 0px 10px 50px",
			},
		},
	},
	plugins: [require("@tailwindcss/forms")],
};
export default config;
