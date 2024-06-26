<template>
  <div class="dv-wrapper" :style="titleStyle">
    <template v-if="urlText">
      <a :href="urlText" :target="urlTarget" :style="urlStyle">{{ titleText }}</a>
    </template>
    <template v-else>
      <span :style="wordStyle">{{ titleText }}</span>
    </template>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { toJson } from '@/utils/util'

defineOptions({
  name: 'VMainTitle',
})

const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
})

// config 配置项
const config = computed(() => props.data.config)

const advanceStyle = computed(() => toJson(config.value.textStyle.advanceStyle, {}))

const titleStyle = computed(() => {
  const style = {
    'font-family': `${config.value.textStyle.fontFamily}, Arial, sans-serif`,
    'font-size': `${config.value.textStyle.fontSize}px`,
    'font-weight': config.value.textStyle.fontWeight,
    'justify-content': config.value.textAlign,
    'writing-mode': config.value.writingMode,
    'letter-spacing': `${config.value.letterSpacing}px`,
    'background-color': 'initial',
    border: 'none',
    'border-radius': '0px',
    transform: 'translateZ(0px)',
    display: 'flex',
    'align-items': 'center',
    'text-overflow': 'ellipsis',
    'white-space': 'nowrap',
    overflow: 'hidden',
  }

  if (config.value.backgroundStyle.show) {
    const bgs = config.value.backgroundStyle
    style['background-color'] = bgs.bgColor
    style.border = `${bgs.borderWidth}px ${bgs.borderStyle} ${bgs.borderColor}`
    style['border-radius'] = `${bgs.borderRadius}px`
  }

  return { ...style, ...advanceStyle.value }
})

const wordStyle = computed(() => {
  const style = {
    color: config.value.textStyle.color,
    overflow: 'unset',
    'text-overflow': 'unset',
    'white-space': 'unset',
    'background-image': 'none',
    'background-clip': 'unset',
    '-webkit-text-fill-color': 'initial',
  }

  if (config.value.ellipsis) {
    style.overflow = 'hidden'
    style['text-overflow'] = 'ellipsis'
    style['white-space'] = 'nowrap'
  }

  return { ...style, ...advanceStyle.value }
})

const urlStyle = computed(() => {
  const style = {
    display: 'block',
    'text-decoration': 'none',
    color: config.value.textStyle.color,
    overflow: 'unset',
    'text-overflow': 'unset',
    'white-space': 'unset',
    'background-image': 'none',
    'background-clip': 'unset',
    '-webkit-text-fill-color': 'initial',
  }

  if (config.value.ellipsis) {
    style.overflow = 'hidden'
    style['text-overflow'] = 'ellipsis'
    style['white-space'] = 'nowrap'
  }

  return { ...style, ...advanceStyle.value }
})

const titleText = computed(() => config.value.title)

const urlText = computed(() => config.value.urlConfig.url)

const urlTarget = computed(() => (config.value.urlConfig.isBlank ? '_blank' : '_self'))
</script>
