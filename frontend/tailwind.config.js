export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        lora: ['Lora', 'serif'],
      },
      colors: {
        sage: '#A3B18A',
        olive: '#588157',
        soil: '#3A2E2E',
        peach: '#FFD6BA',
        sky: '#A9D6E5',
        mint: '#D8F3DC',
      },
    },
  },
  plugins: [],
}