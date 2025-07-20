/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        walmartBlue: '#0071ce',
        walmartYellow: '#ffc220'
      }
    },
  },
  plugins: [],
}
