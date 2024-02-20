<template>
  <div class="params-map">
    <div flex class="params-list">
      <div class="left">
        <div class="title">动作参数</div>

        <div
          class="fields"
          :class="{ empty: actionParams.length === 0 }"
          @dragover="handleDragOver"
          @drop="handleDropFields"
        >
          <div
            v-for="(item, index) in actionParams"
            :key="item.name"
            class="param-field"
            flex="main:justify cross:center"
            @dragover="handleDragOver"
            @drop="handleDropField($event, item)"
          >
            <div class="text t-left" :title="item.desc">
              <b-button
                v-if="item.append"
                type="text"
                text-color="danger"
                icon="close-circle"
                title="取消"
                @click="handleDelField(index)"
              />
              <span :title="item.desc">{{ item.mapDesc ? item.mapDesc : item.desc }}</span>
            </div>

            <template v-if="Boolean(item.map) && isShow">
              <i class="b-iconfont b-icon-swap" style="color: white"></i>
              <div class="text t-right" :title="item.map.desc">
                <b-button
                  type="text"
                  text-color="danger"
                  icon="close-circle"
                  title="取消"
                  @click="handleCancel(item)"
                />
                <span :title="item.map.desc">
                  {{ item.map.mapDesc ? item.map.mapDesc : item.map.desc }}
                </span>
              </div>
            </template>

            <template v-else>
              <span class="text t-right" :title="item.name">
                {{ item.mapName ? item.mapName : item.name }}
              </span>
            </template>
          </div>
        </div>

        <div class="btn-con">
          <b-button style="width: 100%" type="primary" size="small" @click="handleSave">
            保存
          </b-button>
        </div>
      </div>

      <div class="right">
        <div class="title" style="color: #52c41a">事件参数</div>
        <div
          v-for="item in emitParams"
          :key="item.name"
          class="param-field move"
          flex="main:justify cross:center"
          draggable="true"
          @dragstart="handleDrag($event, item)"
        >
          <span class="text">{{ item.mapDesc ? item.mapDesc : item.desc }}</span>
          <span class="text t-right">{{ item.mapName ? item.mapName : item.name }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { deepCopy } from '@/utils/util'
import { Message } from 'bin-ui-design'

const emit = defineEmits(['save'])
const props = defineProps({
  emitListAll: {
    type: Array,
    default: () => [],
  },
  onEvent: {
    type: Object,
    default: null,
  },
  isShow: {
    type: Boolean,
    default: true,
  },
})
// 事件参数
const emitParams = computed(() => {
  return props.emitListAll.find(item => item.indexIdEventName === props.onEvent.indexIdEventName)
    .params
})

// 动作参数
const actionParams = ref(deepCopy(props.onEvent.actionParams))

// 开始拖拽
function handleDrag(ev, ep) {
  ev.dataTransfer.setData('eventParams', JSON.stringify(ep))
}

// 拖拽结束
function handleDragOver(ev) {
  ev.preventDefault()
}

// 放置到对应字段
function handleDropField(ev, ap) {
  ev.preventDefault()
  ev.stopPropagation()
  const epStr = ev.dataTransfer.getData('eventParams')
  const ep = JSON.parse(epStr)
  if (ap.append) {
    Message.warning('追加字段无需映射。')
  } else if (ap.name === ep.name) {
    Message.warning('相同字段无需映射。')
  } else {
    ap.map = ep
  }
}

// 放置到动作参数区
function handleDropFields(ev) {
  ev.preventDefault()
  const ep = ev.dataTransfer.getData('eventParams')
  actionParams.value.push({
    append: true, // 表示为追加得参数
    ...JSON.parse(ep),
  })
}

// 取消映射
function handleCancel(ap) {
  delete ap.map
}

// 追加字段删除按钮回调
function handleDelField(index) {
  actionParams.value.splice(index, 1)
}

// 保存按钮
function handleSave() {
  emit('save', actionParams.value)
}
</script>

<style scoped>
.params-map {
  height: 100%;
  .title {
    padding-left: 5px;
    line-height: 30px;
    color: var(--bin-color-primary);
  }

  .param-field {
    margin: 5px;
    padding: 0 5px;
    height: 36px;
    &.move {
      cursor: move;
    }

    .text {
      width: 100px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      color: white;
    }
  }

  .params-list {
    height: 100%;

    .left {
      position: relative;
      display: flex;
      flex-direction: column;
      height: 100%;
      width: 50%;
      border-right: 1px solid var(--s-border-color-2);

      .fields {
        flex: auto;

        &.empty:before {
          content: '暂无动作参数';
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          color: white;
        }
      }
    }

    .right {
      height: 100%;
      width: 50%;
    }
  }

  .btn-con {
    padding: 5px;
    text-align: right;
    border-top: 1px solid rgba(0, 0, 0, 0.1);
  }
}
</style>
