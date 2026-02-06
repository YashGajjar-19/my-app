/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // Scans all files in src for Tailwind classes
  ],
  theme: {
    extend: { 
      fontFamily: {
        sans: ['Roboto Flex', 'sans-serif'],
        funny: ['Fredoka', 'sans-serif'],
        hand: ['Patrick Hand', 'cursive'],
      },
    },
  },
  plugins: [],
}
