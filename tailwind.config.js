/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        "cream-can":"#F3CA52",
        "wheat":"#F6E9B2",
        "salem":"#0A6847",
        "de-york":"#7ABA78",
        "satin-Linen":"#E7E8D8"
      }
    },
  },
  plugins: [],
}
