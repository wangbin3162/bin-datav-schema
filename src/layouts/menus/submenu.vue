<template>
  <b-submenu :index="menu.name">
    <template #title>
      <i v-if="menu.icon" :class="`b-iconfont b-icon-${menu.icon}`"></i>
      <span>{{ menu.title }}</span>
    </template>
    <template v-for="(child,childIndex) in menu.children" :key="childIndex">
      <menu-item v-if="!child.children" :menu="child"></menu-item>
      <submenu v-else :menu="child"></submenu>
    </template>
  </b-submenu>
</template>

<script>
import MenuItem from '@/layouts/menus/menu-item.vue'

export default {
  name: 'Submenu',
  components: { MenuItem },
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
