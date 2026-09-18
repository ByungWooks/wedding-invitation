/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        cream: {
          50: '#ffffff',
          100: '#ffffff',
          200: '#e4d8c5',
          300: '#d9cdb9',
        },
        ink: {
          DEFAULT: '#222222',
          muted: '#555555',
          soft: '#888888',
        },
        rose: {
          DEFAULT: '#b49b82',
          dark: '#8c735a',
        },
      },
      fontSize: {
        xs: ['0.8125rem', { lineHeight: '1.25rem' }], // ~13px
        sm: ['0.9375rem', { lineHeight: '1.45rem' }], // ~15px
        base: ['1.0625rem', { lineHeight: '1.7rem' }], // ~17px
        lg: ['1.1875rem', { lineHeight: '1.75rem' }], // ~19px
        xl: ['1.3125rem', { lineHeight: '1.85rem' }], // ~21px
        '2xl': ['1.625rem', { lineHeight: '2.2rem' }], // ~26px
        '3xl': ['2rem', { lineHeight: '2.5rem' }], // ~32px
      },
      fontFamily: {
        ridi: ['"Ridibatang"', '"Noto Serif KR"', 'Georgia', 'serif'],
        serif: ['"Noto Serif KR"', 'Georgia', 'serif'],
        sans: ['"Noto Sans KR"', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
