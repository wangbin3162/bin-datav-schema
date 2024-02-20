import { generateId } from '@/utils/util'

export const ComType = {
  com: 'com',
  subCom: 'subCom',
  layer: 'layer',
}

export const ApiType = {
  static: 'static',
  service: 'api',
  model: 'model',
}

export function createDataSources(compType) {
  let res = {
    [ApiType.static]: '静态数据',
    [ApiType.service]: '服务接口',
    [ApiType.model]: '模型数据',
  }
  // if (needMdelData.includes(compType)) {
  //   res[ApiType.model] = '模型数据' // 静态版本，注释模型配置
  // }
  return res
}

/**
 * 组件类型常量
 */
// -------------------------分析-------------------------//
// 数字指标
export const INDICATOR = 'Indicator'

// 进度环
export const CIRCLE = 'Circle'

// 基础图表类型（柱状图、饼图、折线图）
export const BASE_ECHART = 'BaseEchart'

// 胶囊柱图
export const CAPSULE_BAR_ECHART = 'CapsuleBarEchart'

// 散点图
export const SCATTER_ECHART = 'ScatterEchart'

// 基础散点图
export const SCATTER_ECHART_BASE = 'ScatterEchartBase'

// 雷达图类型
export const RADAR_ECHART = 'RadarEchart'

// 盒须图
export const BOXPLOT_ECHART = 'BoxplotEchart'

// 其他类型
export const OTHER_ECHART = 'OtherEchart'

// 漏斗图
export const TRAPEZIUM_ECHART = 'Trapezium'

// 仪表盘
export const DASHBOARD_ECHART = 'Dashboard'

// -------------------------控件-------------------------//
// 下拉框
export const FORM_SELECT = 'FormSelect'

// -------------------------表格-------------------------//
// 滚动表格类型
export const SCROLL_TABLE = 'ScrollTable'

// 需要模型数据的组件类型数组
const needMdelData = [BASE_ECHART]

/**
 * 初始化源数据
 */
export function initApiData(options) {
  return {
    comId: '',
    id: `api_${generateId()}`,
    config: {
      polling: false, // 是否开启轮询
      pollingInterval: 5000, // 轮询间隔
      data: '', // 存储静态数据
      seriesCount: 0,
      modelId: '',
      modelName: '',
      dimensionModel: '',
      mappingFieldsModel: {},
      tableModelFields: {
        header: [],
      },
      modelFields: {
        dimension: [],
        measure: [],
        fields: [],
      },
      axisFieldsModel: {
        x: [],
        y: [],
      },

      x: [],
      y: [],
      legend: [],
      drill: [],
      filters: [],
      serviceId: '', // 服务id
      serviceName: '', // 服务的名称
      interfaceUrl: '', // 服务接口地址
      reqType: '', //请求类型
      reqParam: [],
      resParam: [],
      dimension: '',
      axisFields: {
        x: [],
        y: [],
      },
      boxFields: {
        x: [],
        y: [],
        nAmE: [],
      },
      tableFields: {
        header: [],
      },
      mappingFields: {},
    },
    type: ApiType.static,
    flushFlag: false,
    ...options,
  }
}
