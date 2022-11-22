<template>
  <div class="dv-wrapper">
    <b-circle
      :percent="realNumber"
      :size="attr.w"
      :stroke-linecap="config.linecap"
      :stroke-width="config.width"
      :stroke-color="config.color"
      :trail-width="config.trailWidth"
      :trail-color="config.trailColor"
      :dashboard="config.dashboard"
    >
      <div
        class="circle-title mb-5"
        v-show="config.title.show"
        :style="{ fontSize: `${config.title.fontSize}px`, color: config.title.color }"
      >
        {{ titleText }}
      </div>

      <div
        class="circle-value mb-5"
        v-show="config.value.show"
        :style="{ fontSize: `${config.value.fontSize}px`, color: config.value.color }"
      >
        {{ realNumber }}%
      </div>

      <div
        class="circle-num"
        v-show="config.num.show"
        :style="{ fontSize: `${config.num.fontSize}px`, color: config.num.color }"
      >
        {{ realNum }}
      </div>
    </b-circle>
  </div>
</template>

<script>
import { useDataCenter } from '@/hooks/schema/useDataCenter'
import { computed } from 'vue'

export default {
  name: 'VProgressCircle',
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

    const titleText = computed(() => dvData.value.title || config.value.title.content)

    const realNumber = computed(() => dvData.value.value * 100)

    const realNum = computed(() => {
      const { title, num, total } = dvData.value
      return config.value.numFormat
        .replace(/{title}/, title)
        .replace(/{value}/, realNumber.value)
        .replace(/{num}/, num)
        .replace(/{total}/, total)
    })

    return {
      config,
      attr,
      titleText,
      realNumber,
      realNum,
    }
  },
}
</script>
