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
          light: '#FFFFFF', // Pure porcelain white
          DEFAULT: '#F2F6FA', // Serene dusty blue / French ivory
          dark: '#E2EAF1', // Soft pale slate blue
        },
        gold: {
          light: '#E4CA88',
          DEFAULT: '#CCA968',
          dark: '#A38140',
        },
        burgundy: {
          // Re-mapped to Royal French Slate Blue & Deep Navy as requested from user's wedding photo
          light: '#477098', // Gentle slate blue
          DEFAULT: '#254465', // Royal French slate blue
          dark: '#15293E', // Midnight velvet navy
        },
        emerald: {
          light: '#3C6B88',
          DEFAULT: '#234A62',
          dark: '#142E40',
        },
        champagne: {
          light: '#EDF4F9',
          DEFAULT: '#DCE7F0',
          dark: '#B3C8DA',
        },
        charcoal: {
          DEFAULT: '#1E293B', // Slate charcoal
          muted: '#546A80', // Elegant slate blue-grey
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
