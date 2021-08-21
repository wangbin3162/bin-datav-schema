import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue()
  ],
  server: {
    port: 9090,
    open: true,
    // proxy: {
    //   '/admin': { target: 'http://localhost:8088/cms' }
    // }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  optimizeDeps: {
    include: [
      'axios',
      'vue',
      'vue-router',
      'vuex',
    ],
    //'dayjs','echarts','bin-ui-next','js-cookie','mockjs',
    exclude: [],
  },
  build: {
    sourcemap: false,
    outDir: 'website',
    rollupOptions: {
      output: {
        manualChunks: {},
      },
    },
  },
})
