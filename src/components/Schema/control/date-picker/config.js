import { ComType } from '@/config/data-source'

export default {
  name: 'VDatePicker',
  alias: '日期选择器',
  icon: 'time-circle',
  type: ComType.com,
  attr: {w: 280, h: 32},
  config: {
    prop: {
      type: 'date',
      placeholder: '选择日期',
      defaultValue: null,
      defaultValueByCurrent: false,
    },
    style: {
      fontFamily: 'Microsoft Yahei',
      fontSize: 14,
      color: 'rgba(255, 255, 255, 0.82)',
      borderColor: '#4d4d4e',
      background: '#4d4d4e',
      iconColor: '#c0c4cc',
      borderRadius: 4,
    },
  },
  apiData: {},
  events: {
    default: {
      name: '默认事件',
      eventKey: 'default',
      params: [{desc: '日期', name: 'date', type: 'STRING'}],
      enable: true,
    },
    change: {
      name: '日期变更',
      eventKey: 'date-change',
      params: [{desc: '日期', name: 'date', type: 'STRING'}],
      enable: true,
    },
  },
}
