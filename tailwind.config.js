/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        cream: {
          50: '#fdfbf7',
          100: '#f7f1e8',
          200: '#efe4d4',
          300: '#e4d3bb',
        },
        ink: {
          DEFAULT: '#4a4036',
          muted: '#7a6e63',
          soft: '#9a8d82',
        },
        rose: {
          DEFAULT: '#c4a484',
          dark: '#a68568',
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
