<template>
  <div class="dv-wrapper" ref="domRef"></div>
</template>

<script setup>
import { computed, ref, onMounted, onBeforeUnmount, watch } from 'vue'
import Cube3d from './three/Cube3d'
import { debounce } from '@/utils/util'

defineOptions({
  name: 'VCube3d',
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

let cube = null

const debResize = debounce(() => resize(), 200)

function resize() {
  if (cube) cube.remove()
  cube = new Cube3d(domRef.value, config.value)
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
  cube = new Cube3d(domRef.value, config.value)
})

onBeforeUnmount(() => {
  const el = domRef.value
  el?.removeChild(el.children[0])
})
</script>
