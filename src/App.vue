<template>
  <router-view />
</template>

<script setup>
import { watch } from 'vue'
import { useRoute } from 'vue-router'
import { setAttrVar } from '@/config/setting.cfg'

const route = useRoute()

watch(
  () => route.path,
  path => {
    const theme = path === '/model/cube' ? 'light' : 'dark'
    setAttrVar('data-schema', `datav-${theme}`)
  },
  { immediate: true },
)
</script>
