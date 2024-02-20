<template>
  <b-drawer
    v-model="open"
    :title="title"
    :width="width"
    :mask-closable="false"
    :styles="{ padding: 0 }"
    class-name="source-drawer"
    append-to-body
  >
    <div class="axis-fields-config" flex>
      <div class="left">
        <div class="title">类别轴/维度</div>
        <div
          style="height: calc(50% - 34px); overflow-y: auto; overflow-x: hidden"
          class="field-box"
          :class="[...newXClass]"
        >
          <draggable
            v-model="xFields"
            :group="{
              name: 'xFields',
              pull: false,
              put: ['fields'],
            }"
            :animation="150"
            :sort="false"
            item-key="field"
            style="height: 100%; overflow-x: hidden"
          >
            <template #item="{ element, index }">
              <div flex="main:justify" style="padding: 0px 16px; line-height: 30px">
                <div style="color: rgba(255, 255, 255, 0.8)">{{ element.title }}</div>
                <b-button type="text" @click="handleDelX(index)">删除</b-button>
              </div>
            </template>
          </draggable>
        </div>

        <b-divider style="margin: 0px"></b-divider>
        <div class="title" style="color: #52c41a">值轴/度量</div>
        <div
          style="height: calc(50% - 60px); overflow-y: auto"
          class="field-box1"
          :class="[...newYClass]"
          flex="dir:top"
        >
          <draggable
            v-model="yFields"
            :group="{
              name: 'yFields',
              pull: false,
              put: ['fields'],
            }"
            :animation="150"
            :sort="false"
            item-key="field"
            style="height: 100%; overflow-x: hidden"
          >
            <template #item="{ element, index }">
              <div flex="main:justify" style="padding: 0px 16px; line-height: 30px">
                <div style="color: rgba(255, 255, 255, 0.8)">{{ element.title }}</div>
                <b-button type="text" @click="handleDelY(index)">删除</b-button>
              </div>
            </template>
          </draggable>
        </div>
        <b-button type="primary" style="width: 100%" @click="handleSave">保存</b-button>
      </div>

      <div class="right">
        <draggable
          :list="fields"
          :group="{
            name: 'fields',
            pull: 'clone',
            put: false,
          }"
          :animation="150"
          :sort="false"
          :clone="handleClone"
          item-key="name"
          style="height: 100%; overflow-x: hidden"
          @start="handleStart"
          @end="handleEnd"
        >
          <template #item="{ element }">
            <div
              style="
                padding: 0px 16px;
                line-height: 30px;
                cursor: move;
                color: rgba(255, 255, 255, 0.8);
              "
              flex="main:justify cross:center"
            >
              <div>{{ element.desc }}</div>
              <div style="color: #999">{{ element.type }}</div>
            </div>
          </template>
        </draggable>
      </div>
    </div>
  </b-drawer>
</template>

<script setup>
import { computed, ref, watch } from 'vue'
import Draggable from 'vuedraggable'
import { Message } from 'bin-ui-design'

const emit = defineEmits(['update:modelValue', 'update:axisFields'])
const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    default: '轴线字段配置',
  },
  width: {
    type: Number,
    default: 500,
  },
  fields: {
    type: Array,
    default: () => [],
  },
  axisFields: {
    type: Object,
    default: () => ({
      x: [],
      y: [],
    }),
  },
})
const open = computed({
  get() {
    initData()
    return props.modelValue
  },
  set(val) {
    emit('update:modelValue', val)
  },
})

const xFields = ref([])

const yFields = ref([])

function initData() {
  xFields.value = props.axisFields.x
  yFields.value = props.axisFields.y
}

watch(
  () => xFields.value,
  (newVal, oldVal) => {
    if (oldVal) {
      if (oldVal.find(v => v.field === newField.value.field && addStatus.value)) {
        xFields.value = oldVal
        Message.warning('已存在同名字段！无需重复配置。')
      }
    }
    addStatus.value = false
  },
)

watch(
  () => yFields.value,
  (newVal, oldVal) => {
    if (oldVal) {
      if (oldVal.find(v => v.field === newField.value.field && addStatus.value)) {
        yFields.value = oldVal
        Message.warning('已存在同名字段！无需重复配置。')
      }
    }
    addStatus.value = false
  },
)

async function handleSave() {
  const axisFields = {
    x: [...xFields.value],
    y: [...yFields.value],
  }
  await emit('update:axisFields', axisFields)
  Message.success('保存成功')
  open.value = false
}

const newXClass = computed(() => {
  const arr = []
  if (xFields.value.length === 0) {
    arr.push('placeholder')
  }
  return arr
})
const newYClass = computed(() => {
  const arr = []
  if (yFields.value.length === 0) {
    arr.push('placeholder')
  }
  return arr
})

const newField = ref({ field: '', title: '' })
const addStatus = ref(false)

function handleStart(e) {
  addStatus.value = true
  newField.value = {
    field: props.fields[e.oldIndex].name,
    title: props.fields[e.oldIndex].desc,
  }
}

function handleEnd() {
  addStatus.value = false
}

function handleClone({ name, desc }) {
  return { field: name, title: desc }
}

function handleDelX(index) {
  const arr = [...xFields.value]
  arr.splice(index, 1)
  xFields.value = arr
}

function handleDelY(index) {
  const arr = [...yFields.value]
  arr.splice(index, 1)
  yFields.value = arr
}
</script>

<style scoped>
.axis-fields-config {
  height: 100%;

  .left {
    width: 50%;
    border-right: 1px solid var(--s-border-color-2);
    .title {
      line-height: 30px;
      padding: 0px 16px;
      color: #1089ff;
    }
    .field-box {
      &.placeholder:before {
        content: '拖拽右侧需要配置的字段';
        position: absolute;
        top: 25%;
        left: 25%;
        transform: translate(-50%, -50%);
        color: rgba(255, 255, 255, 0.6);
        pointer-events: none;
      }
    }
    .field-box1 {
      &.placeholder:before {
        content: '拖拽右侧需要配置的字段';
        position: absolute;
        top: 75%;
        left: 25%;
        transform: translate(-50%, -50%);
        color: rgba(255, 255, 255, 0.6);
        pointer-events: none;
      }
    }
  }

  .right {
    width: 50%;
    overflow-y: auto;
  }
}
</style>
