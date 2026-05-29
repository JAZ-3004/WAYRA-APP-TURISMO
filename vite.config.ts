import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig, loadEnv } from 'vite';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '');
  return {
    plugins: [react(), tailwindcss()],
    define: {
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    // Base explícita: necesaria para que el manifest y el SW
    // funcionen correctamente en producción
    base: '/',
    server: {
      // HMR desactivado en AI Studio mediante DISABLE_HMR
      hmr: process.env.DISABLE_HMR !== 'true',
      port: 3000,
      host: '0.0.0.0',
    },
    build: {
      // Genera .vite/manifest.json para referencia de assets
      manifest: true,
      // Asegura que el SW se copie al output
      copyPublicDir: true,
      rollupOptions: {
        output: {
          // Nombres de archivos predecibles para cacheo del SW
          entryFileNames: 'assets/[name]-[hash].js',
          chunkFileNames: 'assets/[name]-[hash].js',
          assetFileNames: 'assets/[name]-[hash].[ext]',
        },
      },
    },
  };
});