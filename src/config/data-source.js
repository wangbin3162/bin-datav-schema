import { generateId } from '@/utils/util'

export const ComType = {
  com: 'com',
  subCom: 'subCom',
  layer: 'layer',
}

export const ApiStatus = {
  loading: 'loading',
  success: 'success',
  failed: 'failed',
  completed: 'completed',
  incomplete: 'incomplete',
}

export const FieldStatus = {
  loading: 'loading',
  success: 'success',
  failed: 'failed',
  optional: 'optional',
}


export const ApiType = {
  static: 'static',
  api: 'api',
}

export function createDataSources() {
  return {
    [ApiType.static]: '静态数据',
    [ApiType.api]: 'API',
  }
}

/**
 * 创建字段
 */
export function createField(name, config) {
  return {
    [name]: {
      type: 'string',
      map: '',
      description: '',
      optional: false,
      ...(config ?? {}),
    },
  }
}

/**
 * 初始化数据接口配置
 */
export function initApiConfig(options) {
  return {
    source: {
      fields: {},
      render: 'render',
      description: '',
      useAutoUpdate: false,
      autoUpdate: 1,
      ...options,
    },
  }
}

/**
 * 初始化源数据
 */
export function initApiData(options) {
  return {
    source: {
      comId: '',
      id: `api_${generateId()}`,
      config: {
        data: '',
      },
      type: ApiType.static,
      ...options,
    },
  }
}
