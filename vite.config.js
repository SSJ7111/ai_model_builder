import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000, // Changed port from 5173 to 3000
    open: true, // Auto opens the browser
    strictPort: true, // Ensures Vite doesn't switch to a different port
    host: true, // Allows external devices on the network to access
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
    },
  },
});
