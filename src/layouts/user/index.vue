<template>
  <b-dropdown @command="handleClick" append-to-body>
    <div class="global-header-avatar-trigger">
      <img src="@/assets/images/avatar/avatar05.jpeg" class="avatar" alt="avatar">
      <span v-if="userInfo">{{ userInfo.realName }}</span>
    </div>
    <template #dropdown>
      <b-dropdown-menu style="width: 120px;">
        <!--        <b-dropdown-item name="userCenter">-->
        <!--          <div flex="cross:center">-->
        <!--            <b-icon name="user" size="16"></b-icon>-->
        <!--            <span class="ml-5">用户中心</span>-->
        <!--          </div>-->
        <!--        </b-dropdown-item>-->
        <b-dropdown-item name="logout">
          <div flex="cross:center">
            <b-icon name="logout" size="16"></b-icon>
            <span class="ml-5">注销登录</span>
          </div>
        </b-dropdown-item>
      </b-dropdown-menu>
    </template>
  </b-dropdown>
</template>

<script>
import { MessageBox } from 'bin-ui-next'
import { computed } from 'vue'
import useStoreRouter from '@/hooks/store/useStoreRouter'

export default {
  name: 'UserAvatar',
  setup() {
    const { $store, $router, $route } = useStoreRouter()
    const userInfo = computed(() => $store.state.user.userInfo)

    function handleClick(name) {
      if (name === 'userCenter') {
        $router.push('/userCenter')
      }
      if (name === 'logout') {
        MessageBox.confirm({
          type: 'warning',
          title: '提示',
          message: '确认退出登录吗？',
        }).then(() => {
          $store.dispatch('user/clearToken')
          $router.push(`/login?redirect=${$route.fullPath}`)
        }).catch(e => {
          console.log(e)
        })
      }
    }

    return { userInfo, handleClick }
  },
}
</script>
