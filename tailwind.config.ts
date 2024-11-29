import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#ffe6c0",
        background: "var(--background)",
        foreground: "var(--foreground)",
        orange: "#ffa200",
        boxShadow: {
          'button-hover': 'inset 8px 0px 4px -8px #000, inset -8px 0px 4px -8px #000, inset 0px 9px 2px -8px #fff, inset 0px 8px 4px -8px #000, inset 0px -8px 4px -8px #000, inset 0px -9px 2px -8px #432400, 0px 0px 4px 0px #000, inset 0px 0px 4px 2px #f9b44b',
          panel: '0px 0px 3px 0px #201815'
        }
      },
    },
  },
  plugins: [],
} satisfies Config;