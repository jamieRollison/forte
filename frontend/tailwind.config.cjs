/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html",
  "./src/**/*.{js,ts,jsx,tsx}",],
  theme: {
    extend: {
      fontFamily: {
        'galos': ['"Golos Text"', 'sans-serif'],
      },
      animation: {
        "spin-slow": "spin 15s linear infinite",
      }
    },
  },
  plugins: [],
}
