<template>
  <b-dropdown trigger="click" appendToBody placement="bottom-start" @command="handleCommand">
    <i class="b-iconfont b-icon-setting setting-action" style="cursor: pointer;"></i>
    <template #dropdown>
      <b-dropdown-menu>
        <b-dropdown-item icon="edit-square" name="edit">编辑</b-dropdown-item>
        <b-dropdown-item icon="swap" name="convert">{{ `转换为${data.type === 'M' ? '维度' : '度量'}` }}</b-dropdown-item>
        <b-dropdown-item icon="delete" name="delete">删除</b-dropdown-item>
      </b-dropdown-menu>
    </template>
  </b-dropdown>
</template>

<script>
export default {
  name: 'setting-dropdown',
  props: {
    data: {
      type: Object,
      default: () => ({}),
    },
  },
  emits: ['command'],
  methods: {
    handleCommand(name) {
      this.$emit('command', { name, node: this.data })
    },
  },
}
</script>
