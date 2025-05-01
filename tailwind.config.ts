import { Config } from 'tailwindcss'

const config: Config = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        border: 'var(--border)',
        primary: {
          DEFAULT: 'var(--primary)',
          foreground: 'var(--primary-foreground)',
        },
      },
      fontFamily: {
        serifDisplay: ['"DM Serif Display"', 'sans-serif'],
        manrope: ['"Manrope"', 'sans-serif'],
      },
    },
  },
}

export default config
