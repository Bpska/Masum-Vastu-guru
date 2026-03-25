/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        maroon: {
          DEFAULT: '#7F0404',
          dark: '#5a0303',
          light: '#9a1a1a',
        },
        yellow: {
          DEFAULT: '#F4BB00',
          dark: '#d4a200',
          light: '#ffe066',
        },
        border: '#E0E0E0',
        'text-dark': '#333333',
        'text-mid': '#666666',
        'bg-light': '#F5F5F5',
      },
      fontFamily: {
        playfair: ['"Playfair Display"', 'serif'],
        poppins: ['"Poppins"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
