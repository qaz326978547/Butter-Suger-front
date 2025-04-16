import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import Unocss from 'unocss/vite'
import { presetAttributify, presetIcons } from 'unocss'
import presetWind3 from '@unocss/preset-wind3'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), vueDevTools(), Unocss()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8080', // 後端伺服器地址
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/, ''), // 如果後端 API 路徑不包含 `/api`，則移除
      },
    },
  },
})
