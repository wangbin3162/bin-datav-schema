<template>
  <div class="screen-wrapper">
    <div class="dv-loading" v-show="loading">
      <g-loading spinning></g-loading>
    </div>
    <div class="dv-layout" :style="{ visibility: loading ? 'hidden' : 'visible' }">
      <div class="scene">
        <div
          class="dv-com absolute"
          v-for="com in comps"
          :key="com.id"
          :style="{
            left: com.attr.x + 'px',
            top: com.attr.y + 'px',
            width: com.attr.w + 'px',
            height: com.attr.h + 'px',
            opacity: com.attr.opacity,
            transform: `rotate(${com.attr.rotate}deg)`,
          }"
        >
          <component :is="com.name" :data="com" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import useSchemaStore from '@/hooks/schema/useSchemaStore'
import { onMounted, ref } from 'vue'
import { loadScreen } from '@/api/database.api'
import { useRoute, useRouter } from 'vue-router'
import GLoading from '@/components/Schema/ui/g-loading/index.vue'
import { on, setStyle } from '@/utils/util'

export default {
  name: 'Screen',
  components: { GLoading },
  setup() {
    const $router = useRouter()
    const $route = useRoute()
    const { loadScreenData, pageConfig, comps } = useSchemaStore()
    const loading = ref(false)

    const resize = () => {
      const width = pageConfig.value.width
      const ratio = document.documentElement.clientWidth / width
      setStyle(document.body, {
        transform: `scale(${ratio})`,
        transformOrigin: 'left top',
        backgroundSize: '100%',
      })
    }

    // 初始化screen数据
    const init = async () => {
      const { screenId: id } = $route.params
      if (!id) return
      try {
        loading.value = true
        const res = await loadScreen(id)
        if (res.data) {
          await loadScreenData(res.data)
          setPageStyle(res.data)

          setTimeout(() => {
            loading.value = false
          }, 500)

          on(window, 'resize', resize)
        }
      } catch (e) {
        $router.push('/notfound')
      }
    }

    // 跟据screen数据设置page style
    const setPageStyle = (config) => {
      const { pageInfo } = config
      document.title = pageInfo.name
      document.querySelector('meta[name="viewport"]').setAttribute('content', `width=${pageConfig.value.width}`)

      setStyle(document.documentElement, {
        overflowX: 'hidden',
        overflowY: 'visible',
      })
      setStyle(document.body, {
        width: `${pageConfig.value.width}px`,
        height: `${pageConfig.value.height}px`,
        backgroundImage: `url(${pageConfig.value.bgImage})`,
        backgroundColor: pageConfig.value.bgColor,
      })

      resize()
    }

    onMounted(() => {
      init()
    })

    return {
      loading,
      comps,
    }
  },
}
</script>

<style lang="stylus">
html, body {
  min-width: auto;
}
body::-webkit-scrollbar {
  display: none;
}
.screen-wrapper {
  width: 100%;
  height: 100vh;
}
.dv-loading {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #0f2a42;
  z-index: 2;
}
.dv-layout {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  visibility: hidden;

  .dv-com.absolute {
    position: absolute !important;
    margin: 0 !important;
  }
}
</style>
