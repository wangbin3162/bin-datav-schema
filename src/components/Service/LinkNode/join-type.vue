<template>
  <i class="svg-icon-wrapper" v-if="showJoin">
    <svg
      class="svg-icon"
      :style="svgSize"
      viewBox="0 0 1536 1024"
      aria-hidden="true"
      width="1em"
      height="1em"
      fill="currentColor"
    >
      <path d="M512 512m-512 0a512 512 0 1 0 1024 0 512 512 0 1 0-1024 0Z" fill="#2153D4" :fill-opacity="svgType[0]"></path>
      <path d="M1024 512m-512 0a512 512 0 1 0 1024 0 512 512 0 1 0-1024 0Z" fill="#2153D4" :fill-opacity="svgType[1]"></path>
      <path
        d="M768.0512 68.5056A511.7952 511.7952 0 0 1 1024 512a511.7952 511.7952 0 0 1-255.9488 443.4944A511.6416 511.6416 0 0 1 512 512a511.744 511.744 0 0 1 249.7536-439.808z"
        fill="#2153D4" :fill-opacity="svgType[2]">
      </path>
      <path
        d="M512 0c282.7776 0 512 229.2224 512 512s-229.2224 512-512 512S0 794.7776 0 512 229.2224 0 512 0z m0 51.2a460.8 460.8 0 1 0 0 921.6 460.8 460.8 0 0 0 0-921.6z"
        fill="#2153D4"></path>
      <path
        d="M1024 0c282.7776 0 512 229.2224 512 512s-229.2224 512-512 512-512-229.2224-512-512S741.2224 0 1024 0z m0 51.2a460.8 460.8 0 1 0 0 921.6 460.8 460.8 0 0 0 0-921.6z"
        fill="#2153D4"></path>
    </svg>
  </i>
</template>

<script>
import { isEmpty } from '@/utils/util'
import { JOIN_TYPE } from '@/components/Service/LinkNode/node-util'

export default {
  name: 'join-type',
  props: {
    type: {
      type: String,
      default: '',
    },
    size: {
      type: Number,
      default: 8,
    },
  },
  computed: {
    showJoin() {
      return !isEmpty(JOIN_TYPE[this.type])
    },
    svgType() {
      const opacity = {
        LEFT_OUTER_JOIN: [.5, 0, .5],
        INNER_JOIN: [0, 0, .5],
        FULL_OUTER_JOIN: [.5, .5, .5],
      }
      return opacity[this.type]
    },
    svgSize() {
      return {
        width: `${this.size * 3}px`,
        height: `${this.size * 2}px`,
      }
    },
  },
}
</script>

<style scoped lang="stylus">
.svg-icon-wrapper {
  display: block;
  height: 16px;
  background-color: #f2f2f2;
  svg {
    width: 24px;
    height: 16px;
  }
}
</style>
