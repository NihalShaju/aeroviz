/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: "#022a44",
          900: "#011a2b",
          700: "#0b4468",
          300: "#7d9bb3",
          100: "#dbe6ef",
          50: "#eef3f8",
        },
        pink: {
          DEFAULT: "#e02f78",
          700: "#b81f5e",
          100: "#fbd9e7",
          50: "#fef0f6",
        },
        page: "#022a44",
        ink: {
          DEFAULT: "#ffffff",
          muted: "#9bbad2",
        },
      },
      fontFamily: {
        heading: ["Outfit", "sans-serif"],
        body: ["DM Sans", "sans-serif"],
      },
      boxShadow: {
        glass: "0 1px 0 rgba(255,255,255,.9) inset, 0 30px 60px -28px rgba(2,42,68,.35)",
        glassHover: "0 1px 0 rgba(255,255,255,.95) inset, 0 35px 70px -24px rgba(2,42,68,.4)",
        pinkGlow: "0 10px 25px -5px rgba(224, 47, 120, 0.4)",
      },
      animation: {
        'float-slow': 'float 7s ease-in-out infinite',
        'float-mid': 'float 6s ease-in-out infinite',
        'float-fast': 'float 5s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        }
      }
    },
  },
  plugins: [],
}
