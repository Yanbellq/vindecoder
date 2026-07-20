import { defineConfig } from 'vite';
import react, { reactCompilerPreset } from '@vitejs/plugin-react';
import babel from '@rolldown/plugin-babel';
import path from 'path';

const hotlineApiUrl = 'https://hotline.finance/api/';

// https://vite.dev/config/
export default defineConfig({
  server: {
    port: 3000,
    proxy: {
      '/api-hotline': {
        target: hotlineApiUrl,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api-hotline/, ''),
      },
    },
  },
  plugins: [react(), babel({ presets: [reactCompilerPreset()] })],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
