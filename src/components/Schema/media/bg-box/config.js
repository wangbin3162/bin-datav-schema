import { ComType } from '@/config/data-source'

export const borderBoxConfig = {
  alias: '边框',
  icon: 'border',
  type: ComType.com,
  attr: { w: 300, h: 180 },
  config: {
    borderRadius: 0,
    fills: [
      {
        fill: '#003a8c',
        opacity: 10,
      },
    ],
    border: {
      show: true,
      type: 'flat',
      flat: {
        width: 1,
        style: 'solid',
        color: '#008bff',
      },
      linearGradient: {
        width: 2,
        color: {
          angle: 135,
          stops: [
            {
              offset: 0,
              color: '#00DEFF',
            },
            {
              offset: 100,
              color: '#008BFF',
            },
          ],
        },
      },
      imageType: 'preset',
      presetImage: 'box38',
      customImage: {
        source: 'https://files.pengxiaotian.com/datav/custom-bg-border.png',
        slice: '32 37 fill',
        width: '32px 37px',
        outset: '0',
        repeat: 'no-repeat',
      },
    },
    filter: {
      blur: '0px',
    },
    backdropFilter: {
      blur: '0px',
    },
    urlConfig: {
      url: '',
      ifBlank: false,
    },
  },
  apis: {},
  apiData: {},
  events: {},
  actions: {},
}

export const borderTypes = [
  { value: 'flat', label: '纯色' },
  { value: 'linearGradient', label: '渐变' },
  { value: 'image', label: '图片' },
]
