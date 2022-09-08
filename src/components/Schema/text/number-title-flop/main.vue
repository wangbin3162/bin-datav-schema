<template>
  <div class="dv-wrapper" :style="wrapperStyle">
    <div :style="titleStyle">{{ titleText }}</div>
    <div :style="counterStyle" v-if="render">
      <b-count-to
        :startVal="0"
        :endVal="realNumber"
        :duration="counter.duration"
        :autoplay="counter.autoplay"
        :decimals="counter.decimals"
        :decimal="counter.decimal"
        :separator="counter.separator"
        :prefix="counter.prefix"
        :suffix="counter.suffix"
      ></b-count-to>
    </div>
  </div>
</template>

<script>
import { computed, ref, watch } from 'vue'
import { useDataCenter } from '@/hooks/schema/useDataCenter'

export default {
  name: 'VNumberTitleFlop',
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const { dvData } = useDataCenter(props.data)
    // config 配置项
    const config = computed(() => props.data.config)
    // attr 属性
    const attr = computed(() => props.data.attr)

    const wrapperStyle = computed(() => {
      const arrangement = config.value.global.arrangement
      let style = {}
      if (arrangement === 'top') {
        style = {
          display: 'block',
          alignItems: 'start',
          flexDirection: 'column',
        }
      } else if (arrangement === 'left') {
        style = {
          display: 'flex',
          alignItems: 'baseline',
          flexDirection: 'row',
        }
      } else if (arrangement === 'bottom') {
        style = {
          display: 'flex',
          alignItems: 'start',
          flexDirection: 'column-reverse',
        }
      }
      return {
        ...style,
      }
    })

    const titleText = computed(() => dvData.value.title || config.value.title.content)

    const titleStyle = computed(() => {
      const { fontFamily, arrangement, distance } = config.value.global
      const { textStyle } = config.value.title

      const style = {
        display: 'flex',
        flexShrink: '0',
        alignItems: 'center',
        color: textStyle.color,
        fontWeight: textStyle.fontWeight,
        fontFamily: `${fontFamily}, Arial, sans-serif`,
        fontSize: `${textStyle.fontSize}px`,
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        lineHeight: 'normal',
        margin: '0px',
        justifyContent: textStyle.textAlign,
        width: '100%',
      }

      if (arrangement === 'top') {
        style.margin = `0px 0px ${distance}px`
      } else if (arrangement === 'left') {
        style.width = 'auto'
        style.margin = `0px ${distance}px 0px 0px`
      } else if (arrangement === 'bottom') {
        style.margin = `${distance}px 0px 0px`
      }
      return style
    })

    const counterStyle = computed(() => {
      const { title, counter, global } = config.value
      const style = {
        whiteSpace: 'nowrap',
        color: counter.textStyle.color,
        textAlign: counter.textStyle.textAlign,
        fontFamily: counter.textStyle.fontFamily,
        fontSize: `${counter.textStyle.fontSize}px`,
        fontWeight: counter.textStyle.fontWeight,
      }

      const titleContainerH = title.textStyle.fontSize + 10
      const arrangement = global.arrangement
      if (arrangement === 'top' || arrangement === 'bottom') {
        style.width = `${attr.value.w}px`
        style.height = `${attr.value.h - titleContainerH}px`
      } else if (arrangement === 'left') {
        style.width = `${attr.value.w}px`
        style.height = `${attr.value.h}px`
      }
      return style
    })

    const counter = computed(() => config.value.counter)

    const realNumber = computed(() => dvData.value.value ?? counter.value.value)

    const render = ref(true)

    watch(
      () => config.value,
      () => {
        render.value = false
        setTimeout(() => {
          render.value = true
        }, 50)
      },
      { deep: true },
    )
    return {
      render,
      realNumber,
      wrapperStyle,
      counter,
      titleText,
      titleStyle,
      counterStyle,
    }
  },
}
</script>
