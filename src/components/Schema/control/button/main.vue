<template>
  <div class="dv-wrapper">
    <div class="button-box" :style="btnStyle" @click="btnClick">
      {{ titleText }}
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useEventBus } from '@/hooks/schema/useEventBus'
import { useEvent } from "./useEvent"

defineOptions({
  name: 'VButton',
})

const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
})

// config 配置项
const config = computed(() => props.data.config)

const btnStyle = computed(() =>{
  const cfg = config.value
  const style = {
    'font-family': `${cfg.textStyle.fontFamily}, Arial, sans-serif`,
    'font-size': `${cfg.textStyle.fontSize}px`,
    'font-weight': cfg.textStyle.fontWeight,
    'justify-content': cfg.textAlign,
    'writing-mode': cfg.writingMode,
    'letter-spacing': `${cfg.letterSpacing}px`,
    'background-color': 'initial',
    color: cfg.textStyle.color,
    overflow: 'unset',
    'text-overflow': 'unset',
    'white-space': 'unset',
    'background-clip': 'unset',
    '-webkit-text-fill-color': 'initial',
    border: 'none',
    transform: 'translateZ(0px)',
    display: 'flex',
    'align-items': 'center',

    'background-image': 'unset',
    'background-size': 'unset',

    'border-radius': `${cfg.radius}px`,
    boxShadow: cfg.shadow.show ? `${cfg.shadow.size} ${cfg.shadow.color}` : null,
  }

  if (cfg.ellipsis) {
    style.overflow = 'hidden'
    style['text-overflow'] = 'ellipsis'
    style['white-space'] = 'nowrap'
  }

  if (cfg.backgroundStyle.show) {
    const bgs = cfg.backgroundStyle
    if (bgs.backgroundType === 'normal'){
      style['background-color'] = bgs.bgColor
      style.border = `${bgs.borderWidth}px ${bgs.borderStyle} ${bgs.borderColor}`
    } else {
      style['background-image'] = `url(${config.value.src})`
      style['background-size'] = '100% 100%'
    }
  }
  return style
})

const titleText = computed(() => config.value.title)

const urlTarget = computed(() => (config.value.urlConfig.isBlank ? '_blank' : '_self'))

// 事件系统增加
useEventBus(props.data)

// 事件系统触发
const { emitChange } = useEvent(props.data)

// 按钮点击事件
function btnClick() {
  emitChange()
}

</script>

<style scoped>
.button-box {
  position: relative;
  width: 100%;
  height: 100%;
  cursor: pointer;
}
</style>
