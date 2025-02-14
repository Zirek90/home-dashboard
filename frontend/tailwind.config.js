/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "primary-light": "#f0f0f0",
        "primary-dark": "#000000",
      },
    },
  },
  plugins: [],
};
