<template>
  <div class="data-center">数据中心，正在建设中</div>
</template>

<script>
export default {
  name: 'DataCenter',
  mounted() {
    this.$message.warning('正在建设中...')
  },
}
</script>

<style lang="stylus" scoped>
.data-center {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 300px;
  color: rgba(255, 255, 255, .65);
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
