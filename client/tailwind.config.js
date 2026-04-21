/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: 'var(--color-primary)',
        accent: 'var(--color-accent)',
        'bg-base': 'var(--color-bg)',
        'text-base': 'var(--color-text)',
        surface: 'var(--color-surface)',
        border: 'var(--color-border)',
        'primary-light': 'var(--color-primary-light)',
        'accent-light': 'var(--color-accent-light)',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Playfair Display', 'Georgia', 'serif'],
        vibes: ['Great Vibes', 'cursive'],
      },
    },
  },
  plugins: [],
}
