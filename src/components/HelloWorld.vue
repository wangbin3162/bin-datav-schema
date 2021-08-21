<template>
  <p>
    <b-button @click="handleClick">测试按钮</b-button>
  </p>
</template>

<script>
export default {
  methods: {
    handleClick() {
      this.$message('测试看看看')
    },
  },
}
</script>

<style scoped>
</style>
