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
      fontFamily: {
        ridi: ['"Ridibatang"', '"Noto Serif KR"', 'Georgia', 'serif'],
        serif: ['"Noto Serif KR"', 'Georgia', 'serif'],
        sans: ['"Noto Sans KR"', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
