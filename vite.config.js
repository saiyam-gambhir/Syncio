import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import AutoImport from 'unplugin-auto-import/vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      // global imports to register
      imports: [
        { vue: ['computed', 'defineAsyncComponent', 'onMounted', 'ref', 'toRefs', 'watch',] },
        'vue-router'
      ]
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    }
  },

  server: {
    hmr: {
      protocol: 'ws',
      host: 'localhost'
    }
  }
})
