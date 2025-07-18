/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      //colors used
      colors: {
        primary: '#7B49EF',
        secondary: '#EF863E',
      }
    },
  },
  plugins: [],
}