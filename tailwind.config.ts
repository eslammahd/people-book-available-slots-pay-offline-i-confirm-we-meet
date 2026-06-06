import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f0f9f6',
          100: '#dcf0e9',
          200: '#bbe1d4',
          300: '#8ccab8',
          400: '#59ad97',
          500: '#38917d',
          600: '#2a7465',
          700: '#245d52',
          800: '#204b43',
          900: '#1d3f38',
          950: '#0b2320',
        },
      },
    },
  },
  plugins: [],
}

export default config
