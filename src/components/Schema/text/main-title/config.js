import { createField, initApiConfig, initApiData, ComType } from '@/config/data-source'

const fields = [
  createField('title', { description: '标题值', optional: true }),
  createField('url', { description: '超链接url', optional: true }),
]

export const mainTitleConfig = {
  alias: '通用标题',
  icon: 'file-word',
  type: ComType.com,
  attr: { w: 300, h: 48 },
  config: {
    title: '我是标题数据',
    textStyle: {
      fontFamily: 'Microsoft Yahei',
      fontSize: 24,
      color: '#fff',
      fontWeight: 'normal',
    },
    textAlign: 'center',
    writingMode: 'horizontal-tb',
    backgroundStyle: {
      show: false,
      bgColor: '#008bff',
      borderRadius: 15,
      borderColor: '#fff',
      borderStyle: 'solid',
      borderWidth: 1,
    },
    ellipsis: false,
    urlConfig: {
      url: '',
      isBlank: false,
    },
  },
  apis: initApiConfig({
    fields: Object.assign({}, ...fields),
  }),
  apiData: initApiData({ staticPath: 'text/main-title' }),
  events: {},
  actions: {},
}
