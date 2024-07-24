/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "selector",
  plugins: [],
  theme: {
    container: {
      center: true,
      padding: {
        "2xl": "6rem",
        DEFAULT: "1rem",
        lg: "4rem",
        sm: "2rem",
        xl: "5rem",
      },
    },
    extend: {},
  },
};
