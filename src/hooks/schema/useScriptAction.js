import { buildFun } from '@/components/Common/CustomScripts/customScriptsUtil'
import { useStore } from '@/store'

/**
 * 自定义脚本（函数）
 * @param {*} selectedCom
 * @param {*} scriptStr
 * @param {*} components
 */
async function customFun(selectedCom, scriptStr, components) {
  const customScript = selectedCom.events.customScript
  const comps = {}
  components.forEach(item => {
    comps[item.id] = item
  })
  const fun = buildFun(scriptStr, ...customScript.augments)
  await fun(selectedCom, comps)
}

/**
 * 脚本执行动作的相关运行时逻辑
 * @param {*} selectedCom
 * @param {*} onEvent
 */
async function useScriptAction(selectedCom, onEvent) {
  const { schemaStore, storeToRefs } = useStore()
  const { comps } = storeToRefs(schemaStore)
  const { enable, scriptStr } = onEvent.customScript
  // 如果启用了动作
  if (enable) {
    await customFun(selectedCom, scriptStr, comps.value)
  }
}

export { useScriptAction }
