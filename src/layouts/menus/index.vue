<template>
  <div class="aside-menu" :style="{width:sidebarWidth}">
    <b-scrollbar>
      <b-menu
        :collapse-transition="false"
        :default-active="activeMenu"
        @select="handleMenuSelect"
        unique-opened
        :collapse="!sidebar">
        <template v-for="(menu, menuIndex) in navMenu" :key="menuIndex">
          <menu-item v-if="!menu.children" :menu="menu"></menu-item>
          <submenu v-else :menu="menu"></submenu>
        </template>
      </b-menu>
    </b-scrollbar>
  </div>
</template>

<script>
import useSetting from '@/hooks/store/useSetting'
import MenuItem from '@/layouts/menus/menu-item.vue'
import Submenu from '@/layouts/menus/submenu.vue'
import { ref, watch } from 'vue'
import useStoreRouter from '@/hooks/store/useStoreRouter'
import useMenu from '@/hooks/store/useMenu'

export default {
  name: 'AsideMenus',
  components: { Submenu, MenuItem },
  setup() {
    const { $route } = useStoreRouter()
    const activeMenu = ref('')
    const openNames = ref([])
    const { sidebar, menuTheme, sidebarWidth } = useSetting()
    const { getMenuItemNamePath, handleMenuSelect, navMenu } = useMenu()

    watch(() => $route.name, (name) => {
      // 展开的菜单
      openNames.value = getMenuItemNamePath(name)
      activeMenu.value = name
    }, { immediate: true })

    return {
      sidebar,
      sidebarWidth,
      menuTheme,
      navMenu,
      activeMenu,
      handleMenuSelect,
    }
  },
}
</script>
