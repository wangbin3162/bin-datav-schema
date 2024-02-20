<template>
  <b-drawer
    v-model="open"
    :title="title"
    :width="width"
    :mask-closable="false"
    class-name="source-drawer"
    :styles="{ padding: 0 }"
    append-to-body
  >
    <div class="axis-fields-config" flex>
      <div class="left">
        <div class="title">字段列配置</div>
        <div
          style="height: calc(100% - 34px - 32px); overflow-y: auto; overflow-x: hidden"
          class="field-box"
          :class="[...newXClass]"
        >
          <draggable
            v-model="headerFields"
            :group="{
              name: 'headerFields',
              pull: false,
              put: ['fields'],
            }"
            :animation="150"
            :sort="false"
            item-key="field"
            style="height: 100%"
          >
            <template #item="{ element, index }">
              <div
                flex="main:justify"
                style="padding: 0px 16px; line-height: 30px; color: rgba(255, 255, 255, 0.8)"
              >
                {{ element.title }}
                <b-button type="text" @click="handleDelX(index)">删除</b-button>
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
          style="height: 100%"
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
              <div style="color: #999; font-size: 13px">{{ element.type }}</div>
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
    default: '字段列配置',
  },
  width: {
    type: Number,
    default: 550,
  },
  fields: {
    type: Array,
    default: () => [],
  },
  titleTop: {
    type: String,
    default: '类别轴/维度',
  },
  titleBottom: {
    type: String,
    default: '值轴/度量',
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

const headerFields = ref([])

function initData() {
  headerFields.value = props.axisFields.header ?? []
}

watch(
  () => headerFields.value,
  (newVal, oldVal) => {
    if (oldVal) {
      if (oldVal.find(v => v.field === newField.value.field && addStatus.value)) {
        headerFields.value = oldVal
        Message.warning('已存在同名字段！无需重复配置。')
      }
    }
    addStatus.value = false
  },
)

function handleSave() {
  const axisFields = {
    header: [...headerFields.value],
  }
  emit('update:axisFields', axisFields)
  Message.success('保存成功')
  open.value = false
}

const newXClass = computed(() => {
  const arr = []
  if (headerFields.value?.length === 0) {
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
  const arr = [...headerFields.value]
  arr.splice(index, 1)
  headerFields.value = arr
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
  }

  .right {
    width: 50%;
    overflow-y: auto;
  }
}
</style>
