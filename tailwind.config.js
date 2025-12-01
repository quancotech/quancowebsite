/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './*.html',
    './*.js',
    './*.ts',
    './*.tsx',
  ],
  theme: {
    extend: {
      colors: {
        'primary-bg': '#000000',
        'accent-blue': '#007FFF',
        'highlight-gold': '#daa627',
      },
      fontFamily: {
        'inter': ['Inter', 'sans-serif'],
        'space-mono': ['Space Mono', 'monospace'],
      },
      animation: {
        'fade-in-up': 'fadeInUp 1s ease-out',
        'fade-in-left': 'fadeInLeft 1s ease-out',
        'fade-in-right': 'fadeInRight 1s ease-out',
        'pulse': 'pulse 2s infinite',
        'float': 'float 3s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite',
        'particle-float': 'particleFloat 8s linear infinite',
        'slide-in-left': 'slideInFromLeft 1s ease-out',
        'slide-in-right': 'slideInFromRight 1s ease-out',
        'slide-in-bottom': 'slideInFromBottom 1s ease-out',
        'fade-in-scale': 'fadeInScale 1s ease-out',
        'glow-pulse': 'glowPulse 2s ease-in-out infinite',
        'card-float': 'cardFloat 3s ease-in-out infinite',
        'icon-bounce': 'iconBounce 0.6s ease-in-out',
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        fadeInRight: {
          '0%': { opacity: '0', transform: 'translateX(30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        pulse: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glow: {
          '0%, 100%': { boxShadow: '0 0 5px #daa627' },
          '50%': { boxShadow: '0 0 20px #daa627, 0 0 30px #daa627' },
        },
        particleFloat: {
          '0%': { transform: 'translateY(100vh) rotate(0deg)', opacity: '0' },
          '10%': { opacity: '1' },
          '90%': { opacity: '1' },
          '100%': { transform: 'translateY(-100vh) rotate(360deg)', opacity: '0' },
        },
        slideInFromLeft: {
          '0%': { opacity: '0', transform: 'translateX(-100px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideInFromRight: {
          '0%': { opacity: '0', transform: 'translateX(100px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideInFromBottom: {
          '0%': { opacity: '0', transform: 'translateY(50px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInScale: {
          '0%': { opacity: '0', transform: 'scale(0.8)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        glowPulse: {
          '0%, 100%': { textShadow: '0 0 5px rgba(218, 166, 39, 0.5)' },
          '50%': { textShadow: '0 0 20px rgba(218, 166, 39, 0.8), 0 0 30px rgba(218, 166, 39, 0.6)' },
        },
        cardFloat: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        iconBounce: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.1)' },
        },
      },
    },
  },
  plugins: [],
};
