/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class', 
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/@mui/material/**/*.js",
    "./node_modules/@mui/system/**/*.js",
  ],
  theme: {
    extend: {
      transitionProperty: {
        'background': 'background-color, color',
        'opacity': 'opacity',
      },
    },
  },
  plugins: [],
}
