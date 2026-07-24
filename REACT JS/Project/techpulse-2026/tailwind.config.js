/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        space: {
          950: '#080A12',
          900: '#0B0E17',
          800: '#131826',
          700: '#1B2233',
          600: '#252E44',
        },
        aurora: {
          DEFAULT: '#4FD1C5',
          light: '#7EE8DB',
          dark: '#2CA79A',
        },
        nebula: {
          DEFAULT: '#8B5CF6',
          light: '#A78BFA',
        },
        flare: {
          DEFAULT: '#F5A623',
        },
        mist: {
          DEFAULT: '#E8EAF0',
          muted: '#8A93A6',
        },
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      backgroundImage: {
        'aurora-mesh': 'radial-gradient(ellipse 80% 50% at 20% 0%, rgba(79,209,197,0.20), transparent 60%), radial-gradient(ellipse 60% 50% at 80% 10%, rgba(139,92,246,0.18), transparent 60%), radial-gradient(ellipse 60% 40% at 50% 100%, rgba(245,166,35,0.08), transparent 60%)',
      },
      keyframes: {
        float: {
          '0%,100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-14px)' },
        },
        'float-slow': {
          '0%,100%': { transform: 'translateY(0px) translateX(0px)' },
          '50%': { transform: 'translateY(-20px) translateX(10px)' },
        },
        drift: {
          '0%': { transform: 'translateX(-10%)' },
          '100%': { transform: 'translateX(110%)' },
        },
        'spin-slow': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        reveal: {
          '0%': { opacity: 0, transform: 'translateY(24px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        twinkle: {
          '0%,100%': { opacity: 0.2 },
          '50%': { opacity: 1 },
        },
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        'float-slow': 'float-slow 9s ease-in-out infinite',
        drift: 'drift 18s linear infinite',
        'spin-slow': 'spin-slow 40s linear infinite',
        reveal: 'reveal 0.7s cubic-bezier(0.16,1,0.3,1) forwards',
        shimmer: 'shimmer 2.5s linear infinite',
        twinkle: 'twinkle 3s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
