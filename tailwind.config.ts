import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          50:  '#fdf8e7',
          100: '#faefc4',
          200: '#f5da84',
          300: '#efbf44',
          400: '#e9a825',
          500: '#c8941a',  // primary gold
          600: '#a87315',
          700: '#875511',
          800: '#6e4411',
          900: '#5c3a14',
          950: '#341e09',
        },
        brand: {
          black:   '#0a0a0a',
          dark:    '#111111',
          card:    '#1a1a1a',
          border:  '#2a2a2a',
          gold:    '#c8941a',
          'gold-light': '#e9a825',
          'gold-muted': '#8a6410',
          white:   '#f5f5f0',
          gray:    '#a0a0a0',
        },
      },
      fontFamily: {
        serif:  ['Playfair Display', 'Georgia', 'serif'],
        sans:   ['Inter', 'system-ui', 'sans-serif'],
        display:['Cormorant Garamond', 'Playfair Display', 'serif'],
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #c8941a 0%, #e9a825 50%, #c8941a 100%)',
        'dark-gradient': 'linear-gradient(180deg, #0a0a0a 0%, #1a1a1a 100%)',
      },
      boxShadow: {
        'gold': '0 0 20px rgba(200, 148, 26, 0.2)',
        'gold-lg': '0 0 40px rgba(200, 148, 26, 0.3)',
        'card': '0 4px 24px rgba(0, 0, 0, 0.4)',
        'card-hover': '0 8px 40px rgba(0, 0, 0, 0.6)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'shimmer': 'shimmer 1.5s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
    },
  },
  plugins: [],
}

export default config
