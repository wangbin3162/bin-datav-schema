<template>
  <div :class="['loading-indicator', { loading }]"></div>
</template>

<script setup>
import { useStore } from '@/store'
import { computed } from 'vue'
defineOptions({
  name: 'HeadLoading',
})

const { schemaStore, storeToRefs } = useStore() // 执行获取schema专属store
const { toolbar } = storeToRefs(schemaStore)
const loading = computed(() => toolbar.value.loading)
</script>

<style scoped>
.loading-indicator {
  position: absolute;
  top: 40px;
  left: 0;
  z-index: 101;
  width: 100%;
  height: 0;
  background: -webkit-gradient(
    linear,
    80% 46%,
    10% 21%,
    from(var(--bin-color-primary-light5)),
    to(var(--bin-color-primary))
  );
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
