import { createField, initApiConfig, initApiData, ComType } from '@/config/data-source'

const fields = [
  createField('title', { description: '标题', optional: true }),
  createField('value', { description: '翻牌器数值' }),
  createField('prefix', { description: '翻牌器前缀', optional: true }),
  createField('suffix', { description: '翻牌器后缀', optional: true }),
]

export const numberTitleFlopConfig = {
  alias: '数字指标',
  icon: 'orderedlist',
  type: ComType.com,
  attr: { w: 300, h: 74 },
  config: {
    global: {
      fontFamily: 'Microsoft Yahei',
      arrangement: 'top',
      distance: 0,
    },
    title: {
      content: '数字指标标题',
      textStyle: {
        fontSize: 18,
        color: '#79daff',
        fontWeight: 'normal',
        textAlign: 'flex-start',
      },
    },
    counter: {
      textStyle: {
        fontFamily: 'Microsoft Yahei',
        fontSize: 36,
        color: '#0a73ff',
        fontWeight: 'bold',
        textAlign: 'left',
      },
      value: 1234567,
      duration: 1000,
      autoplay: true,
      decimals: 2,
      decimal: '.',
      separator: ',',
      prefix: '￥',
      suffix: '',
    },
  },
  apis: initApiConfig({
    fields: Object.assign({}, ...fields),
  }),
  apiData: initApiData({ staticPath: 'text/number-title-flop' }),
  events: {},
  actions: {},
}
