<template>
  <div class="example-wrap">
    <b-collapse :model-value="'0'" simple>
      <b-collapse-panel
        v-for="(item, index) in newParams"
        :key="index"
        :name="index + ''"
        :title="item.name"
      >
        <div class="tip">{{ item.desc }}</div>
        <div class="code">
          <b-ace-editor
            v-if="item.json"
            theme="tomorrow_night"
            wrap
            readonly
            lang="json"
            :height="height"
            :font-size="13"
            :model-value="item.code"
            :options="{ showLineNumbers: false }"
            :styles="{ border: 'none' }"
          ></b-ace-editor>
          <highlightjs v-else language="js" :code="item.code" />
        </div>
      </b-collapse-panel>

      <b-collapse-panel :name="(newParams.length + 1).toString()" title="util">
        <div class="tip">工具对象，包含了便于处理业务的相关可用对象</div>
        <div class="code" style="padding: 8px">
          <div class="param-item mb-5" v-for="(p, index) in utilDesc" :key="index">
            <div flex="main:justify">
              <div>
                <a
                  v-if="p.link"
                  :href="p.link"
                  target="_blank"
                  title="点击跳转官方文档查看使用方法"
                >
                  <b-tag type="primary">{{ p.name }}</b-tag>
                </a>
                <b-tag v-else type="info">{{ p.name }}</b-tag>
              </div>
              <b-tag>{{ p.type }}</b-tag>
            </div>
            <div class="mt-5">{{ p.desc }}</div>
          </div>
        </div>
      </b-collapse-panel>
    </b-collapse>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { userInfoDesc } from './customScriptsUtil'

defineOptions({
  name: 'CustomScriptsParams',
})

const props = defineProps({
  // 外部脚本和内部示例脚本的高度
  height: {
    type: String,
    default: '182',
  },
  // 参数描述
  paramsDesc: {
    type: Array,
    default: () => [],
  },
})

const utilDesc = [
  {
    name: 'dayjs',
    desc: '日期格式化库。',
    type: 'Object',
    link: 'https://dayjs.fenxianglu.cn/',
  },
  {
    name: 'bigjs',
    desc: '浮点数精度处理的库。',
    type: 'Object',
    link: 'https://mikemcl.github.io/big.js/#big',
  },
  {
    name: 'fetchData',
    desc: '异步请求函数，返回Promise。',
    type: 'Function',
    link: 'https://www.axios-http.cn/docs/req_config',
  },
  {
    name: 'log',
    desc: '日志工具，可解包ref变量或输出普通变量。',
    type: 'Function',
  },
]

const userInfo = userInfoDesc()

const newParams = computed(() => [
  ...props.paramsDesc,
  {
    name: 'userInfo',
    desc: '用户信息对象。',
    code: JSON.stringify(userInfo, null, 2),
    json: true,
  },
])
</script>

<style scoped>
.example-wrap {
  .tip {
    padding: 8px 5px 0;
    color: #8e8c8c;
  }
  .code {
    padding: 8px;
  }
}
</style>
