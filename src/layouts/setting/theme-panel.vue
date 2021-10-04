<template>
  <div class="theme-panel" :class="{'is-horizontal':mode==='horizontal'}">
    <div class="theme-item" v-if="!onlyTheme">
      <h3 class="setting-title"><span>整体风格设置</span></h3>
      <div>
        <div class="theme-tab">
          <b-tooltip content="亮色主题风格" append-to-body>
            <span @click="themChange('light')">
              <img src="@/assets/images/light.svg" alt="">
              <i v-if="theme === 'light'" class="b-iconfont b-icon-check"></i>
            </span>
          </b-tooltip>
        </div>
        <div class="theme-tab">
          <b-tooltip content="暗色主题风格" append-to-body>
            <span @click="themChange('dark')">
              <img src="@/assets/images/dark.svg" alt="">
              <i v-if="theme === 'dark'" class="b-iconfont b-icon-check"></i>
            </span>
          </b-tooltip>
        </div>
      </div>
    </div>
    <div class="theme-item">
      <h3 class="setting-title"><span>系统主题</span></h3>
      <div class="theme-picker">
        <span
          v-for="color in systemPrimaryColorList"
          :key="color"
          class="color-item"
          :class="{active:isActiveColor(systemPrimary,color)}"
          :style="{background:color}"
          @click="setSystemPrimary(color)"
        ></span>
      </div>
    </div>
    <div class="theme-item">
      <h3 class="setting-title"><span>菜单主题</span></h3>
      <div class="theme-picker">
        <span
          v-for="color in menuThemeColorList"
          :key="color"
          class="color-item"
          :class="{active:isActiveColor(menuTheme,color)}"
          :style="{background:color}"
          @click="setMenuTheme(color)"
        ></span>
      </div>
    </div>
  </div>
</template>

<script>
import useSetting from '@/hooks/store/useSetting'
import { Utils } from 'bin-ui-next'

const { isEqual } = Utils.color

export default {
  name: 'ThemePanel',
  props: {
    mode: String,
    onlyTheme: Boolean,
  },
  setup() {
    const {
      theme,
      menuTheme,
      systemPrimary,
      themChange,
      setMenuTheme,
      setSystemPrimary,
      systemPrimaryColorList,
      menuThemeColorList,
    } = useSetting()

    function isActiveColor(color1, color2) {
      return isEqual(color1, color2)
    }

    return {
      theme,
      systemPrimary,
      themChange,
      systemPrimaryColorList,
      setSystemPrimary,
      menuThemeColorList,
      menuTheme,
      setMenuTheme,
      isActiveColor,
    }
  },
}
</script>

<style lang="stylus" scoped>
@import "../../assets/stylus/base/mixins.styl"
// 主题弹窗样式
.theme-panel {
  padding: 0 4px;
  &.is-horizontal {
    display: flex;
    .theme-item {
      width: 260px;
      margin-right: 24px;
    }
  }
  .theme-tab {
    position: relative;
    display: inline-flex;
    margin-right: 20px;
    height: 45px;
    cursor: pointer;
    .b-icon-check {
      position: absolute;
      right: 6px;
      bottom: 6px;
      font-size: 18px;
      color: getColor();
    }
  }
  .setting-title {
    position: relative;
    display: block;
    height: 1px;
    width: 100%;
    margin: 24px 0;
    background-color: #eeeeee;
    > span {
      position: absolute;
      background-color: #fff;
      padding: 0 12px;
      font-weight: 500;
      color: #303133;
      font-size: 15px;
      left: 50%;
      transform: translateX(-50%) translateY(-50%);
    }
  }
  .theme-picker {
    display: flex;
    flex-wrap: wrap;
    margin: 16px 0;
    justify-content: space-around;
    .color-item {
      cursor: pointer;
      box-sizing: border-box;
      width: 20px;
      height: 20px;
      border-radius: 2px;
      border: 1px solid #eeeeee;
      &.active {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        color: #fff;
        border-color: getColor();
        &:after {
          color: inherit;
          font-family: "b-iconfont" !important;
          content: "\e829";
        }
      }
    }
  }
}
</style>
