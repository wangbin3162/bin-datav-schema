<template>
  <div class="nav-main">
    <canvas id="nav-canvas" style="position: absolute; z-index: -1; left: 0;"></canvas>
    <span v-for="(nav,index) in navs" :key="nav.name" class="nav-span">
      <a
        class="nav-link"
        :class="{ 'nav-active': activeNav === index }"
        @click="toggleNav(nav,index)"
      >
        <i :class="`b-iconfont b-icon-${nav.icon} nav-icon`"></i>{{ nav.title }}
      </a>
    </span>
  </div>
</template>

<script>
import { useRoute } from 'vue-router'
import { onMounted, onUnmounted, ref } from 'vue'
import { debounce } from '@/utils/util'
import { NavCanvas } from '@/views/home/nav-canvas'

export default {
  name: 'nav-main',
  props: {
    navs: {
      type: Array,
      required: true,
    },
  },
  emits: ['change'],
  setup(props, { emit }) {
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

    onMounted(() => {
      const navIndex = props.navs.findIndex(m => m.name === route.name)
      activeNav.value = navIndex > -1 ? navIndex : 0
      nc = new NavCanvas('nav-canvas', '.nav-main .nav-span', activeNav.value)
      window.addEventListener('resize', debNavResize)
    })

    onUnmounted(() => {
      window.removeEventListener('resize', debNavResize)
    })

    return {
      toggleNav,
      activeNav,
    }
  },
}
</script>

<style scoped lang="stylus">
.nav-main {
  z-index: 10;
  display: flex;
  top: 30px;
  position: sticky;
  width: 100%;
  margin-top: 200px;
  min-width: 1024px;
  user-select: none;
  .nav-span {
    .nav-link {
      transition: color 0.2s;
      text-decoration: none !important;
      display: block;
      color: #b9c2cc;
      width: auto;
      min-width: 140px;
      line-height: 40px;
      font-size: 14px;
      text-align: left;
      cursor: pointer;
      padding: 0 40px;
      &.nav-active, &:hover {
        color: #fff !important;
      }
    }
    .nav-icon {
      padding-right: 5px;
      font-size: 16px;
    }
  }
}
</style>
