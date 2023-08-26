import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import Components from 'unplugin-vue-components/vite';
import AutoImports from 'unplugin-auto-import/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImports({
      imports: [
        { pinia: ['defineStore'] },
        { vue: ['computed', 'defineAsyncComponent', 'onMounted', 'ref', 'toRefs', 'watch'] },
        'vue-router',
      ],
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
