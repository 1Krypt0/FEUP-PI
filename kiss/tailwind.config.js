module.exports = {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}'
  ],
  theme: {
    colors: {
      white: '#f7f9f7',
      black: '#191d24',
      accent: '#8c2d19',
      accent_blue: '#1F4690',
      accent_green: '#588157',
      accent_engineering: '#8c2d19',
      accent_purple: '#4D4C7D'
    },
    extend: {
      backgroundImage: {
        keyboard: 'url(assets/background.png)'
      },
      colors: {
        white: '#f7f9f7',
        black: '#191d24',
        accent: '#8c2d19'
      }
    }
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
    require('@tailwindcss/typography')
  ]
}
