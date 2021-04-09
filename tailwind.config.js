module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      white: '#fff',
      black: '#000',
      black1: '#0c1617',
      black2: '#222626',
      lightgray: '#a4a8a8',
      orange: '#fcba0c',
      skyblue: '#b4f0ff',
      blue: '#00ccff',
      lightgreen: '#cfffdb',
      green: '#03721f',
      violet: '#333e54',
      gray: '#757373',
      darkgray: '#7a7a7a',
      offWhite: '#f9f9fd',
      red: '#cd051d',
      border: '#c4c4c4',
    },
    extend: {},
  },
  variants: {
    extend: {
      backgroundColor: ['checked'],
      borderColor: ['checked'],
    },
  },
  plugins: [],
}
