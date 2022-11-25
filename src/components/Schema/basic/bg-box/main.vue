<template>
  <div class="dv-wrapper" :style="wrapperStyle">
    <template v-if="fillsStyles.length > 0">
      <div v-for="(fs, idx) in fillsStyles" :key="idx" :style="borderStyle">
        <div :style="fs">
          <a
            v-if="idx === 0 && config.urlConfig.url"
            :href="config.urlConfig.url"
            :target="config.urlConfig.ifBlank ? '_blank' : '_self'"
            style="display: block; width: 100%; height: 100%"
          ></a>
        </div>
      </div>
    </template>
    <div v-else :style="borderStyle">
      <a
        v-if="config.urlConfig.url"
        :href="config.urlConfig.url"
        :target="config.urlConfig.ifBlank ? '_blank' : '_self'"
        style="display: block; width: 100%; height: 100%"
      ></a>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'

export default {
  name: 'VBgBox',
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    // config 配置项
    const config = computed(() => props.data.config)

    const wrapperStyle = computed(() => {
      return {
        'border-radius': `${config.value.borderRadius}px`,
        filter: `blur(${config.value.filter.blur})`,
        'backdrop-filter': `blur(${config.value.backdropFilter.blur})`,
      }
    })

    const borderStyle = computed(() => {
      const style = {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        borderRadius: 'inherit',
      }

      const { border, shadow } = config.value
      if (border.show) {
        if (border.type === 'flat') {
          const bd = border.flat
          style.borderWidth = `${bd.width}px`
          style.borderStyle = bd.style
          style.color = bd.color
          style.boxShadow = shadow?.show ? `${shadow.size} inset ${shadow.color}` : null
        } else if (border.type === 'linearGradient') {
          const bd = border.linearGradient
          const { angle, stops } = border.linearGradient.color
          style.width = '100%'
          style.height = '100%'
          style.borderRadius = 'inherit'
          style.borderWidth = `${bd.width}px`
          style.borderStyle = 'solid'
          const color = stops.map(m => `${m.color} ${m.offset}%`).join(', ')
          style.borderImage = `linear-gradient(${angle}deg, ${color}) 10 / ${bd.width}px / 0 stretch`
        }
      }

      return style
    })

    const fillsStyles = computed(() => {
      const list = []
      config.value.fills.forEach(item => {
        list.push({
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          borderRadius: 'inherit',
          opacity: item.opacity,
          backgroundColor: item.fill,
        })
      })
      return list
    })
    return {
      config,
      wrapperStyle,
      borderStyle,
      fillsStyles,
    }
  },
}
</script>
