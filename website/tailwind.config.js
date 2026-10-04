/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Nordic forest palette
        night: '#0E1713', // spruce at dusk, dark sections
        spruce: '#1F3B30', // primary green
        moss: '#56743A',
        snow: '#F2F4EF', // light sections
        fog: '#C7D1CB', // secondary text on dark
        slate: '#44524B', // secondary text on light
        antler: '#9A6838', // warm accent
        bark: '#3A2819',
        ink: '#121C17', // text on light
        // kept for the template showcases
        mist: '#D7E2EA',
      },
      fontFamily: {
        display: ["'Kanit'", 'system-ui', 'sans-serif'],
        body: ["'Karla'", 'system-ui', 'sans-serif'],
        bebas: ["'Bebas Neue'", "'Arial Narrow'", 'sans-serif'],
        tight: ["'Inter Tight'", 'Arial', 'sans-serif'],
        serif: ["'Instrument Serif'", 'serif'],
        barlow: ["'Barlow'", 'sans-serif'],
      },
      spacing: {
        // One vertical rhythm for every section
        section: 'clamp(5rem, 11vw, 9rem)',
      },
    },
  },
  plugins: [],
}
