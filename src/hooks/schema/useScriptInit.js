import { buildFun } from '@/components/Common/CustomScripts/customScriptsUtil'
import { useStore } from '@/store'

/**
 * 初始化脚本（函数）
 * @param {*} pageConfig
 * @param {*} components
 */
async function customFun(pageConfig, components) {
  const initScript = pageConfig.initScript
  const comps = {}
  components.forEach(item => {
    comps[item.id] = item
  })
  const augments = ['components']
  const fun = buildFun(initScript.scriptStr, ...augments)
  await fun(comps)
}

/**
 * 脚本执行动作的相关运行时逻辑
 */
async function useScriptInit() {
  const { schemaStore, storeToRefs } = useStore()
  const { pageConfig, comps } = storeToRefs(schemaStore)
  console.log(pageConfig.value)
  // 如果启用了动作
  const { initScript } = pageConfig.value
  console.log(initScript);
  if (initScript.enable) {
    await customFun(pageConfig.value, comps.value)
  }
}

export { useScriptInit }
