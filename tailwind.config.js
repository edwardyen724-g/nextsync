const tailwindcss = require('tailwindcss');

module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}', 
    './components/**/*.{js,ts,jsx,tsx}', 
    './pages/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        primary: '#3B82F6', // Tailwind blue-600
        secondary: '#FBBF24', // Tailwind yellow-400
        accent: '#F43F5E', // Tailwind rose-500
      },
      spacing: {
        128: '32rem',
        144: '36rem',
      },
    },
  },
  plugins: [
    tailwindcss,
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
};