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
        'electric-blue': '#0066FF',
        'hot-pink': '#FF0080',
        'vibrant-purple': '#8B5CF6',
        'neon-cyan': '#00D9FF',
        'bright-orange': '#FF6B35',
      },
      boxShadow: {
        'glow-purple': '0 0 30px rgba(139, 92, 246, 0.3)',
        'glow-purple-lg': '0 0 50px rgba(139, 92, 246, 0.5)',
        'glow-pink': '0 0 30px rgba(236, 72, 153, 0.3)',
        'glow-pink-lg': '0 0 50px rgba(236, 72, 153, 0.5)',
        'glow-blue': '0 0 30px rgba(59, 130, 246, 0.3)',
      },
    },
  },
  plugins: [],
}
