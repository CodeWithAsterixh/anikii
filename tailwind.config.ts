import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./ui/**/*.{js,ts,jsx,tsx,mdx}", "./app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        background: "#e6e4dc",
        foreground: "#2c2c2e",
        "base-black": "#272A2D",
        primary: "#e08e79",
        secondary: "#e76b4f",
        accent: "#fff6f1",
        tertiary: "#3a001e",
        

      },
      animation: {
        "spin-slow": "spin 3s linear infinite",
        "slide-up": "slideUp 300ms linear forwards",
        "slide-up-simple": "slideUpSimple 300ms linear forwards",
        "slide-down": "slideDown 300ms linear forwards",
        "slide-down-reveal-more": "slideDownRevealMore 300ms linear forwards",
        "slide-down-simple": "slideDownSimple 300ms linear forwards",
        "slide-down-reveal": "slideDownReveal 300ms linear forwards",
        "fade-in": "fadeIn 300ms linear forwards",
        "fade-out": "fadeOut 300ms linear forwards",
      },
    },
  },
  plugins: [],
  darkMode: "selector",
};
export default config;
