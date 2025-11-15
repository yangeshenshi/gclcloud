import { Options } from "$fresh/plugins/twind.ts";

export default {
  selfURL: import.meta.url,
  theme: {
    extend: {
      colors: {
        primary: "#667eea",
        secondary: "#764ba2",
        accent: "#f093fb",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-in-out",
        "slide-up": "slideUp 0.3s ease-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(10px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
      },
    },
  },
  plugins: {
    "btn": "px-4 py-2 rounded-lg font-semibold transition-colors",
    "btn-primary": "bg-blue-600 text-white hover:bg-blue-700",
    "btn-secondary": "bg-gray-200 text-gray-800 hover:bg-gray-300",
    "card": "bg-white rounded-xl shadow-lg p-6",
    "code-block": "bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto",
  },
} as Options;