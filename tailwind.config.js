const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: [
    './index.html',
    './src/**/*.{vue,js}',
    './node_modules/@gydeapp/shared/components/**/*.{vue,js}',
    './node_modules/@gydeapp/shared/views/**/*.{vue,js}'
  ],
  theme: {
    screens: {
      xxs: '315px',
      xs: '375px',
      sm: '600px',
      md: '768px',
      lg: '1160px',
      xl: '1260px'
    },
    extend: {
      colors: {
        main: {
          DEFAULT: 'var(--main-color)'
        },
        black: {
          DEFAULT: '#242323'
        },
        green: {
          DEFAULT: '#43e095'
        },
        brown: {
          DEFAULT: '#B1A08F'
        },
        gray: {
          DEFAULT: '#A1A1A1'
        },
        red: {
          DEFAULT: '#EF443A'
        }
      },
      fontFamily: {
        sans: ['Gilroy', ...defaultTheme.fontFamily.sans],
        sf: ['SFProDisplay', ...defaultTheme.fontFamily.sans]
      },
      letterSpacing: {
        '02': '0.2px',
        '04': '0.4px'
      },
      zIndex: {
        100: '100',
        200: '200'
      }
    }
  },
  plugins: [require('@tailwindcss/line-clamp')]
}
