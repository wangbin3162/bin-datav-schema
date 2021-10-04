<template>
  <div class="page-header">
    <div class="page-header-title">工作台</div>
    <div class="page-header-detail">
      <div class="avatar-img">
        <img src="@/assets/images/avatar/avatar05.jpeg" class="avatar" alt="avatar">
      </div>
      <div class="welcome">
        <div class="welcome-title">{{ welcomeTitle }}</div>
        <div class="welcome-weather">
          <span class="mr-8">{{ currentDate }}</span>
          <b-space v-if="showWeather">
            <span>{{ weather.city }}</span>
            <span>{{ weather.wea }}</span>
            <span>{{ weather.tem }}</span>
          </b-space>
        </div>
      </div>
      <div class="right-box">
        <div class="item">
          <div class="top">
            <iconfont icon="block" color="primary" bg round></iconfont>
            <span class="ml-5">项目数</span>
          </div>
          <p>12</p>
        </div>
        <div class="item">
          <div class="top">
            <iconfont icon="check-square" color="warning" bg round></iconfont>
            <span class="ml-5">代办项</span>
          </div>
          <p>{{ todoLabel }}</p>
        </div>
        <div class="item">
          <div class="top">
            <iconfont icon="bell" color="success" bg round></iconfont>
            <span class="ml-5">通知数量</span>
          </div>
          <p>23</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Iconfont from '@/components/Common/Iconfont/iconfont.vue'
import useTodos from '@/hooks/store/useTodos'
import useUser from '@/hooks/store/useUser'
import useSetting from '@/hooks/store/useSetting'

export default {
  name: 'top-box',
  components: { Iconfont },
  setup() {
    const { welcomeTitle, currentDate } = useUser()
    const { todoLabel } = useTodos()
    const { weather, showWeather } = useSetting()

    return {
      welcomeTitle,
      currentDate,
      todoLabel,
      weather,
      showWeather,
    }
  },
}
</script>

<style scoped lang="stylus">
@import "../../../assets/stylus/base/var.styl"
.page-header {
  padding: 16px 32px 0 32px;
  background: #fff;
  border-bottom: $border-base
  &-title {
    display: inline-block;
    color: $color-text-primary;
    font-weight: 500;
    font-size: 20px;
    margin-bottom: 16px;
  }
  &-detail {
    display: flex;
    margin-bottom: 16px;
    .avatar-img {
      .avatar {
        width: 64px;
        border-radius: 50%;
        font-size: 0;
        box-shadow: 0 0 2px rgba(0, 0, 0, .1);
      }
    }
    .welcome {
      flex: 1;
      padding: 0 24px;
      &-title {
        font-size: 20px;
        font-weight: 700;
        margin-bottom: 12px;
      }
      &-weather {
        color: $color-text-secondary;
      }
    }
    .right-box {
      width: 320px;
      justify-content: space-between;
      display: flex;
      .item {
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        width: 100px;
        text-align: right;
        .top {
          display: flex;
          align-items: center;
          color: #808695;
        }
        p {
          font-size: 22px;
          line-height: 32px;
        }
      }
    }
  }
}
</style>
