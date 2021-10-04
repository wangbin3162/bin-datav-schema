<template>
  <b-menu-item :index="menu.name">
    <i v-if="menu.icon" :class="`b-iconfont b-icon-${menu.icon}`"></i>
    <template #title><span>{{ menu.title }}</span></template>
  </b-menu-item>
</template>

<script>
export default {
  name: 'MenuItem',
  props: {
    menu: {
      type: Object,
      required: false,
      default: () => {
      },
    },
  },
}
</script>
