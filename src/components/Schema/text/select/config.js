import { initApiData, ComType } from '@/config/data-source'

export const selectConfig = {
  name: 'VSelect',
  alias: '下拉控件',
  icon: 'select',
  type: ComType.com,
  attr: { w: 300, h: 32 },
  config: {
    options: [],
    default: '',
    background: '#262c33',
    fontSize: 12,
    color: '#fff',
    borderColor: '#0b0c0d',
    arrowColor: '#c0c4cc',
    borderRadius: 0,
  },
  apiData: initApiData({ staticPath: 'text/select-options' }),
  events: {},
}

export default selectConfig
