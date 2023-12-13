/** @type {import('tailwindcss').Config} */
const { nextui } = require("@nextui-org/react")
const typographyPlugin = require('@tailwindcss/typography')
const defaultTheme = require('tailwindcss/defaultTheme')
// const defaultColors = require('tailwindcss/colors')

// const colors = {
//   ...defaultColors,
//   ... {
//     //custom
//     inonda: '#f5b316',
//     base: 'rgb(255,255,255)'
//   }
// }
// console.log(colors);
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./renderer/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    //colors,
    extend: {colors: {
        "chart-color-cyan": "var(--chart-color-cyan)",
        "chart-color-green": "var(--chart-color-green)",
        "chart-color-black": "var(--chart-color-black)",
        "chart-color-red": "var(--chart-color-red)",
      },
      fontFamily: {
        sans: ['Satoshi', defaultTheme.fontFamily.sans]
      },

    },
  },
  plugins: [nextui(), typographyPlugin],
}

