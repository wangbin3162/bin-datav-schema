<template>
  <div :class="['loading-indicator', { loading }]"></div>
</template>

<script>
import { useStore } from '@/pinia'
import { computed } from 'vue'

export default {
  name: 'HeadLoading',
  setup() {
    const { schemaStore, storeToRefs } = useStore() // 执行获取schema专属store
    const { toolbar } = storeToRefs(schemaStore)
    const loading = computed(() => toolbar.value.loading)
    return { loading }
  },
}
</script>

<style lang="stylus" scoped>
.loading-indicator {
  position: absolute;
  top: 40px;
  left: 0;
  z-index: 101;
  width: 100%;
  height: 0;
  background: -webkit-gradient(linear, 80% 46%, 10% 21%, from(#ff8754), to(#2483ff));
  transition: height 0.5s;

  &.loading {
    height: 1px;
    animation: headLadingAnimation 1s infinite ease-out;
  }
}

@keyframes headLadingAnimation {
  from {
    transform: translateX(-100%);
  }

  to {
    transform: translateX(150%);
  }
}
</style>
