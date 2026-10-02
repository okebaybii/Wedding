/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        paper: {
          light: '#FDFBF7',
          DEFAULT: '#FAF6F0',
          dark: '#F0EAE1',
        },
        gold: {
          light: '#DFBF7A',
          DEFAULT: '#C8A86B',
          dark: '#A68545',
        },
        burgundy: {
          light: '#8E343A',
          DEFAULT: '#72262B',
          dark: '#54191D',
        },
        emerald: {
          light: '#284E3F',
          DEFAULT: '#1A3329',
          dark: '#0F211A',
        },
        champagne: {
          light: '#F3E5E0',
          DEFAULT: '#EAD5CD',
          dark: '#C58B7E',
        },
        charcoal: {
          DEFAULT: '#2D2A26',
          muted: '#635F59',
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', '"Cormorant Garamond"', 'serif'],
        display: ['"Cinzel"', '"Playfair Display"', 'serif'],
        script: ['"Great Vibes"', 'cursive'],
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        }
      },
      animation: {
        float: 'float 4s ease-in-out infinite',
        shimmer: 'shimmer 3s ease-in-out infinite',
      }
    },
  },
  plugins: [],
}
