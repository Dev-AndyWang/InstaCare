/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'display': ['"Space Grotesk"', 'sans-serif'],
        'sans': ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        // Warm Pastel Color System
        'soft-blush': '#FFD5E5',
        'lavender': '#E6D5FF',
        'sky-blue': '#D5E8FF',
        'mint-green': '#D5FFE8',
        'butter-yellow': '#FFF4D5',
        'peach-coral': '#FFDFD5',
        'cream': '#FFF8F0',
        // Improved Text Contrast Colors
        'dark-charcoal': '#1F1F1F',      // For maximum contrast headings
        'warm-charcoal': '#2D2D2D',      // Primary headings (darkened from #2C2B2A)
        'text-primary': '#3D3D3D',       // Body text with good contrast
        'warm-gray': '#4A4A4A',          // Secondary text (darkened from #5A5856)
        'text-secondary': '#5A5A5A',     // Tertiary text
        'light-warm-gray': '#666666',    // Light text (darkened from #9E9C9A)
        'very-light-gray': '#E8E6E4',
        // Border colors for better visibility
        'border-light': '#D8D8D8',
        'border-medium': '#D0D0D0',
        'border-dark': '#C8C8C8',
      },
      boxShadow: {
        // Pastel Glows
        'glow-pink': '0 0 30px rgba(255, 213, 229, 0.3)',
        'glow-pink-lg': '0 0 50px rgba(255, 213, 229, 0.5)',
        'glow-lavender': '0 0 30px rgba(230, 213, 255, 0.3)',
        'glow-lavender-lg': '0 0 50px rgba(230, 213, 255, 0.5)',
        'glow-blue': '0 0 30px rgba(213, 232, 255, 0.3)',
        'glow-blue-lg': '0 0 50px rgba(213, 232, 255, 0.5)',
        // Soft shadows for cards and elements
        'card-soft': '0 2px 8px rgba(0, 0, 0, 0.08)',
        'card-medium': '0 2px 12px rgba(0, 0, 0, 0.12)',
        'card-hover': '0 4px 16px rgba(0, 0, 0, 0.15)',
        'button-soft': '0 2px 6px rgba(0, 0, 0, 0.12)',
      },
    },
  },
  plugins: [],
}
