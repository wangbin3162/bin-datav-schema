import { ComType } from '@/config/data-source'

export default {
  name: 'VMainTitle',
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
  apiData: {},
  events: {},
}
