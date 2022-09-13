/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.tsx',
    './index.html',
  ],
  theme: {
    fontFamily: {
      sans:['Inter', 'sans-serif']
    },
    extend: {
      backgroundImage: {
        'nlw_gradient': "linear-gradient(89.86deg, #9572FC 15.08%, #43E7AD 25.94%, #E1D55D 55.57%)",
        galaxy: "url('/background_galaxy.png')",
        'game_gradient': "linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.9) 67.08%)",

      },
    },
  },
  plugins: [],
}
