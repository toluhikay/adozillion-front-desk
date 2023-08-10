/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{js,jsx,ts,tsx}"],
	theme: {
		extend: {
			backgroundImage: {
				authBg: "url('/src/assets/images/AuthBg.webp')",
			},
		},
	},
	plugins: [],
};
