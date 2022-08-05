/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin')
const colors = require('tailwindcss/colors')
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    colors:{
      ...colors,
    },
    extend: {
      fontFamily: {
        // font-family: 'Roboto', sans-serif;
        Roboto: ['Roboto' , ' sans-serif' ],
        Raleway: ['Raleway' , ' sans-serif'],
      },
      animation: {
        wiggle: 'wiggle 1s ease-in-out infinite',
      }

    },
  },
  plugins: [
    require('tailwind-scrollbar'),
  ],
 
}
