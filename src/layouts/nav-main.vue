<template>
  <div class="nav-main">
    <canvas id="nav-canvas" style="position: absolute; z-index: -1; left: 0"></canvas>
    <span v-for="(nav, index) in navs" :key="nav.name" class="nav-span">
      <a
        class="nav-link"
        :class="{ 'nav-active': activeNav === index }"
        @click="toggleNav(nav, index)"
      >
        <i :class="`b-iconfont b-icon-${nav.icon} nav-icon`"></i>
        {{ nav.title }}
      </a>
    </span>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
import { onMounted, onUnmounted, ref } from 'vue'
import { debounce } from '@/utils/util'
import { NavCanvas } from './nav-canvas'
import { themeConfigRef } from '@/theme'
import { Utils } from 'bin-ui-design'

defineOptions({
  name: 'nav-main',
})

const emit = defineEmits(['change'])
const props = defineProps({
  navs: {
    type: Array,
    required: true,
  },
})

const route = useRoute()
const activeNav = ref(0)
let nc = null

const toggleNav = (nav, index) => {
  if (nc) {
    activeNav.value = index
    nc.toggle(index)
    emit('change', nav)
  }
}

const debNavResize = debounce(() => {
  if (nc) {
    nc.resize()
  }
}, 500)

function getMainColor() {
  const color = themeConfigRef.value.binColorPrimary
  const colorList = Utils.color.getPalette(color)
  const lineColor = colorList[7]
  const hightlightColor = colorList[4]
  return [lineColor, hightlightColor]
}

onMounted(() => {
  const navIndex = props.navs.findIndex(m => m.name === route.name)
  activeNav.value = navIndex > -1 ? navIndex : 0
  const [lineColor, hightlightColor] = getMainColor()

  nc = new NavCanvas(
    'nav-canvas',
    '.nav-main .nav-span',
    activeNav.value,
    lineColor,
    hightlightColor,
  )
  window.addEventListener('resize', debNavResize)
})

onUnmounted(() => {
  window.removeEventListener('resize', debNavResize)
})
</script>

<style scoped>
.nav-main {
  z-index: 10;
  display: flex;
  top: 60px;
  position: sticky;
  width: 100%;
  margin-top: 180px;
  min-width: 1024px;
  user-select: none;
  .nav-span {
    .nav-link {
      transition: color 0.2s;
      text-decoration: none !important;
      display: block;
      color: var(--s-text-color-1);
      width: auto;
      min-width: 140px;
      line-height: 32px;
      font-size: 16px;
      text-align: left;
      cursor: pointer;
      padding: 8px 40px 0 30px;
    }
    .nav-icon {
      padding-right: 5px;
      font-size: 16px;
    }
  }
}
</style>
