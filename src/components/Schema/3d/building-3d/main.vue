<template>
  <div class="dv-wrapper" ref="domRef"></div>
</template>

<script>
import { computed, ref, onMounted, onBeforeUnmount, watch } from 'vue'
import Building3d from './three/Building3d'
import { debounce } from '@/utils/util'

export default {
  name: 'VBuilding3d',
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const domRef = ref(null)
    // config 配置项
    const config = computed(() => props.data.config)

    let building3d = null

    const debResize = debounce(() => resize(), 200)

    function resize() {
      if (building3d) building3d.remove()
      building3d = new Building3d(domRef.value, config.value)
    }

    watch([() => props.data.attr.w, () => props.data.attr.h], () => {
      debResize()
    })
    watch(
      () => config.value,
      () => {
        debResize()
      },
      { deep: true },
    )

    onMounted(() => {
      building3d = new Building3d(domRef.value, config.value)
    })

    onBeforeUnmount(() => {
      const el = domRef.value
      el?.removeChild(el.children[0])
    })

    return { config, domRef }
  },
}
</script>
