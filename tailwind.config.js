module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'brand-dark': '#1b1a27',
        'brand-med-dark': '#2c293b',
        'brand-green': '#aaf398',
        'brand-purple': '#5f5c6e',
        'brand-light': '#cdc7dc',
        'brand-salmon': '#c87771',
        'brand-salmon-darker': '#a7534d'
      },
      w: {
        '104': '26rem',
      }
    },
  },
  plugins: [],
}
