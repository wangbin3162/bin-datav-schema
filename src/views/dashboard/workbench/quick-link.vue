<template>
  <b-card :bordered="false" class="card-panel" shadow="never" :body-style="{padding: '0'}" divider="no">
    <template #header>
      <div style="font-weight: normal;">
        <iconfont icon="block" color="primary" bg round></iconfont>
        <span class="ml-5">快捷操作</span>
      </div>
    </template>
    <div class="items-wrap">
      <router-link to="/dashboardDemo" tag="a" class="hover-item">
        <iconfont icon="linechart" color="success" :size="40" />
        <span>仪表板</span>
      </router-link>
      <router-link to="/datasetDemo" tag="a" class="hover-item">
        <iconfont icon="database" color="#eb2f96" :size="40" />
        <span>分析模型</span>
      </router-link>
      <router-link to="/pivotDemo" tag="a" class="hover-item">
        <iconfont icon="merge-cells" color="#fa541c" :size="40" />
        <span>交叉表</span>
      </router-link>
      <a class="hover-item" @click.stop="toggleSearch">
        <iconfont icon="search" color="#722ed1" :size="40" />
        <span>搜索</span>
      </a>
      <a class="hover-item" @click.stop="toggleSetting">
        <iconfont icon="setting" color="#42cece" :size="40" />
        <span>设置</span>
      </a>
      <router-link to="/schema/screen" tag="a" class="hover-item">
        <iconfont icon="shopping" color="#a0d911" :size="40" />
        <span>新建分析</span>
      </router-link>
      <div class="link-wrap">
        <div class="link-item"
             v-for="link in links"
             :key="link.link"
        >
          <b-dropdown trigger="contextmenu" @command="closeLink" placement="bottom-start">
            <a :href="link.link" :target="link.newTab ? '_blank':'_self'">{{ link.text }}</a>
            <template #dropdown>
              <b-dropdown-menu>
                <b-dropdown-item :name="link.link" style="color: #ed4014;">移除</b-dropdown-item>
              </b-dropdown-menu>
            </template>
          </b-dropdown>
        </div>
        <div class="link-item">
          <b-button type="primary" icon="plus" transparent size="mini" @click="handleAdd">添加</b-button>
        </div>
      </div>
    </div>
  </b-card>
  <b-modal v-model="visible" title="添加一个快捷链接">
    <b-form ref="ruleFormRef" :model="form" label-width="115px" class="mt-16" :rules="ruleValidate">
      <b-form-item prop="link" label="链接地址">
        <b-input v-model="form.link"></b-input>
      </b-form-item>
      <b-form-item prop="text" label="链接名称">
        <b-input v-model="form.text"></b-input>
      </b-form-item>
      <b-form-item prop="text" label="新标签页打开">
        <b-switch v-model="form.newTab">
          <template #open><span>开</span></template>
          <template #close><span>关</span></template>
        </b-switch>
      </b-form-item>
    </b-form>
    <template #footer>
      <b-button @click="visible = false">取 消</b-button>
      <b-button type="primary" @click="submitForm">确 定</b-button>
    </template>
  </b-modal>
</template>

<script>
import { ref, reactive } from 'vue'
import useSetting from '@/hooks/store/useSetting'
import useLinks from '@/hooks/store/useLinks'
import { Message } from 'bin-ui-next'
import Iconfont from '@/components/Common/Iconfont/iconfont.vue'

export default {
  name: 'quick-link',
  components: { Iconfont },
  setup() {
    const visible = ref(false)
    const { toggleSearch, toggleSetting } = useSetting()
    const { links, addLink, closeLink } = useLinks()
    const ruleFormRef = ref(null)
    const form = reactive({
      link: '',
      text: '',
      newTab: true,
    })
    const ruleValidate = ref({
      link: [{ required: true, message: '地址必填', trigger: 'blur' }],
      text: [{ required: true, message: '名称必填', trigger: 'blur' }],
    })

    function handleAdd() {
      visible.value = true
      form.link = ''
      form.text = ''
      form.newTab = true
      ruleFormRef.value && ruleFormRef.value.resetFields()
    }

    function submitForm() {
      ruleFormRef.value.validate((valid) => {
        if (valid) {
          addLink(form).then(() => {
            Message.success('添加成功!')
            visible.value = false
          }).catch(err => {
            visible.value = false
            Message.error(err.message)
          })
        }
      })
    }

    return {
      ruleFormRef,
      toggleSearch,
      toggleSetting,
      visible,
      handleAdd,
      closeLink,
      submitForm,
      ruleValidate,
      form,
      links,
    }
  },
}
</script>

<style scoped lang="stylus">
@import "../../../assets/stylus/base/var.styl"
@import "../../../assets/stylus/base/mixins.styl"
.card-panel {
  margin-bottom: 16px;
}
.items-wrap {
  display: flex;
  flex-wrap: wrap;
}
.hover-item {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 33.33%;
  padding: 10px 10px 16px;
  border: 0;
  border-radius: 0;
  box-shadow: 1px 0 0 0 #f0f0f0, 0 1px 0 0 #f0f0f0, 1px 1px 0 0 #f0f0f0, 1px 0 0 0 #f0f0f0 inset, 0 1px 0 0 #f0f0f0 inset;
  transition: all .3s;
  span {
    color: rgb(81, 90, 110);
  }
  &:hover {
    position: relative;
    z-index: 1;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
    span {
      color: getColor();
    }
  }
}
.link-wrap {
  width: 100%;
  padding-bottom: 16px;
}
.link-item {
  display: inline-block;
  width: 25%;
  margin-top: 16px;
  padding-left: 24px;
  a {
    color: $color-text-default;
    i {
      display: none;
    }
    &:hover {
      color: getHover();
      i {
        display: inline-block;
      }
    }
  }
}
</style>
