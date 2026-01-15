import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // ... otras configuraciones del servidor
    proxy: {
      // Si tu fetch usa '/api/...'
      "/api": {
        // ➡️ Apunta al origen real de tu backend (ahora en 8000)
        target: "http://localhost:8000",
        changeOrigin: true, // Requerido para virtual hosting
        secure: false,
      },
    },
  },
});
