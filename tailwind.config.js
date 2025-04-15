module.exports = {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'neon-blue': '#00f3ff',
        'neon-purple': '#bc13fe',
        'dark-bg': '#0a0a0f',
        'dark-surface': '#1a1a2e',
        'dark-border': '#2a2a4a',
        'neon-text': '#e5e7eb',
      },
      fontFamily: {
        'tech': ['Orbitron', 'sans-serif'],
        'main': ['Rajdhani', 'sans-serif'],
        'code': ['Fira Code', 'monospace']
      },
      animation: {
        'bounce': 'bounce 1s infinite',
        'pulse': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'neon-pulse': 'neon-pulse 1.5s ease-in-out infinite',
        'text-gradient': 'text-gradient 3s ease infinite',
        'fadeInOut': 'fadeInOut 2.5s ease-in-out'
      },
      keyframes: {
        'neon-pulse': {
          '0%, 100%': {
            opacity: '1',
            filter: 'drop-shadow(0 0 2px rgba(188, 19, 254, 0.8))'
          },
          '50%': {
            opacity: '0.8',
            filter: 'drop-shadow(0 0 8px rgba(188, 19, 254, 0.4))'
          }
        },
        'text-gradient': {
          '0%, 100%': {
            'background-position': '0% 50%'
          },
          '50%': {
            'background-position': '100% 50%'
          }
        },
        'fadeInOut': {
          '0%, 100%': {
            opacity: '0',
            transform: 'translateY(10px)'
          },
          '10%, 90%': {
            opacity: '1',
            transform: 'translateY(0)'
          }
        }
      },
      backgroundImage: {
        'neon-gradient': 'linear-gradient(45deg, #bc13fe, #00f3ff, #bc13fe)',
        'dark-mesh': 'radial-gradient(circle at center, #0a0a0f 0%, #1a1a2e 100%)'
      },
      userSelect: {
        'text': 'text',
        'auto': 'auto',
        'none': 'none'
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    function ({ addUtilities }) {
      addUtilities({
        '.scrollbar-thin': {
          'scrollbar-width': 'thin',
          'scrollbar-color': '#bc13fe #0a0a0f'
        },
        '.scrollbar-thumb-neon-purple': {
          '&::-webkit-scrollbar-thumb': {
            'background-color': '#bc13fe',
            'border-radius': '8px',
            'border': '2px solid #0a0a0f'
          }
        },
        '.scrollbar-track-dark-surface': {
          '&::-webkit-scrollbar-track': {
            'background': '#1a1a2e'
          }
        },
        // Novas utilidades de seleção de texto
        '.select-text': {
          'user-select': 'text'
        },
        '.select-none': {
          'user-select': 'none'
        }
      })
    }
  ]
}