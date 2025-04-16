// uno.config.ts
import { defineConfig, presetAttributify, presetIcons } from 'unocss'
import presetWind3 from '@unocss/preset-wind3'

export default defineConfig({
  presets: [
    presetWind3(), // 取代 presetUno，完全支援 Tailwind v3 utility class
    presetAttributify(), // 支援 [flex] [text-center] 類語法
    presetIcons(), // icon 支援
  ],
})
