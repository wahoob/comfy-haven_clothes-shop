/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        "sans": "'Poppins', sans-serif",
        "custom": "'Source Serif 4', serif"
      },
      backgroundImage: {
        "home-desktop-bg": "url('./src/assests/home-bg-destop.jpg')",
        "home-mobile-bg": "url('./src/assests/home-bg-mobile.jpg.jpg')",
      },
    },
  },
  plugins: [],
}