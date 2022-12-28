<template>
  <div class="setting-panel-gui">
    <div class="icon-list" flex="wrap:wrap">
      <div
        class="icon-item"
        :class="config.src === item ? 'icon-selected' : ''"
        v-for="(item, index) in baseIcons"
        :key="index"
        @click="selectIcon(item)"
      >
        <b-icon :name="item"></b-icon>
      </div>
    </div>
    <g-field label="图标颜色">
      <g-color-picker v-model="config.color" />
    </g-field>
    <g-field label="图标类型">
      <b-radio-group v-model="config.pointerType" type="button" size="mini">
        <b-radio v-for="item in pointerType" :key="item.value" :label="item.value">
          {{ item.label }}
        </b-radio>
      </b-radio-group>
    </g-field>
    <g-field-collapse label="超链接配置" v-if="config.pointerType === 'btn'">
      <g-field label="超链接" tooltip="点击标题区域可跳转至设定的超链接">
        <g-input v-model="config.urlConfig.url" placeholder="目标地址" />
      </g-field>
      <g-field label="新窗口打开">
        <div class="pt-5">
          <b-switch v-model="config.urlConfig.isBlank" size="small" />
        </div>
      </g-field>
    </g-field-collapse>
  </div>
</template>

<script setup>
import { computed, watch } from 'vue'
import { pointerType } from './config'
import builtInIcons from './iconfont.json'

const iconList = builtInIcons.glyphs.map(v => v.font_class)
const baseIcons = [
  ...iconList.filter(i => !i.includes('-fill')),
  ...iconList.filter(i => i.includes('-fill')),
]

const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
})

const config = computed(() => props.data.config)

function selectIcon(icon) {
  config.value.src = icon
}

watch(
  () => props.data.attr.w,
  w => {
    config.value.size = w * 1.8
  },
)
</script>

<style scoped lang="stylus">
.icon-list{
  width: 100%;
  height: 320px;
  overflow: auto;

  .icon-item{
    display: flex;
    align-items: center;
    justify-content: center;
    width: 30px;
    height: 30px;
    padding: 5px;
    color: #ccc;
    font-size: 22px;
    border-radius: 4px;
    margin: 5px 0 0 5px;
    cursor: pointer;
    &:hover, &.icon-selected{
      color: #fff;
      background-color: var(--bin-color-primary);
    }
  }
}
</style>
