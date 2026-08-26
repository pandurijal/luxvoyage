import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
      // Duitku sandbox doesn't send CORS headers, so proxy through Vite for dev.
      // Production needs a server-side proxy.
      proxy: {
        '/duitku-api': {
          target: 'https://sandbox.duitku.com',
          changeOrigin: true,
          secure: true,
          rewrite: (path) => path.replace(/^\/duitku-api/, ''),
        },
      },
    },
  };
});
