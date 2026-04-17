import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import viteCompression from 'vite-plugin-compression'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import VueRouter from 'unplugin-vue-router/vite'

export default defineConfig(({ mode }) => {
  return {
    base: '/',

    plugins: [
      /**
       * ✅ 自动路由插件
       */
      VueRouter({
        routesFolder: 'src/views',
        extensions: ['.vue'],
        dts: 'src/typed-router.d.ts',
      }),

      vue(),

      /**
       * Element Plus 按需
       */
      AutoImport({
        resolvers: [ElementPlusResolver()],
      }),
      Components({
        resolvers: [ElementPlusResolver()],
      }),

      /**
       * gzip
       */
      viteCompression({
        algorithm: 'gzip',
      }),
    ],

    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },

    server: {
      port: 3000,
      open: false,
    },

    build: {
      chunkSizeWarningLimit: 1000,

      rollupOptions: {
        output: {
          manualChunks: {
            vue: ['vue', 'vue-router', 'pinia'],
            element: ['element-plus'],
            echarts: ['echarts'],
          },
        },
      },
    },

    optimizeDeps: {
      include: ['vue', 'vue-router', 'pinia'],
    },

    esbuild: {
      drop: mode === 'production' ? ['console', 'debugger'] : [],
    },
  }
})