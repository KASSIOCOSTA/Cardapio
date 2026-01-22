/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./**/*.{html,js}"],
  theme: {
    extend: {
      backgroundImage:{
      "home": "url('/img/bg.png')" /* aqui vai o fundo do cabeçalho */
      }
    },
  },
  plugins: [],
}

