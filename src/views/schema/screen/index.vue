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
import { useStore } from '@/store'
import { ref } from 'vue'
import { loadScreenPreview } from '@/api/database.api'
import { useRoute, useRouter } from 'vue-router'
import GLoading from '@/components/Schema/ui/g-loading/index.vue'
import { on, setStyle } from '@/utils/util'
import { loadKanban } from '@/api/modules/analysis-dashboard.api'

export default {
  name: 'Screen',
  components: { GLoading },
  setup() {
    const router = useRouter()
    const route = useRoute()
    const { schemaStore, storeToRefs } = useStore()
    const { pageConfig, comps } = storeToRefs(schemaStore)
    const loading = ref(true)

    const resize = () => {
      const width = pageConfig.value.width
      const ratio = document.documentElement.clientWidth / width
      setStyle(document.body, {
        transform: `scale(${ratio})`,
        transformOrigin: 'left top',
        backgroundSize: '100%',
        backgroundRepeat: 'no-repeat',
      })
    }

    // 初始化screen数据
    const init = async () => {
      const id = route.params.screenId
      const name = route.name
      if (!id) {
        await router.push('/notfound')
        return
      }
      try {
        loading.value = true
        let data = {}
        // 本地预览模式
        if (name === 'Preview') {
          data = await loadScreenPreview()
        } else {
          const kanban = await loadKanban(id)
          if (kanban) {
            const { id, name, pid, layout, components } = kanban
            data = {
              pageInfo: { id, name, pid },
              pageConfig: JSON.parse(layout),
              comps: components.map(c => JSON.parse(c.componentContent)),
            }
          }
        }
        if (data) {
          schemaStore.loadScreenData(data)
          setPageStyle(data)

          setTimeout(() => {
            loading.value = false
          }, 500)

          on(window, 'resize', resize)
        }
      } catch (e) {
        await router.push('/notfound')
      }
    }

    // 跟据screen数据设置page style
    const setPageStyle = config => {
      const { pageInfo } = config
      document.title = pageInfo.name
      document
        .querySelector('meta[name="viewport"]')
        .setAttribute('content', `width=${pageConfig.value.width}`)

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

    init()
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
  background: linear-gradient(45deg, #222428, #444856);
  z-index: 2;
  .g-loading {
    top: 320px;
  }
}
.dv-layout {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  visibility: hidden;

  .dv-com {
    &.absolute {
      position: absolute !important;
      margin: 0 !important;
    }
    .dv-wrapper {
      width: 100%;
      height: 100%;
    }

    .group {
      width: 100%;
      height: 100%;
      & > div {
        position: relative;
        width: 100%;
        height: 100%;
        .component {
          position: absolute;
        }
      }
    }
  }
}
</style>
