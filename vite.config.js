import { loadEnv, defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import glsl from 'rollup-plugin-glsl'

function pathResolve(dir) {
  return resolve(process.cwd(), '.', dir)
}

// const proxyAddress = {
//   target: 'http://192.168.0.118:5850/',
//   // target: 'http://192.168.0.121:8850/',
//   changeOrigin: true,
// }

// https://vitejs.dev/config/
export default ({ mode }) => {
  const dirRoot = process.cwd()

  const env = loadEnv(mode, dirRoot)

  return defineConfig({
    base: env.VITE_PUBLIC_PATH,
    plugins: [
      vue(),
      glsl({
        // By default, everything gets included
        include: '**/*.glsl',
        // Undefined by default
        exclude: ['**/index.html'],
        // Source maps are on by default
        // sourceMap: false,
      }),
    ],
    server: {
      host: '0.0.0.0',
      port: 8086,
      open: true,
      proxy: {
        // '/auth': proxyAddress,
        // '/oauth': proxyAddress,
        // '/user': proxyAddress,
        // '/management': proxyAddress,
      },
    },
    resolve: {
      alias: {
        '@': pathResolve('./src'),
      },
    },
    optimizeDeps: {
      include: [
        'axios',
        'vue',
        'vue-router',
        'pinia',
        'dayjs',
        'echarts',
        'bin-ui-design',
        'js-cookie',
        'mockjs',
        'brace',
        'three',
        'gsap',
      ],
      exclude: [],
    },
    build: {
      sourcemap: false,
      outDir: 'docs',
      rollupOptions: {
        output: {
          chunkFileNames: 'static/js/[name]-[hash].js',
          entryFileNames: 'static/js/[name]-[hash].js',
          assetFileNames: 'static/[ext]/[name]-[hash].[ext]',
          manualChunks(id) {
            if (id.includes('/node_modules/')) {
              // 设置需要独立打包的npm包
              const expansions = [
                'bin-ui-design',
                'bin-datav',
                'brace',
                'particles.vue3',
                'mockjs',
                'three',
                'gsap',
              ]
              const c = expansions.find(exp => id.includes(`/node_modules/${exp}`))
              if (c) {
                return `chunk-${c}`
              } else {
                return 'vendor'
              }
            }
          },
        },
      },
      // Turning off brotliSize display can slightly reduce packaging time
      brotliSize: false,
      chunkSizeWarningLimit: 2000,
    },
  })
}
