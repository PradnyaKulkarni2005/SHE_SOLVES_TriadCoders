import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  define: {
    'import.meta.env.VITE_API_URL': JSON.stringify(
      process.env.NODE_ENV === "production"
        ? "https://she-solves-triad-coders.vercel.app/api"  // Replace with your actual hosted backend URL
        : "http://localhost:5000/api"
    ),
  },
});
