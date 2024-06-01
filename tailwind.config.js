import { Colours, Font } from './src/design-tokens'

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    fontWeight: Font.Weights,
    fontSize: {
      ...Font.Sizes.LargsScreens,
      ...Font.Sizes.SmallScreens
    },
    colors: { ...Colours },

    extend: {
      boxShadow: {
        md: '0px 4px 4px 0px rgba(19, 19, 20, 0.20);',
        lg: '0px 4px 6.1px 0px rgba(19, 19, 20, 0.20);'
      },
      backgroundImage: {
        'auth-layout': "url('./src/assets/images/auth-layout.jpg')"
      },
      // breakpoints are tailwinds default
      screens: {}
    }
  },
  plugins: []
}
