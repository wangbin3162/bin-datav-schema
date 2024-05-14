<template>
  <div>
    <b-button type="text" @click="open">{{ label }}</b-button>
    <b-modal
      v-model="visible"
      :title="modalTitle"
      :mask-closable="false"
      :esc-closable="false"
      width="1200px"
      top="60px"
      draggable
      append-to-body
      destroy-on-close
      @opened="render = true"
    >
      <div class="code-editor">
        <template v-if="render">
          <div class="fun">
            <b-ace-editor
              v-model="str"
              height="320px"
              theme="tomorrow_night"
              :styles="{ border: 'none' }"
            />
          </div>
          <div class="right-tip">
            <b-radio-group :model-value="0" type="capsule" size="large" style="width: 100%">
              <b-radio :label="0">样式示例</b-radio>
            </b-radio-group>
            <div class="tip-content">
              <b-scrollbar>
                <b-collapse :model-value="'0'" simple>
                  <b-collapse-panel
                    v-for="(item, index) in exampleDesc"
                    :key="index"
                    :name="index + ''"
                    :title="`示例${index + 1}: ${item.name}`"
                  >
                    <div class="code">
                      <highlightjs language="js" :code="item.code" />
                    </div>
                  </b-collapse-panel>
                </b-collapse>
              </b-scrollbar>
            </div>
          </div>
        </template>

        <b-skeleton animation v-else :rows="15"></b-skeleton>
      </div>
      <template #footer>
        <div flex="main:justify">
          <div flex="cross:center">
            <b-tag type="primary">
              <b-icon name="file-text"></b-icon>
              说明
            </b-tag>
            <span class="pl-5" style="color: var(--bin-color-danger-light1)">
              高级样式配置，格式为style对象，会覆盖默认配置
            </span>
          </div>
          <div>
            <b-button @click="visible = false">关闭</b-button>
            <b-button type="primary" @click="handleSave">保存</b-button>
          </div>
        </div>
      </template>
    </b-modal>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
defineOptions({
  name: 'AdvanceStyle',
})

const emit = defineEmits(['update:modelValue'])
const props = defineProps({
  modelValue: {
    type: String,
  },
  label: {
    type: String,
    default: '配置',
  },
  modalTitle: {
    type: String,
    default: '高级样式配置',
  },
})

const render = ref(false)
const visible = ref(false)
const str = ref('')
const exampleDesc = [
  {
    name: '文字渐变',
    code: JSON.stringify(
      {
        'font-weight': 'bolder',
        'background-image': '-webkit-linear-gradient(bottom, red, #fd8403, yellow)',
        '-webkit-background-clip': 'text',
        '-webkit-text-fill-color': 'transparent',
      },
      null,
      2,
    ),
  },
]

const data = computed({
  get: () => props.modelValue,
  set: val => emit('update:modelValue', val),
})

function open() {
  render.value = false
  visible.value = true
  str.value = data.value
}

// 保存关闭
async function handleSave() {
  visible.value = false
  data.value = str.value
}
</script>

<style scoped>
.code-editor {
  height: 320px;
  display: flex;
  background-color: var(--schema-color-bg-2);

  .fun {
    display: flex;
    flex-direction: column;
    width: calc(100% - 480px);
    font-size: 14px;
    color: #b478cf;
    .params {
      color: var(--bin-color-primary);
    }
    .code {
      padding: 5px 5px 5px 0;
      flex: 1;
    }
    .bottom {
      margin-bottom: 5px;
    }
  }
  .right-tip {
    width: 480px;
    border-left: 1px solid var(--v-g-border-color);
    padding-left: 8px;
    .tip-content {
      height: calc(100% - 40px);
      margin-top: 6px;
      overflow-y: auto;
    }
  }
  :deep(.hljs) {
    padding: 16px;
    border-radius: 8px;
    font-size: 13px;
    font-family: Monaco, Menlo, 'Ubuntu Mono', Consolas, source-code-pro, monospace;
    /* background: #f5f6f7; */
    white-space: pre-wrap;
    line-height: 1.5715;
  }
  :deep(.bin-collapse) {
    border: none;
    background-color: var(--schema-color-bg-2);
  }
  :deep(.bin-collapse > .bin-collapse-item) {
    border: none;
  }
  :deep(.bin-collapse > .bin-collapse-item > .bin-collapse-header) {
    border-bottom: 1px solid transparent;
  }
  :deep(.bin-collapse-content) {
    padding: 0;
    background-color: var(--schema-color-bg-2);
    .bin-collapse-content-box {
      padding: 0;
      color: #fafafa;
      .tip {
        color: #fff;
      }
    }
  }
}
:deep(.bin-skeleton.is-animated .bin-skeleton__item) {
  background: linear-gradient(90deg, #1e1e1f 25%, #232324 37%, #1e1e1f 63%);
}
</style>
