/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        heading: ['Playfair Display', 'serif'],
        body: ['Lora', 'serif'],
      },
      colors: {
        // BookWorm 4-Color Palette
        primary: '#8B4513',      // Saddle Brown - main brand color
        secondary: '#D2691E',    // Chocolate - accent color
        accent: '#F4A460',       // Sandy Brown - highlights
        neutral: '#2C1810',      // Dark Brown - text/dark elements
      },
    },
  },
  plugins: [],
}
