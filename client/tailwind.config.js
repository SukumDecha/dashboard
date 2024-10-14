import colors from "tailwindcss/colors";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
    colors: {
      primary: {
        900: "#5D5FEF",
        800: "#4079ED",
        300: "#F1F8FD",
        "dark-shade": "#05004E",
        200: "#7B91B0",
      },
      ...colors,
    },
  },
  plugins: [],
};
