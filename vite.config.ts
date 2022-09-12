import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// ElementUI-plus
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import ElementPlus from 'unplugin-element-plus/vite'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    
    // ElementUI-plus
    AutoImport({
      resolvers: [
        ElementPlusResolver(),
        // 自动导入图标组件
        IconsResolver({
          prefix: 'Icon',
      }),],
    }),
    Components({
      resolvers: [
        ElementPlusResolver(),
        IconsResolver({
          enabledCollections: ['ep'],
        }),
      ],
    }),
    ElementPlus(),
    Icons({
      autoInstall: true,
    })
  ],
  server: {
    // 可以写任何类型
    proxy: {
      '/api': 'http://seec.xinyuefei.com'
    }
  }
})
