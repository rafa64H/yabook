/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        firstColor: "#6001d2",
        secondColor: "#b1a8b9",
        thirdColor: "#bb0000",
        fourthColor: "#bea6a0",
        fifthColor: "#4c4452",
      },
      fontFamily: {
        inter: ["Inter", "sans-serif"],
        robotoSlab: ["Roboto Slab", "serif"],
        sixtyFour: ["Sixtyfour", "sans-serif"],
      },
    },
  },
  plugins: [],
};
