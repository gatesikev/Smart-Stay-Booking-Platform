/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        body: ['"DM Sans"', 'sans-serif'],
      },
      colors: {
        brand: {
          50:  '#fff5f2',
          100: '#ffe8e1',
          200: '#ffd0c2',
          300: '#ffad95',
          400: '#ff7d57',
          500: '#ff5a2e',
          600: '#ed3d10',
          700: '#c72f0b',
          800: '#a32a10',
          900: '#872814',
        },
      },
      boxShadow: {
        card: '0 2px 20px -4px rgba(0,0,0,0.12), 0 1px 4px -2px rgba(0,0,0,0.08)',
        'card-hover': '0 8px 40px -8px rgba(0,0,0,0.20), 0 2px 8px -2px rgba(0,0,0,0.10)',
      },
      animation: {
        'fade-up': 'fadeUp 0.5s ease forwards',
        shimmer: 'shimmer 1.8s infinite',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
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