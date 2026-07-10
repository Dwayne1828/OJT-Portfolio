/** @type {import('tailwindcss').Config} */
export default {
  content: [
  './index.html',
  './src/**/*.{js,ts,jsx,tsx}'
],
  theme: {
    extend: {
      colors: {
        brand: {
          blue: "#3b82f6", // accessible blue on dark
          maroon: "#dc2626", // rich red accent
          slate: {
            50: "#f8fafc",
            100: "#f1f5f9",
            200: "#e2e8f0",
            400: "#94a3b8",
            500: "#64748b",
            700: "#334155",
            800: "#1e293b",
            900: "#0f172a",
            950: "#0b1120",
          }
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      backgroundImage: {
        'grid-pattern': "url(\"data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 .5H40M.5 0V40' stroke='%231e293b' stroke-opacity='0.5'/%3E%3C/svg%3E\")",
      }
    },
  },
  plugins: [],
}