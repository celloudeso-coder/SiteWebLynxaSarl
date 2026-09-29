import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  // This changes the out put dir from dist to build
  // comment this out if that isn't relevant for your project
  build: {
    outDir: "dist",
    // chunkSizeWarningLimit: 2000,
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          // Add other large dependencies here
        }
      }
    }
  },
  plugins: [tsconfigPaths(), react()],
  server: {
    port: "4038",
    host: "0.0.0.0",
    strictPort: true,
    // Hôte ngrok figé d'une session de démo passée, retiré. Pour exposer le
    // serveur de dev via un tunnel (ngrok, etc.), positionner
    // VITE_DEV_ALLOWED_HOSTS (liste d'hôtes séparés par des virgules) dans
    // l'environnement local plutôt que de committer un domaine en dur.
    ...(process.env.VITE_DEV_ALLOWED_HOSTS
      ? { allowedHosts: process.env.VITE_DEV_ALLOWED_HOSTS.split(",").map((h) => h.trim()).filter(Boolean) }
      : {})
  }
}));
