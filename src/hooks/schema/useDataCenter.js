import { toRefs, watch, reactive } from 'vue'
import { useStore } from 'vuex'
import { isPlainObject, isArray } from '@vue/shared'
import { FieldStatus } from '@/config/data-source'

const hasOwnProperty = Object.prototype.hasOwnProperty
const hasOwn = (val, key) => hasOwnProperty.call(val, key)

/**
 * 获取字段映射值
 * @param fields
 * @returns {
 *   x:map||key,
 *   y:map||key
 * }
 */
export const getFieldMap = (fields) => {
  const fieldMap = Object.create(null)
  for (const [key, fc] of Object.entries(fields)) {
    fieldMap[key] = fc.map || key
  }
  return fieldMap
}

// 设置字段的状态
const setFieldStatus = (fields, status) => {
  return Object.keys(fields)
    .reduce((prev, curr) => {
      prev[curr] = status
      return prev
    }, Object.create(null))
}

// 验证数据状态
const checkDataSchema = (data, fields) => {
  let _data = null
  if (isPlainObject(data)) {
    _data = data
  } else if (isArray(data)) {
    _data = data[0]
  }

  return Object.entries(fields)
    .reduce((prev, [key, fc]) => {
      if (_data && hasOwn(_data, fc.map || key)) { // 如果实际数据包含map或者默认key（x/y)则匹配成功
        prev[key] = FieldStatus.success
      } else if (fc.optional) { // 如果配置项是optional可选的，则即设置为可选状态
        prev[key] = FieldStatus.optional
      } else {  // 否则即为错误状态
        prev[key] = FieldStatus.failed
      }
      return prev
    }, Object.create(null))
}

/**
 * 设置data
 * @param comId     组件id
 * @param apiName   apiName（source）
 * @param aConfig   apis配置项
 * @param adConfig  apiData数据配置项
 * @param ApiModule 数据api调用函数
 * @returns {Promise<void>}
 */
export const setDatavData = async (comId, apiName, aConfig, adConfig, ApiModule) => {
  ApiModule.addLoading()
  // 初始化字段状态
  ApiModule.setFieldStatus(comId, { [apiName]: setFieldStatus(aConfig.fields, FieldStatus.loading) })
  // 初始化数据状态
  ApiModule.setDataStatus(comId, { [apiName]: null })

  let isError = false
  let res = []

  try {
    // 获取源数据
    res = await ApiModule.requestData({ comId, aConfig, adConfig })
  } catch (error) {
    isError = true
    res = { isError, message: `${error}` }
    ApiModule.setDataStatus(comId, { api: res.message })
  }
  // 传入组件的数据
  ApiModule.setData(comId, { [apiName]: res })

  setTimeout(() => {
    // 验证字段状态
    ApiModule.setFieldStatus(comId, {
      [apiName]: isError ? setFieldStatus(aConfig.fields, FieldStatus.failed) : checkDataSchema(res, aConfig.fields),
    })
    ApiModule.removeLoading()
  }, 1200)
}

/**
 * 数据中心hook
 * @param com 传入的组件对象
 */
export const useDataCenter = com => {
  const $store = useStore()
  const { apis, apiData } = toRefs(com)
  // console.log(apis.value, apiData.value)

  // 组装apiModule
  const ApiModule = reactive({
    requestData: async ({ comId, aConfig, adConfig }) => {
      return await $store.dispatch('schema/requestData', { comId, aConfig, adConfig })
    },
    setData: async (comId, data) => {
      return await $store.dispatch('schema/setData', { comId, data })
    },
    addLoading: () => {
      return $store.commit('schema/setLoading', true)
    },
    removeLoading: () => {
      return $store.commit('schema/setLoading', false)
    },
    setFieldStatus: (comId, fields) => {
      return $store.dispatch('schema/setFieldStatus', { comId, fields })
    },
    setDataStatus: (comId, data) => {
      return $store.dispatch('schema/setDataStatus', { comId, data })
    },
  })

  // 组件点击事件
  const dvEmit = (eventName, data) => {
    console.log(eventName, data)
  }

  // apis :{ fields, description, ...}
  for (const [name, ac] of Object.entries(apis.value)) {
    // name = source
    // ac = apis 中获取
    const adc = apiData.value[name] // apiData.source

    // 监听数据变更，如apis配置变化了或数据配置项apiData.source.config中修改了，则需要重新设置数据
    watch([ac, () => adc.type, adc.config], () => {
      setDatavData(com.id, name, ac, adc, ApiModule)
    }, { deep: true, immediate: true })
  }
  return {
    dvEmit,
  }
}
