// tailwind.config.js

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    // Esta línea es esencial: apunta a todos los archivos que Tailwind debe revisar.
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: "var(--color-primary)",
        secondary: "var(--color-secondary)",
        accent: "var(--color-accent)",
        background: "var(--color-background)",
        "background-secondary": "var(--color-background-secondary)",
        "background-focus": "var(--color-background-focus)",
        text: "var(--color-text)",
      },
    },
  },
  plugins: [],
};
