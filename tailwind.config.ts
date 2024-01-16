import type { Config } from "tailwindcss";

const config: Config = {
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/pages/login/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/pages/login/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
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
			},
		},
	},
	plugins: [require("@tailwindcss/forms")],
};
export default config;
