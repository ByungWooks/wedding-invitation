/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        cream: {
          50: '#ffffff',
          100: '#ffffff',
          200: '#f8f9fa',
          300: '#e9ecef',
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
      fontFamily: {
        serif: ['"Noto Serif KR"', 'Georgia', 'serif'],
        sans: ['"Noto Sans KR"', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
