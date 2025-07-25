/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: '#EFE1E8',
        orchid: '#7E3680',
        indigo: '#420264',
        violet: '#A654DF',        
      },
    },
  },
  plugins: [],
}

