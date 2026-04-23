/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
     
      colors: {
        hightech: {
          yellow: '#f9bc2c', 
          red: '#da251c',    
          black: '#000000',
          // New: A very dark neutral for the background (replaces the blueish slate)
          bg: '#0a0a0a', 
          card: '#171717',
          border: '#262626'
        }
      },
      boxShadow: {
  'hightech-glow': '0 0 15px rgba(249, 188, 44, 0.4)',
  'hightech-glow-strong': '0 0 25px rgba(249, 188, 44, 0.6)',
}
    },
  },
  plugins: [],
}