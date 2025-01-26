/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        'primary': "#FF9100",
        'secondary': "#16AF89",
        'green': "#2DCC52",
        'darkblue': "#3C279C",
        'grayblue': "#45348C",
        'black': "#0A090F",
        'dark': "rgb(27, 33, 31)",
        'secondary-dark': "#0D6952"
      }
    },
  },
  plugins: [],
}
