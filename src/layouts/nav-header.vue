<template>
  <div>
    <div class="dv-header" :style="{ background: isFixed ? '#171b22' : '' }">
      <div class="logo">
        <div class="top-tip">
          <strong class="tip-strong">公告</strong>
          <div class="dv-marquee">
            <span class="content">
              <template v-for="n in 2" :key="n">
                欢迎使用{{ platformName }}， 版本号：
                <span>V{{ version }}</span>
                ，本系统支持Chrome、Edge、Firefox等主流浏览器。
                <span class="content-space"></span>
              </template>
            </span>
          </div>
        </div>
      </div>
      <div class="user">
        <div class="header-item">
          <b-dropdown @command="handleClick" append-to-body trigger="click">
            <div class="user-link-wrap">
              <span class="user-link" v-if="userStore.userInfo">
                {{ userStore.userInfo.realName }}
              </span>
            </div>
            <template #dropdown>
              <b-dropdown-menu style="width: 120px">
                <b-dropdown-item name="logout">
                  <div flex="cross:center">
                    <b-icon name="logout" size="16"></b-icon>
                    <span class="ml-5">退出登录</span>
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
          <img src="@/assets/images/logo.png" alt="logo" />
          <div class="nav-welcome">
            <h2>{{ platformName }}</h2>
            <h4>Welcome to the data analysis system</h4>
          </div>
        </div>
        <div class="nav-img"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { MessageBox } from 'bin-ui-design'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from '@/store'
import config from '../../package.json'

const version = config.version
const platformName = config.description

defineOptions({
  name: 'NavHeader',
})

defineProps({
  isFixed: {
    type: Boolean,
    default: false,
  },
})

const route = useRoute()
const router = useRouter()
const { userStore } = useStore()

function handleClick(name) {
  if (name === 'userCenter') {
    router.push('/userCenter')
  }

  if (name === 'logout') {
    MessageBox.confirm({
      type: 'warning',
      title: '确认退出登录吗？',
    })
      .then(async () => {
        userStore.clearToken()
        router.push(`/login?redirect=${route.fullPath}`)
      })
      .catch(e => {
        console.log(e)
      })
  }
}
</script>

<style scoped>
.dv-header {
  display: flex;
  position: fixed;
  top: 0;
  justify-content: space-between;
  z-index: 10;
  width: 100%;
  height: 60px;
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
    padding-right: 45px;
    align-items: center;
    z-index: 9;
    min-width: 540px;
    .header-item {
      margin: 0 5px;
      padding: 0 10px;
      cursor: pointer;
      user-select: none;
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
      color: var(--s-text-color);
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
    color: var(--s-text-color);
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
}

.dv-nav {
  display: flex;
  position: absolute;
  top: 0;
  flex-direction: column;
  background: #171b22;
  width: 100%;
  height: 200px;

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
        background-image: linear-gradient(
          to right,
          var(--bin-color-primary-light4),
          var(--bin-color-primary)
        );
        -webkit-background-clip: text;
        color: transparent;
        font-family: YouSheBiaoTiHei, PingFangSC-Medium, PingFang SC, Microsoft YaHei, Arial,
          Helvetica, sans-serif;
      }
      h4 {
        font-weight: normal;
        font-size: 14px;
        letter-spacing: 2px;
        text-transform: uppercase;
        color: var(--bin-color-primary-light5);
        font-family: Orbitron-Bold, PingFangSC-Medium, PingFang SC, Microsoft YaHei, Arial,
          Helvetica, sans-serif;
      }
    }
  }

  .nav-img {
    position: absolute;
    width: 100%;
    height: 260px;
    background-size: cover;
    background-position: center;
    background-image: url('@/assets/images/nav-img.png');
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
</style>
