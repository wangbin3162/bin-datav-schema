<template>
  <b-config-provider abstract themeName="dark" :theme="themeConfigRef">
    <router-view />
    <ThemeConfig v-if="$route.name !== 'Screen' && $route.name !== 'Preview'" />
  </b-config-provider>
</template>

<script setup>
import config from '../package.json'
import { useThemeInit, themeConfigRef, ThemeConfig } from '@/theme'

document.title = config.description

useThemeInit()
</script>
