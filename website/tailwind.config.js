/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#0C0C0C',
        mist: '#D7E2EA',
      },
      fontFamily: {
        kanit: ["'Kanit'", 'sans-serif'],
        bebas: ["'Bebas Neue'", "'Arial Narrow'", 'sans-serif'],
        tight: ["'Inter Tight'", 'Arial', 'sans-serif'],
        serif: ["'Instrument Serif'", 'serif'],
        barlow: ["'Barlow'", 'sans-serif'],
      },
    },
  },
  plugins: [],
}
