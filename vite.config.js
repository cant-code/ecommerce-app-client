import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(() => {
  return {
    build: {
      outDir: 'build',
    },
    server: {
      proxy: {
        "/api": {
          target: "http://localhost:8080/",
          secure: false
        }
      }
    },
    plugins: [react()],
  };
});