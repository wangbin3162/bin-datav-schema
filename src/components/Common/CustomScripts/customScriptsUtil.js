import dayjs from 'dayjs'
import bigjs from 'big.js'
import { fetchData } from '@/api/request'
import { unref, toRaw } from 'vue'
import { useUserStoreWithOut } from '@/store/modules/user'
const userStore = useUserStoreWithOut()

// 用于util内的工具函数，可用于直观的查看vue包装的对象。
function log(...params) {
  const p = params.map(item => toRaw(unref(item)))
  console.log(...p)
}

// 自定义函的入参util对象
export const util = {
  dayjs,
  bigjs,
  fetchData,
  log,
}

// 生成描述、示例信息
export function useParamsDesc(components, curComp) {
  const comps = {}

  components.forEach(item => {
    comps[item.id] = item
  })

  const paramsDesc = []

  if (curComp) {
    paramsDesc.push({
      name: 'curComp',
      desc: '当前组件配置信息。',
      code: JSON.stringify(curComp, null, 2),
      json: true,
    })
  }

  paramsDesc.push({
    name: 'components',
    desc: '所有组件信息。',
    code: JSON.stringify(comps, null, 2),
    json: true,
  })

  // 校验的示例代码编写
  const exampleDesc = [{ name: '获取所有组件信息', code: 'console.log(components)' }]

  return {
    paramsDesc,
    exampleDesc,
  }
}

// 构建userInfo
function buildUserInfo() {
  return userStore?.userInfo || {}
}

// 生成userInfo的描述信息
export function userInfoDesc() {
  return buildUserInfo()
}


// 生成运行时可调用的函数，附加通用参数。
export function buildFun(funcBody, ...augments) {
  const paramsStr = new Set([...augments, 'userInfo', 'util'])
  const AsyncFunction = async function () {}.constructor
  const fun = new AsyncFunction(...paramsStr, funcBody)

  const userInfo = buildUserInfo()
  return async (...params) => {
    return await fun(...params, userInfo, util)
  }
}
