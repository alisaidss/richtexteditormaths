import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ['katex', 'quill-image-resize-module-react'],
    exclude: ['lucide-react'],
  },
});
