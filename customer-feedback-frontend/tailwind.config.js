/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'bg-1': '#0f1724',
        'bg-2': '#081023',
        'accent-1': '#7c3aed',
        'accent-2': '#06b6d4',
        'muted': 'rgba(255,255,255,0.65)',
        'text-primary': '#f8fbff',
        'text-muted': 'rgba(255,255,255,0.45)',
      },
      fontFamily: {
        'inter': ['Inter', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial'],
      },
    },
  },
  plugins: [],
}

