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

<script>
import useApiStore from '@/hooks/schema/useApiStore'
import { getFieldMap, useDataCenter } from '@/hooks/schema/useDataCenter'
import { computed } from 'vue'

export default {
  name: 'VMainTitle',
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const { apiDataMap } = useApiStore()
    const { dvEmit } = useDataCenter(props.data)
    // config 配置项
    const config = computed(() => props.data.config)
    // attr 属性
    const attr = computed(() => props.data.attr)

    // dv 数据，跟进apiDataMap中取得 source[]
    const dv_data = computed(() => apiDataMap.value[props.data.id]?.source ?? [])
    // dv 字段 return: {x: 'x', y: 'y'}
    const dv_field = computed(() => getFieldMap(props.data.apis.source.fields))

    const titleStyle = computed(() => {
      const style = {
        width: `${attr.value.w}px`,
        height: `${attr.value.h}px`,
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

      return style
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

      return style
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

      return style
    })

    const titleText = computed(() => dv_data.value[dv_field.value.title] ?? config.value.title)

    const urlText = computed(() => dv_data.value[dv_field.value.url] ?? config.value.urlConfig.url)

    const urlTarget = computed(() => config.value.urlConfig.isBlank ? '_blank' : '_self')
    return {
      titleStyle,
      wordStyle,
      urlStyle,
      titleText,
      urlText,
      urlTarget,
    }
  },
}
</script>
