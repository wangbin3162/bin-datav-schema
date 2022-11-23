<template>
  <div class="collapse-group">
    <div class="header" :class="[{ active: show }]" flex="cross:center" @click="toggleShow">
      <div class="name">
        <div class="wrap-label">
          <div class="create-box" v-if="edit" @click.stop>
            <b-input
              v-model="editName"
              placeholder="输入名称，回车创建"
              v-focus
              size="mini"
              style="width: 150px; top: -2px"
              @blur="onAddInputBlur"
              @keyup.enter="onAddInputEnter"
            />
          </div>
          <div v-else>
            {{ title }}
          </div>
        </div>
        <span class="wrap-edit" v-if="canEdit && !edit">
          <i class="b-iconfont b-icon-edit" @click.stop="handleEdit"></i>
          <i class="b-iconfont b-icon-delete" @click.stop="handleRemove"></i>
        </span>
        <span class="wrap-arrow" :class="[{ show }]">
          <b-icon name="right" size="12"></b-icon>
        </span>
      </div>
    </div>
    <b-collapse-transition>
      <div v-show="show" class="content">
        <slot></slot>
      </div>
    </b-collapse-transition>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const emit = defineEmits(['edit', 'remove'])
const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  defaultOpen: {
    type: Boolean,
    default: true,
  },
  canEdit: {
    type: Boolean,
    default: true,
  },
})
const show = ref(props.defaultOpen)
const edit = ref(false)
const editName = ref('')
let cacheName = ''

const toggleShow = () => (show.value = !show.value)

function handleEdit() {
  edit.value = true
  editName.value = props.title
  cacheName = props.title
}

function onAddInputBlur(e) {
  const name = (e.target.value || '').trim()
  if (!name || name === cacheName) edit.value = false
}

function onAddInputEnter(e) {
  const name = (e.target.value || '').trim()
  if (name) editSave()
  else edit.value = false
}

function editSave() {
  edit.value = false
  emit('edit', editName.value)
}
const handleRemove = () => emit('remove')
</script>

<style lang="stylus" scoped>
.collapse-group {
  position: relative;
  .header {
    padding-left: 6px;
    border-bottom: 1px solid transparent;
    cursor: pointer;
    &.active {
      border-bottom: 1px solid var(--schema-color-border);
    }
    .name {
      width: 100%;
      height: 32px;
      span {
        display: inline-block;
        vertical-align: middle;
      }
      .wrap-arrow {
        transition: .2s;
        position: absolute;
        right: 10px;
        top: 9px;
        &.show {
          transform: rotate(90deg)
        }
        &.simple {
          cursor: pointer;
        }
      }
      &:hover {
        .wrap-edit {
          opacity: 1;
        }
      }
      .wrap-edit {
        position: absolute;
        right: 25px;
        top: 8px;
        opacity: 0;
        > i {
          font-size: 14px;
          &.b-icon-edit {
            margin-right: 3px;
          }
        }
      }
      .wrap-label {
        position: relative;
        line-height: 32px;
        padding-left: 10px;
        color: #fff;
        &:before {
          content: '';
          position: absolute;
          top: 10px;
          bottom: 10px;
          left: 0;
          width: 3px;
          border-radius: 2px;
          background-color: var(--bin-color-primary);
        }
      }
    }
  }
  .content {
    background-color: var(--schema-color-bg);
    padding: 0;
    color: var(--schema-font-color);
  }
  &:after {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    border-bottom: 1px solid var(--schema-color-border);
  }
}
</style>
