import { fileURLToPath, URL } from 'node:url'
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import Unocss from 'unocss/vite'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // 載入對應模式的 .env 檔案
  const env = loadEnv(mode, process.cwd())

  return {
    plugins: [vue(), vueDevTools(), Unocss()],
    base: '/', // 設定基礎路徑為相對路徑
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    server: {
      proxy: {
        '/api': {
          target: env.VITE_API_BACKEND_URL, // 使用載入的環境變數
          changeOrigin: true,
          rewrite: path => path.replace(/^\/api/, ''), // 如果後端 API 路徑不包含 `/api`，則移除
        },
      },
    },
  }
})
