import { globalIgnores } from 'eslint/config'
import { defineConfigWithVueTs, vueTsConfigs } from '@vue/eslint-config-typescript'
import pluginVue from 'eslint-plugin-vue'
import skipFormatting from '@vue/eslint-config-prettier/skip-formatting'

// To allow more languages other than `ts` in `.vue` files, uncomment the following lines:
// import { configureVueProject } from '@vue/eslint-config-typescript'
// configureVueProject({ scriptLangs: ['ts', 'tsx'] })
// More info at https://github.com/vuejs/eslint-config-typescript/#advanced-setup

export default defineConfigWithVueTs(
  {
    name: 'app/files-to-lint',
    files: ['**/*.{ts,mts,tsx,vue}'],
  },

  globalIgnores(['**/dist/**', '**/dist-ssr/**', '**/coverage/**']),

  // 🔹 跳過與 Prettier 衝突的規則
  skipFormatting,
  {
    rules: {
      '@typescript-eslint/no-explicit-any': 'off', // 允許使用 any 類型
      '@typescript-eslint/no-namespace': 'off', // 允許使用 namespace
    },
  },

  pluginVue.configs['flat/essential'],
  vueTsConfigs.recommended,
  skipFormatting
)
