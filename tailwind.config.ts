import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./ui/**/*.{js,ts,jsx,tsx,mdx}", "./app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        "base-black": "#272A2D",
        primary: "#347CCB",
        secondary: "#EB5B38",
        tertiary: "#75E2FF",
        "base-white": "#E6E4DC",
        "light-primary": "#4B616B",
        "fade-white": "#ECECEC",
        "fade-black": "#2C2C2E",
        "fade-off-white": "#999292",
        "complement-primary": "#244D61",
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
