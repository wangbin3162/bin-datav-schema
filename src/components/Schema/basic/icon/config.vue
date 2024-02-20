<template>
  <div class="setting-panel-gui">
    <g-field-collapse label="属性" default-open>
      <g-field label="图标颜色">
        <b-icon-select v-model="config.src" style="width: 100%" />
      </g-field>
      <g-field label="图标颜色">
        <g-color-picker v-model="config.color" />
      </g-field>
      <g-field label="图标类型">
        <b-radio-group v-model="config.pointerType" type="button" size="small">
          <b-radio v-for="item in pointerType" :key="item.value" :label="item.value">
            {{ item.label }}
          </b-radio>
        </b-radio-group>
      </g-field>
    </g-field-collapse>

    <g-field-collapse label="超链接配置" v-if="config.pointerType === 'btn'">
      <g-field label="超链接" tooltip="点击标题区域可跳转至设定的超链接">
        <g-input v-model="config.urlConfig.url" placeholder="目标地址" />
      </g-field>
      <g-field label="新窗口打开">
        <b-switch v-model="config.urlConfig.isBlank" size="small" />
      </g-field>
    </g-field-collapse>
  </div>
</template>

<script setup>
import { computed, watch } from 'vue'
import { pointerType } from './config'

const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
})

const config = computed(() => props.data.config)

watch(
  () => props.data.attr.w,
  w => {
    config.value.size = w * 1.8
  },
)
</script>
