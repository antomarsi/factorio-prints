/** @type {import('tailwindcss').Config} */
export default {
  mode: "jit",
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#ffe6c0"
      },
      boxShadow: {
        'button-hover': 'inset 8px 0px 4px -8px #000, inset -8px 0px 4px -8px #000, inset 0px 9px 2px -8px #fff, inset 0px 8px 4px -8px #000, inset 0px -8px 4px -8px #000, inset 0px -9px 2px -8px #432400, 0px 0px 4px 0px #000, inset 0px 0px 4px 2px #f9b44b',
        panel: '0px 0px 3px 0px #201815'
      }
    },
  },
  plugins: [],
}

