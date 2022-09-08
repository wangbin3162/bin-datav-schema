<template>
  <div class="group">
    {{ propValue }}
    <!-- <template v-for="item in propValue">
      <component
        class="component"
        :is="item.component"
        :style="item.groupStyle"
        :propValue="item.propValue"
        :key="item.id"
        :id="'component' + item.id"
        :element="item"
      />
    </template> -->
  </div>
</template>

<script>
import { ref } from 'vue '
export default {
  name: 'Group',
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const propValue = ref(props.data.components)

    const parentStyle = props.data.attr // {x,y,w,h}

    const toPercent = val => val * 100 + '%'
    return { propValue }
  },
}
</script>
