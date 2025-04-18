/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
     colors: {
      "rabbit-blue" : "#2a79f0",
     }
    },
  },
  plugins: [],
};