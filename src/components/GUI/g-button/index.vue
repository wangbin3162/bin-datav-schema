<template>
  <div class="dv-gui g-button" :class="{ inline }" :style="style">
    <b-button :type="type" :icon="icon" :size="size" :disabled="disabled" @click="emit('click')">
      {{ title }}
    </b-button>
    <span v-if="label" class="g-input__caption">{{ label }}</span>
  </div>
</template>

<script setup>
defineOptions({
  name: 'GButton',
})

const emit = defineEmits(['click'])
const props = defineProps({
  label: {
    type: String,
    default: '',
  },
  type: {
    type: String,
    default: 'text',
  },
  icon: {
    type: String,
    default: '',
  },
  size: {
    type: String,
    default: 'small',
  },
  inline: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    default: '按钮',
  },
  style: {
    type: Object,
    default: ()=>{},
  },
})
</script>

<style scoped>
.dv-gui.g-button {
  line-height: 28px;
  .g-input__caption {
    line-height: 1;
  }
}
</style>
