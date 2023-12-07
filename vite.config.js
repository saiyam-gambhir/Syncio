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
      'activityCenter': fileURLToPath(new URL('./src/stores/activityCenter', import.meta.url)),
      'auth': fileURLToPath(new URL('./src/stores/auth', import.meta.url)),
      'marketPlace': fileURLToPath(new URL('./src/stores/marketPlace', import.meta.url)),
      'orders': fileURLToPath(new URL('./src/stores/orders', import.meta.url)),
      'payouts': fileURLToPath(new URL('./src/stores/payouts', import.meta.url)),
      'payoutsSettings': fileURLToPath(new URL('./src/stores/payoutsSettings', import.meta.url)),
      'plan': fileURLToPath(new URL('./src/stores/plan', import.meta.url)),
      'products': fileURLToPath(new URL('./src/stores/products', import.meta.url)),
      'productSettings': fileURLToPath(new URL('./src/stores/productSettings', import.meta.url)),
    },
  },

  server: {
    hmr: {
      protocol: 'ws',
      host: 'localhost'
    }
  }
})
