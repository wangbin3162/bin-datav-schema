<template>
  <div class="dv-gui g-breadcrumb">
    <b-breadcrumb separator=">">
      <b-breadcrumb-item>
        <span
          class="dv-item"
          :class="{ 'dv-link': drillFilters.length }"
          :style="{ color: fontColor }"
          @click="handleRootClick(drillData[0], 0)"
        >
          {{ drillData[0].title }}
        </span>
      </b-breadcrumb-item>
      <b-breadcrumb-item v-for="(item, index) in drillFilters" :key="item.fieldId">
        <span
          class="dv-item"
          :class="{ 'dv-link': index < drillFilters.length - 1 }"
          :style="{ color: fontColor }"
          @click="handleClick(item, index)"
        >
          {{ item.complexFilter.items[0].value }}
        </span>
      </b-breadcrumb-item>
    </b-breadcrumb>
  </div>
</template>

<script setup>
defineOptions({
  name: 'GBreadcrumb',
})

const emit = defineEmits(['scroll-up'])
const props = defineProps({
  drillData: {
    // 下钻数据
    type: Array,
    default: () => [],
  },
  drillIndex: {
    // 下钻层级
    type: Number,
    default: 0,
  },
  drillFilters: {
    // 下钻数据拼接，（动态的）
    type: Array,
    default: () => [],
  },
  fontColor: {
    type: String,
  },
})

function handleRootClick(item, index) {
  if (props.drillFilters.length) {
    emit('scroll-up', { item, index })
  }
}

// 下钻条件点击
function handleClick(item, index) {
  if (index < props.drillFilters.length - 1) {
    emit('scroll-up', { item, index: index + 1 })
  }
}
</script>

<style scoped>
.dv-gui {
  &.g-breadcrumb {
    position: absolute;
    top: 0;
    left: 16px;
    width: 100%;
    margin-bottom: 4px;
    .dv-item {
      color: rgba(255, 255, 255, 0.65);
    }
    .dv-link {
      cursor: pointer;
      color: #fff;
      &:hover {
        color: var(--bin-color-primary) !important;
      }
    }
  }
}
</style>
