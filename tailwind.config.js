/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      borderColor: {
        DEFAULT: "black",
      },
      boxShadow: {
        thin: "2px 2px black",
      },
      colors: {
        primary: {
          light: "hsl(var(--primary-light) / <alpha-value>)",
          DEFAULT: "hsl(var(--primary) / <alpha-value>)",
          dark: "hsl(var(--primary-dark) / <alpha-value>)",
        },
        secondary: "#5757f7",
        neutral: "#b2b2eb",
        // rose: "hsla(330, 100%, 50%, 1)"
      },
    },
  },
  plugins: [],
};
