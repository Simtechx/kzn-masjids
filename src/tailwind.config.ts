
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				islamic: {
					'green': '#12834C',
					'dark-green': '#0A4E40',
					'light-green': '#28A76F',
					'blue': '#1C6E8C',
					'dark-blue': '#14506A',
					'light-blue': '#51A8C7',
					'gold': '#D4AF37',
					'cream': '#F7F3E3',
				},
				teal: {
					'50': '#f0fdfa',
					'100': '#ccfbf1',
					'200': '#99f6e4',
					'300': '#5eead4',
					'400': '#2dd4bf',
					'500': '#14b8a6',
					'600': '#0d9488',
					'700': '#0f766e',
					'800': '#115e59',
					'900': '#134e4a',
					'950': '#042f2e',
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				'fade-in': {
					'0%': {
						opacity: '0',
						transform: 'translateY(10px)'
					},
					'100%': {
						opacity: '1',
						transform: 'translateY(0)'
					}
				},
				'counter-animate': {
					'0%': {
						opacity: '0',
						transform: 'translateY(10px)'
					},
					'100%': {
						opacity: '1',
						transform: 'translateY(0)'
					}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fade-in 0.5s ease-out',
				'counter': 'counter-animate 1s ease-out forwards'
			},
			backgroundImage: {
				'islamic-pattern': "url('/islamic-pattern.svg')",
				'mosque-watermark': "url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNDAgMjQwIiBmaWxsPSIjMGE0ZTQwMTAiIG9wYWNpdHk9IjAuMSI+PHBhdGggZD0iTTEyMCA0MGwzMiAyNHYyNGg4djEyaC04djRoLTY0di00aC04di0xMmg4di0yNHpNMTgwLjggODhoLTEyMS42YzAgOS43IDQ1LjMgMzIgNjAuOCA0Mmg4YzE1LjUtMTAgNjAuOC0zMi4zIDYwLjgtNDJ6TTIwOCAxMzJoLTh2LTEyYy0yLjctMy4yLTYtNi4zLTEwLTkuNXYyMS41aC0zMnYtMTMuNmMtMTAuNS02LjgtMjMuMi0xNC40LTM4LTE5LjR2MzNoLTI0di0zM2MtMTQuOCA1LTI3LjUgMTIuNi0zOCAxOS40djEzLjZoLTMydi0yMS41Yy00IDMuMi03LjMgNi4zLTEwIDkuNXYxMmgtOHYxMmg4djY0aDE3NnYtNjRoOHYtMTJ6TTgwIDE2NGgxNnYyNGgtMTZ6TTE0NCAxNjRoMTZ2MjRoLTE2eiI+PC9wYXRoPjwvc3ZnPg==')"
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
