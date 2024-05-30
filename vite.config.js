import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import Components from 'unplugin-vue-components/vite';
import AutoImports from 'unplugin-auto-import/vite'

export default defineConfig({
  plugins: [
    vue(),
    AutoImports({
      imports: [
        { pinia: ['defineStore'] },
        { vue: ['computed', 'defineAsyncComponent', 'onMounted', 'ref', 'toRaw', 'toRefs', 'watch'] },
        'vue-router',
      ],
      dirs: [
        './src/composables/**',
        './src/views/*/composables/**',
        './src/stores/**',
      ]
    }),
    Components({
      dirs: ['./src'],
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      'auth': fileURLToPath(new URL('./src/stores/auth', import.meta.url)),
    },
  },

  server: {
    hmr: {
      protocol: 'ws',
      host: 'localhost'
    },
    port: 8080,
    host: true,
  }
})
