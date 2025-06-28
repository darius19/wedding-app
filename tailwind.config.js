// tailwind.config.js
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['"Playfair Display"', 'serif'],
      },
      colors: {
        ivory: '#F4F4EF',
        cream: '#FFF7E1',
        sage: '#C4D7CF',
        greenish: '#97B4A5',
        deepgreen: '#5F7D5B',
      },
    },
  },
  plugins: [],
}
