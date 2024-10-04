/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      animation: {
        stroke: 'stroke 4s linear infinite',
      },
      keyframes: {
        stroke: {
          '0%, 100%': {
            strokeDashoffset: 440,
          },
          '50%': {
            strokeDashoffset: 0,
          },
          '50.1%': {
            strokeDashoffset: 880,
          },
        },
      },
    },
  },
  plugins: [],
};
