<template>
  <div class="dv-wrapper" ref="domRef"></div>
</template>

<script setup>
import { computed, ref, onMounted, onBeforeUnmount, watch } from 'vue'
import Earth3d from './three/Earth3d'
import { debounce } from '@/utils/util'

defineOptions({
  name: 'VEarth3d',
})

const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
})

const domRef = ref(null)
// config 配置项
const config = computed(() => props.data.config)

let earth = null

const debResize = debounce(() => resize(), 200)

function resize() {
  if (earth) earth.remove()
  earth = new Earth3d(domRef.value, config.value)
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
  earth = new Earth3d(domRef.value, config.value)
})

onBeforeUnmount(() => {
  const el = domRef.value
  el?.removeChild(el.children[0])
})
</script>
