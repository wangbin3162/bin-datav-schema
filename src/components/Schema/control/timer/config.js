import { ComType } from '@/config/data-source'

export default {
  name: 'VTimer',
  alias: '时间器',
  icon: 'time-circle',
  type: ComType.com,
  attr: { w: 300, h: 56 },
  config: {
    iconStyle: {
      show: true,
      size: 1.2,
      color: 'rgba(93,245,244,1)',
      marginRight: 6,
    },
    time: {
      textStyle: {
        fontFamily: 'Microsoft Yahei',
        fontSize: 18,
        color: '#fff',
        fontWeight: 'normal',
      },
      format: 'YYYY-MM-DD HH:mm:ss',
      duration: 1000,
      horizontal: 'center',
      vertical: 'center',
    },
  },
  apiData: {},
  events: {},
}
