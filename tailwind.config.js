/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'srm-blue': '#003F87',
        'srm-gold': '#D4AF37',
        'accent-teal': '#14B8A6',
        'accent-coral': '#FF6B6B',
        'accent-green': '#10B981',
        'accent-purple': '#8B5CF6',
        'bg-light': '#F9FAFB',
        'text-dark': '#1A1A1A',
        'text-gray': '#6B7280',
        'border-color': '#E5E7EB',
      },
      fontFamily: {
        'dm-sans': ['DM Sans', 'sans-serif'],
        'manrope': ['Manrope', 'sans-serif'],
        'sora': ['Sora', 'sans-serif'],
      }
    },
  },
  plugins: [],
}