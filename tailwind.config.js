/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
        display: ['Syne', 'sans-serif'],
      },
      colors: {
        dark: {
          bg: '#0a0a0c',
          card: '#121215',
          border: '#232328',
          text: '#f4f4f6',
          muted: '#8e8e99',
        },
        light: {
          bg: '#fafafa',
          card: '#ffffff',
          border: '#e4e4e7',
          text: '#09090b',
          muted: '#71717a',
        },
        accent: {
          DEFAULT: '#3b82f6',
          emerald: '#10b981',
          orange: '#f97316',
        }
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 4s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        }
      }
    },
  },
  plugins: [],
}
