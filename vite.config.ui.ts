import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';
import { viteSingleFile } from 'vite-plugin-singlefile';
import react from '@vitejs/plugin-react';

// UI thread: everything inlined into dist/ui.html, which manifest.json points at.
export default defineConfig(({ mode }) => ({
  root: 'src/ui',
  base: './',
  plugins: [react(), viteSingleFile()],
  build: {
    outDir: '../../dist',
    emptyOutDir: false,
    target: 'es2020',
    minify: mode === 'production',
    sourcemap: false,
    // Absolute: rollup input paths are not resolved against `root`.
    rollupOptions: { input: fileURLToPath(new URL('./src/ui/ui.html', import.meta.url)) },
  },
}));
