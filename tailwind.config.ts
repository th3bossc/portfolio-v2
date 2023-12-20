import type { Config } from 'tailwindcss'
import plugin from 'tailwindcss/plugin'

const backfaceVisibility = plugin(({ addUtilities }) => {
  const newUtilities = {
    '.backface-visible': {
      'backface-visibility': 'visible',
      '-webkit-backface-visibility': 'visible',
    },
    '.backface-hidden': {
      'backface-visibility': 'hidden',
      '-webkit-backface-visibility': 'hidden',
    },
  }
  addUtilities(newUtilities)
})

const config: Config = {
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
    },
  },
  plugins: [backfaceVisibility],
}
export default config
