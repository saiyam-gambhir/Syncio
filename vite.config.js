import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';

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
    }),
    Components({
      dirs: ['./src']
    }),
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
