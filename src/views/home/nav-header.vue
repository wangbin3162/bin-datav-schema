<template>
  <div>
    <div class="dv-header" :style="{ background: isFixed ? '#171b22' : '' }">
      <div class="logo">
        <div class="top-tip">
          <strong class="tip-strong">公告</strong>
          <div class="dv-marquee">
            <span class="content">
              <template v-for="n in 2" :key="n">
                欢迎使用{{ title }}， 版本号：V{{ version }}，本系统支持Chrome、Edge、Firefox等主流浏览器。
                <span class="content-space"></span>
              </template>
            </span>
          </div>
        </div>
      </div>
      <div class="user">
        <weather></weather>
        <div class="header-item">
          <b-dropdown @command="handleClick" append-to-body>
            <div class="user-link-wrap">
              <img src="@/assets/images/avatar/avatar05.jpeg" class="avatar" alt="avatar" />
              <span class="user-link" v-if="userInfo">
                {{ userInfo.realName }}
                <b-icon name="down"></b-icon>
              </span>
            </div>
            <template #dropdown>
              <b-dropdown-menu style="width: 120px">
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
        </div>
      </div>
    </div>
    <div class="dv-nav">
      <div class="header-img">
        <div class="nav-img-text">
          <img src="@/assets/images/logo/logo.png" alt="logo" />
          <div class="nav-welcome">
            <h2>{{ title }}</h2>
            <h4>{{ welcome }}</h4>
          </div>
        </div>
        <div class="nav-img"></div>
      </div>
    </div>
  </div>
</template>

<script>
import useStoreRouter from '@/hooks/store/useStoreRouter'
import { computed } from 'vue'
import { MessageBox } from 'bin-ui-next'
import config from '../../../package.json'

export default {
  name: 'NavHeader',
  props: {
    isFixed: {
      type: Boolean,
      default: false,
    },
  },
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
          title: '确认退出登录吗？',
        })
          .then(() => {
            $store.dispatch('user/clearToken')
            $router.push(`/login?redirect=${$route.fullPath}`)
          })
          .catch(e => {
            console.log(e)
          })
      }
    }

    return {
      userInfo,
      handleClick,
      welcome: 'Welcome to the data analysis system',
      version: config.version,
      title: config.description,
    }
  },
}
</script>

<style scoped lang="stylus">
.dv-header {
  display: flex;
  position: fixed;
  top: 0;
  justify-content: space-between;
  z-index: 999;
  width: 100%;
  height: 30px;
  padding: 0 10px;
  color: #fff;
  background-image: linear-gradient(0deg, rgba(0, 0, 0, 0) 19%, #171717 100%);
  .logo {
    display: flex;
    flex: 1;
    align-items: center;
    padding-left: 18px;
  }
  .user {
    display: flex;
    justify-content: flex-end;
    padding-right: 15px;
    align-items: center;
    z-index: 9;
    min-width: 540px;

    .header-item {
      margin: 0 5px;
      padding: 0 10px;
      cursor: pointer;
      user-select: none;
      color: var(--schema-font-color);
      line-height: 20px;
      height: 20px;
    }

    .user-link-wrap {
      display: flex;
      align-items: center;
      > img {
        height: 20px;
        width: 20px;
        line-height: 20px;
        border-radius: 50%;
      }
    }

    .user-link {
      line-height: 20px;
      height: 20px;
      margin-left: 5px;
      color: var(--schema-font-color);
      font-size: 14px;
    }
  }
}
.top-tip {
  padding: 6px 0;
  font-size: 12px;
  color: var(--schema-font-color);
  display: flex;
  right: 0;
  height: 30px;
  margin-right: 24px;
  width: 600px;

  .tip-strong {
    white-space: nowrap;
    padding-right: 8px;
  }
}
.dv-marquee {
  display: block;
  margin: 0 auto;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: clip;
  position: relative;

  .content {
    display: inline-block;
    position: relative;
    padding-right: 0;
    white-space: nowrap;
    animation: marque-animation 20s infinite linear;
    z-index: 0;

    &:hover {
      animation-play-state: paused;
    }
  }

  .content-space {
    display: inline-block;
    width: 5em;
  }

  .project-href {
    color: $font-color;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
}
@keyframes marque-animation {
  0% {
    transform: translateX(0);
  }

  100% {
    transform: translateX(-50%);
  }
}
.dv-nav {
  display: flex;
  position: absolute;
  top: 0;
  flex-direction: column;
  background: #171b22;
  width: 100%;
  height: 290px;

  .header-img {
    opacity: 1;
    z-index: 1;
  }

  .nav-img-text {
    z-index: 1;
    transform-origin: 0 0;
    top: 60px;
    left: 40px;
    position: absolute;
    user-select: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    > img {
      height: 100px;
      margin-right: 20px;
    }
    .nav-welcome {
      h2 {
        font-size: 50px;
        font-weight: normal;
        background-image: linear-gradient(to right, #d0f3f3, #1089ff);
        -webkit-background-clip: text;
        color: transparent;
        font-family: YouSheBiaoTiHei, PingFangSC-Medium, PingFang SC, Microsoft YaHei, Arial, Helvetica, sans-serif;
      }
      h4 {
        font-weight: normal;
        font-size: 14px;
        letter-spacing: 2px;
        text-transform: uppercase;
        color: #d0f3f3;
        font-family: Orbitron-Bold, PingFangSC-Medium, PingFang SC, Microsoft YaHei, Arial, Helvetica, sans-serif;
      }
    }
  }

  .nav-img {
    position: absolute;
    width: 100%;
    height: 290px;
    background-size: cover;
    background-position: center;
    background-image: url('@/assets/images/nav-img.png');
  }
}
</style>
