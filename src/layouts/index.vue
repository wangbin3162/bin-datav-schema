<template>
  <div class="dv-home">
    <nav-header :is-fixed="isFixed"></nav-header>
    <nav-main
      ref="navMainRef"
      :navs="menus"
      :style="{ background: isFixed ? '#171b22' : '' }"
      @change="onNavChange"
    ></nav-main>
    <div class="nav-shadow"></div>
    <div class="dv-main">
      <div class="dv-content">
        <router-view v-slot="{ Component }">
          <component :is="Component"></component>
        </router-view>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import NavHeader from './nav-header.vue'
import NavMain from './nav-main.vue'
import { useRouter } from 'vue-router'
import menus from '@/router/menus'

defineOptions({
  name: 'Home',
})

const navMainRef = ref(null)
const isFixed = ref(false)
const router = useRouter()

const scroll = () => {
  isFixed.value = navMainRef.value.$el.offsetTop > 200
}

const onNavChange = nav => {
  router.push({ name: nav.name })
}

onMounted(() => {
  window.addEventListener('scroll', scroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', scroll)
})
</script>

<style>
.dv-home {
  .nav-shadow {
    background: linear-gradient(180deg, transparent, #171b22);
    height: 40px;
    position: relative;
    width: 100%;
    z-index: 1;
  }
  .dv-main {
    user-select: none;
    .dv-content {
      position: relative;
    }
  }
}
</style>
