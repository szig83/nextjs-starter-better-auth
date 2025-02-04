import type { Config } from 'tailwindcss'
import { heroui } from '@heroui/react'

export default {
	content: [
		'./src/pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/components/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/app/**/*.{js,ts,jsx,tsx,mdx}',
		'./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}',
	],
	theme: {
		extend: {
			colors: {
				background: 'var(--background)',
				foreground: 'var(--foreground)',
			},
			fontFamily: {
				sans: ['var(--font-geist-sans)'],
				jersey15: ['var(--font-jersey-15)'],
				mono: ['var(--font-geist-mono)'],
			},
		},
	},
	darkMode: 'class',
	plugins: [heroui()],
} satisfies Config
