<template>
  <div class="setting-panel-gui">
    <g-field label="圆角" tooltip="当应用渐变边框或图片边框时，圆角失效">
      <g-input-number v-model="config.borderRadius" :min="0" :step="1" suffix="px" />
    </g-field>
    <g-field label="填充透明度">
      <g-slider v-model="config.fills[0].opacity" :min="0" :max="1" :step="0.05" />
    </g-field>
    <g-field label="填充颜色">
      <g-color-picker v-model="config.fills[0].fill" />
    </g-field>
    <g-field label="滤镜" flat>
      <g-input v-model="config.filter.blur" inline label="模糊" />
      <g-input v-model="config.backdropFilter.blur" label="毛玻璃模糊" inline />
    </g-field>
    <g-field-collapse v-model="config.border.show" toggle label="边框">
      <g-field label="边框类型">
        <b-radio-group v-model="config.border.type" type="button" size="mini">
          <b-radio v-for="em in borderTypes" :key="em.value" :label="em.value">
            {{ em.label }}
          </b-radio>
        </b-radio-group>
      </g-field>
      <!--纯色边框配置-->
      <template v-if="config.border.type === 'flat'">
        <g-field label="边框配置" flat>
          <g-input-number
            v-model="config.border.flat.width"
            :min="0"
            :max="100"
            :step="1"
            suffix="px"
            inline
            label="粗细"
          />
          <g-select v-model="config.border.flat.style" :data="lineStyles" inline label="样式" />
          <g-color-picker v-model="config.border.flat.color" label="颜色" />
        </g-field>
      </template>
      <!--渐变色-->
      <template v-if="config.border.type === 'linearGradient'">
        <g-field label="粗细">
          <g-input-number
            v-model="config.border.linearGradient.width"
            :min="0"
            :max="100"
            :step="1"
            suffix="px"
          />
        </g-field>
        <g-field label="角度">
          <g-input-number
            v-model="config.border.linearGradient.color.angle"
            :min="0"
            :max="360"
            :step="1"
            suffix="度"
          />
        </g-field>
        <g-field label="节点1" flat>
          <g-input-number
            v-model="config.border.linearGradient.color.stops[0].offset"
            :min="0"
            :max="100"
            :step="1"
            inline
            label="位置"
          />
          <g-color-picker
            v-model="config.border.linearGradient.color.stops[0].color"
            inline
            label="颜色"
          />
        </g-field>
        <g-field label="节点2" flat>
          <g-input-number
            v-model="config.border.linearGradient.color.stops[1].offset"
            :min="0"
            :max="100"
            :step="1"
            inline
            label="位置"
          />
          <g-color-picker
            v-model="config.border.linearGradient.color.stops[1].color"
            inline
            label="颜色"
          />
        </g-field>
      </template>
      <!--图片-->
      <g-field v-if="config.border.type === 'image'" label="配置方式">
        <b-radio-group v-model="config.border.imageType" type="button" size="mini">
          <b-radio v-for="em in imageTypes" :key="em.value" :label="em.value">
            {{ em.label }}
          </b-radio>
        </b-radio-group>
      </g-field>
      <g-field
        v-if="config.border.type === 'image' && config.border.imageType === 'preset'"
        label="边框配置"
      >
        <g-images-select v-model="config.border.presetImage" :images="['box']" />
      </g-field>
      <g-field
        v-if="config.border.type === 'image' && config.border.imageType === 'custom'"
        label="边框配置"
      >
        <g-upload-img v-model="config.border.customImage.source" label="图片" />
        <g-input v-model="config.border.customImage.slice" label="切片" />
        <g-input v-model="config.border.customImage.width" label="宽度" />
        <g-input v-model="config.border.customImage.outset" label="外扩" />
        <g-select v-model="config.border.customImage.repeat" :data="repeatTypes" label="平铺类型" />
      </g-field>
    </g-field-collapse>

    <g-field-collapse v-model="config.shadow.show" toggle label="阴影">
      <g-field label="阴影属性" tooltip="遵循shadow除颜色之外的设置项，可设置inset">
        <g-input v-model="config.shadow.size" />
      </g-field>
      <g-field label="阴影颜色">
        <g-color-picker v-model="config.shadow.color" />
      </g-field>
    </g-field-collapse>

    <g-field-collapse label="超链接配置" tooltip="点击标题区域可跳转至设定的超链接">
      <g-field label="超链接">
        <g-input v-model="config.urlConfig.url" />
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
import { toRef } from 'vue'
import { lineStyles, repeatTypes } from '@/config/select-options'
import { borderTypes, imageTypes } from './config'

const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
})
const config = toRef(props.data, 'config')
</script>
