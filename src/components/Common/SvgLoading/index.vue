<template>
  <div class="svg-loading-wrapper" :style="loadingStyle">
    <component :is="name"></component>
  </div>
</template>

<script>
import Loading01 from './loading/loading01.vue'
import Loading02 from './loading/loading02.vue'
import Loading03 from './loading/loading03.vue'
import Loading04 from './loading/loading04.vue'
import Loading05 from './loading/loading05.vue'
import Loading06 from './loading/loading06.vue'
import Loading07 from './loading/loading07.vue'
import Loading08 from './loading/loading08.vue'
import Loading09 from './loading/loading09.vue'
import Loading10 from './loading/loading10.vue'
import Loading11 from './loading/loading11.vue'
import Loading12 from './loading/loading12.vue'
import LoadingText from './loading/loading-text.vue'

/**
 * design by https://loading.io/
 */
export default {
  name: 'SvgLoading',
  components: {
    Loading01,
    Loading02,
    Loading03,
    Loading04,
    Loading05,
    Loading06,
    Loading07,
    Loading08,
    Loading09,
    Loading10,
    Loading11,
    Loading12,
    LoadingText,
  },
  props: {
    name: {
      type: String,
      required: true,
    },
    width: {
      type: Number,
      default: 200,
    },
    height: {
      type: Number,
    },
    background: {
      type: String,
      default: 'transparent',
    },
  },
  computed: {
    loadingStyle() {
      return {
        width: `${this.width}px`,
        height: `${this.height ? this.height : this.width}px`,
        background: this.background,
      }
    },
  },
}
</script>
