<template>
  <router-view />
</template>

<script setup>
import { watch } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'

const route = useRoute()
const store = useStore()

watch(() => route.path, (path) => {
  const theme = path === '/model/cube' ? 'light' : 'dark'
  store.dispatch('app/loadAppTheme', theme)
}, { immediate: true })
</script>
