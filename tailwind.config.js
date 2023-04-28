/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        'satoshi': ['satoshi', 'sans-serif'],
        'satoshi-bold': ['satoshixl', 'sans-serif'],
        'satoshi-semibold': ['satoshil', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
