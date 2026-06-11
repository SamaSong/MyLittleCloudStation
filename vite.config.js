import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import vueJsx from '@vitejs/plugin-vue-jsx'
import markdown from 'vite-plugin-md'
import cesium from 'vite-plugin-cesium'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue({
      include: [/\.vue$/, /\.md$/], // 将.md文件视为Vue组件
    }),
    vueDevTools(),
    vueJsx(),
    markdown(),
    cesium()
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  build: {
    target: 'es2015',
    minify: 'terser',
    // chunk 大小警告限制
    chunkSizeWarningLimit: 1000,
    // 代码压缩
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    },
    // 生成 sourcemap
    sourcemap: false,
    // 打包报告
    reportCompressedSize: true,
    rollupOptions: {
      output: {
        // 自定义 chunk 文件名格式
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: 'assets/[ext]/[name]-[hash].[ext]',
        manualChunks(id) {
          if (!id.includes('node_modules')) return
          if (id.includes('cesium')) return 'vendor-cesium'
          if (id.includes('element-plus') || id.includes('@element-plus')) return 'vendor-element'
          if (id.includes('vue') || id.includes('pinia')) return 'vendor-vue'
          if (id.includes('highlight.js') || id.includes('mockjs') || id.includes('lodash')) {
            return 'vendor-utils'
          }
        },
      },
    }
  }
})
