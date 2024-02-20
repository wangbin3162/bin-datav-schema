import { initApiData, ComType, FORM_SELECT as compType } from '@/config/data-source'

export default {
  name: 'VSelect',
  alias: '下拉控件',
  icon: 'select',
  type: ComType.com,
  attr: { w: 300, h: 32 },
  config: {
    options: [],
    default: '',
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.82)',
    borderColor: '#4d4d4e',
    background: '#4d4d4e',
    arrowColor: '#c0c4cc',
    borderRadius: 4,
  },
  apiData: initApiData({ staticPath: 'text/select-options', compType }),
  events: {
    change: {
      name: '选项改变',
      params: [
        { desc: '已选数据值', name: 'value', type: 'STRING' },
        { desc: '已选数据名', name: 'label', type: 'STRING' },
      ],
      enable: false,
    },
    customScript: {
      augments: ['curComp', 'components'],
      enable: false,
    },
  },
}
