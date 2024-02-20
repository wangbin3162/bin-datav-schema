<template>
  <div class="screen-wrapper">
    <div class="dv-loading" v-show="loading">
      <g-loading spinning type="dna"></g-loading>
    </div>
    <div class="dv-layout" :style="{ visibility: loading ? 'hidden' : 'visible' }">
      <div class="scene">
        <div class="dv-com absolute" v-for="com in comps" :key="com.id" :style="getComStyle(com)">
          <component
            v-if="!com.hided"
            :is="com.name"
            :data="com"
            :class="animationsClass(com.animation)"
            :style="{ ...compStyle(com), ...animationsStyles(com.animation) }"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useStore } from '@/store'
import { ref, provide } from 'vue'
import { loadScreenPreview } from '@/api/database.api'
import { useRoute, useRouter } from 'vue-router'
import { on, setStyle } from '@/utils/util'
import { loadKanban } from '@/api/modules/analysis-dashboard.api'
import { animationsClass, animationsStyles } from '@/config/animations'
import { useScriptInit } from '@/hooks/schema/useScriptInit'

defineOptions({
  name: 'Screen',
})

const router = useRouter()
const route = useRoute()
const { schemaStore, storeToRefs } = useStore()
const { pageConfig, comps } = storeToRefs(schemaStore)
const loading = ref(true)

provide('RenderModel', 'runtime')

const resize = () => {
  const dom = document.querySelector('#app')
  if (!dom) return
  const width = pageConfig.value.width
  const ratio = document.documentElement.clientWidth / width

  setStyle(dom, {
    transform: `scale(${ratio})`,
    transformOrigin: 'left top',
    backgroundSize: '100%',
    backgroundRepeat: 'no-repeat',
  })
}

function getComStyle(comp) {
  const { x, y, w, h, rotate, rotateX, rotateY, perspective } = comp.attr
  const style = {
    left: x + 'px',
    top: y + 'px',
    width: w + 'px',
    height: h + 'px',
    transform: `rotateZ(${rotate}deg)`,
  }

  const rotate3d = rotateY !== 0 || rotateX !== 0
  if (rotate3d) {
    style['transform-style'] = 'preserve-3d'
    style['perspective'] = `${perspective}px`
    style['overflow'] = 'visible'
  }
  return style
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
      // 执行初始化脚本
      useScriptInit()

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
  const dom = document.querySelector('#app')
  if (!dom) return
  const { pageInfo } = config
  document.title = pageInfo.name
  document
    .querySelector('meta[name="viewport"]')
    .setAttribute('content', `width=${pageConfig.value.width}`)

  const { filterShow, blendMode, hueRotate, saturate, contrast, brightness, opacity } =
    pageConfig.value.styles

  setStyle(document.documentElement, {
    overflowX: 'hidden',
    overflowY: 'visible',
  })

  const styles = {
    width: `${pageConfig.value.width}px`,
    height: `${pageConfig.value.height}px`,
    backgroundImage: `url(${pageConfig.value.bgImage})`,
    backgroundColor: pageConfig.value.bgColor,
  }
  if (filterShow) {
    styles.mixBlendMode = blendMode
    styles.opacity = opacity
    styles.filter = `saturate(${saturate}) contrast(${contrast}) hue-rotate(${hueRotate}deg) brightness(${brightness})`
  }
  setStyle(dom, styles)

  resize()
}

init()

function compStyle(comp) {
  const {
    w,
    h,
    rotateX,
    rotateY,
    filterShow,
    blendMode,
    hueRotate,
    saturate,
    contrast,
    brightness,
    opacity,
  } = comp.attr

  const styles = {
    width: `${w}px`,
    height: `${h}px`,
    transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg) `,
    mixBlendMode: blendMode,
  }
  if (filterShow) {
    styles.opacity = opacity
    styles.filter = `saturate(${saturate}) contrast(${contrast}) hue-rotate(${hueRotate}deg) brightness(${brightness})`
  }

  return styles
}
</script>

<style>
html,
body {
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

  .dv-com.absolute {
    position: absolute !important;
    margin: 0 !important;
    .dv-wrapper,
    .group {
      width: 100%;
      height: 100%;
    }
    .group {
      pointer-events: none;
    }
    .dv-wrapper.component {
      pointer-events: auto;
    }
  }
}
</style>
