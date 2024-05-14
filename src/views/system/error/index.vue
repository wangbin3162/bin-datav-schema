<template>
  <div class="system-error-page">
    <div class="bin-result">
      <div class="bin-result-icon bin-result-image">
        <img v-if="$route.path === '/403'" src="@/assets/images/default/auth.svg" alt="403" />
        <img
          v-else-if="$route.path === '/500'"
          src="@/assets/images/default/error500.svg"
          alt="500"
        />
        <img
          v-else-if="$route.path === '/error'"
          src="@/assets/images/default/file-max.svg"
          alt="error"
        />
        <img v-else src="@/assets/images/default/error404.svg" alt="404" />
      </div>
      <div class="bin-result-title">{{ status }}</div>
      <div class="bin-result-subtitle">{{ errorMessage }}</div>
      <div class="bin-result-extra">
        <b-space>
          <router-link :to="{ name: HOME_PATH }">
            <b-button type="primary">返回首页</b-button>
          </router-link>
        </b-space>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, ref } from 'vue'
import { ERROR_PATH_LIST, HOME_PATH } from '@/router/menus'
import { useRoute } from 'vue-router'

/**
 * 通用异常页面，可根据 ERROR_PATH_LIST 默认异常页面列表配置信息，
 * path：路由的默认path即为状态码信息，如非404之类的错误信息，直接push到对应的path（如401）即可
 * message：默认会从query中取message的错误消息，如没有则去查找默认，再没有即为空
 */
export default {
  name: 'ErrorPage',
  setup() {
    // 此代码根据ERROR_PATH_LIST错误路由列表映射而来，如后缀了message，query，则默认先显示对应错误
    const errorNormalMsg = {
      403: '抱歉，您无权访问此页面！',
      404: '抱歉，你访问的页面不存在！',
      500: '抱歉，服务器出错了！',
    }
    const $route = useRoute()

    const status = ref('')
    const errorMessage = ref('')

    const isErrorPage = computed(() => ERROR_PATH_LIST.includes($route.path.slice(1)))

    function init() {
      const path = $route.path.slice(1)
      const no = $route.query.status
      const message = $route.query.message
      // 如果是预定义的错误页面
      if (isErrorPage.value) {
        status.value = path.toUpperCase()
        errorMessage.value = message || errorNormalMsg[path]
      } else if (path === 'error') {
        // 通用的错误页面
        status.value = no || path
        errorMessage.value = message
      } else {
        // 非通用页面的其他错误页面
        status.value = '404'
        errorMessage.value = '抱歉，你访问的页面不存在！'
      }
    }

    init()
    return {
      status,
      errorMessage,
      isErrorPage,
      HOME_PATH,
    }
  },
}
</script>

<style>
.system-error-page {
  background-color: #1d2126;
  height: 100vh;
  .bin-result {
    padding: 32px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .bin-result-image {
    width: 400px;
    height: 340px;
  }
  .bin-result-title {
    margin-bottom: 24px;
    color: #fff;
    font-weight: bold;
    font-size: 32px;
    line-height: 32px;
    opacity: 0;
    animation-name: slideUp;
    animation-duration: 0.5s;
    animation-fill-mode: forwards;
  }
  .bin-result-subtitle {
    margin-bottom: 24px;
    color: #808695;
    font-size: 16px;
    line-height: 22px;
    opacity: 0;
    animation-name: slideUp;
    animation-duration: 0.5s;
    animation-delay: 0.1s;
    animation-fill-mode: forwards;
  }
  .bin-result-extra {
    text-align: center;
    opacity: 0;
    animation-name: slideUp;
    animation-duration: 0.5s;
    animation-delay: 0.3s;
    animation-fill-mode: forwards;
  }
}
@keyframes slideUp {
  0% {
    transform: translateY(60px);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
}
</style>
