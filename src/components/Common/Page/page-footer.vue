<template>
  <div class="page-footer" :style="rightContentWidth">
    <div class="page-footer__left">
      <slot name="left" />
    </div>
    <slot name="center" />
    <div class="page-footer__right">
      <slot name="right" />
    </div>
  </div>
</template>

<script>
import useSetting from '@/hooks/store/useSetting'

export default {
  name: 'PageFooter',
  setup() {
    const { rightContentWidth } = useSetting()
    return { rightContentWidth }
  },
}
</script>

<style scoped lang="stylus">
.page-footer {
  position: fixed;
  right: 0;
  bottom: 0;
  z-index: 10;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 0 24px;
  line-height: 44px;
  background: #fff;
  border-top: 1px solid #f0f0f0;
  box-shadow: 0 -6px 8px -8px rgba(0, 0, 0, 0.08), 0 -9px 10px 0 rgba(0, 0, 0, 0.05);
  transition: all 0.2s;
}
</style>
