import { generateId } from '@/utils/util'

export const ComType = {
  com: 'com',
  subCom: 'subCom',
  layer: 'layer',
}

export const ApiType = {
  static: 'static',
  model: 'model',
}

export function createDataSources() {
  return {
    [ApiType.static]: '静态数据',
    [ApiType.model]: '模型数据',
  }
}

/**
 * 初始化源数据
 */
export function initApiData(options) {
  return {
    comId: '',
    id: `api_${generateId()}`,
    config: {
      data: '', // 存储静态数据
      seriesCount: 0,
      modelId: '',
      modelName: '',
      x: [],
      y: [],
      drill: [],
      filters: [],
    },
    type: ApiType.static,
    ...options,
  }
}
