// tailwind.config.ts
import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#2563eb", // Blue-600
        secondary: "#fbbf24", // Amber-400
        card: "#fefce8", // Light yellow for cards
        bg: "#f9fafb", // Light gray background
        accent: "#10b981", // Emerald-500
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
      borderRadius: {
        xl: "1rem",
      },
    },
  },
  plugins: [],
};
export default config;
