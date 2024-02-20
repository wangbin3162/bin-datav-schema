<template>
  <div class="example-wrap">
    <b-collapse :model-value="'0'" simple>
      <b-collapse-panel
        v-for="(item, index) in newExamples"
        :key="index"
        :name="index + ''"
        :title="`示例${index + 1}: ${item.name}`"
      >
        <div class="code">
          <highlightjs language="js" :code="item.code" />
        </div>
      </b-collapse-panel>
    </b-collapse>
  </div>
</template>

<script setup>
import { computed } from 'vue'
defineOptions({
  name: 'CustomScriptsExamples',
})

const props = defineProps({
  // 示例代码 {name,code} 的对象数组，name表示示例名称，code表示对应代码
  exampleDesc: {
    type: Array,
    default: () => [],
  },
})

const newExamples = computed(() => [
  ...props.exampleDesc,
  { name: '获取当前用户信息', code: 'console.log(userInfo)' },
  {
    name: '工具包格式化日期',
    code: `// 获取当前日期
console.log(util.dayjs())
// 格式化一个日期
console.log(util.dayjs(new Date(),"YYYY-MM-DD"))`,
  },
  {
    name: '浮点数精度处理',
    code: `// 计算0.1+0.2  默认等于0.30000000000000004
const Big = util.bigjs
const x = new Big(0.1)
const y = x.plus(0.2) // '0.3'`,
  },
  {
    name: 'fetchData 异步请求函数',
    code: `// 举例：实现获取应用信息
const api = util.fetchData
api({
  url: '/form/app/runtime/info',
  method: 'post',
  // data: 有参数时传入对应参数,
})
.then(res => (console.log('调用成功')))
.catch(e => (console.log('调用失败')))

/**
 * 异步请求包装（会返回包装后的请求结果）
 * @param {*} config 请求对象包含method/url/data等
 * @param {*} result 请求成功判断值     // 默认 00
 * @param {*} dataKey 请求结果包装属性  // 默认 data
 * @param {*} msgKey 错误返回属性       //默认 message
 * @return Promise
 */
async function fetchData(config, result, dataKey, msgKey){
}`,
  },
  { name: '打印 ref 代理属性', code: 'util.log(components)' },
])
</script>

<style scoped>
.example-wrap {
  .code {
    padding: 8px;
  }
}
</style>
