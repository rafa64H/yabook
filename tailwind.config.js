/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line import/no-anonymous-default-export
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        firstColor: "#6001d2",
        secondColor: "#b1a8b9",
        thirdColor: "#e00202",
        fourthColor: "#bb0000",
        fifthColor: "#bea6a0",
        sixthColor: "#4c4452",
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
