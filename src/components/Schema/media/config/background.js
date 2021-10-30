import { getCDNPath } from '@/utils/env'

const getImgUrl = (name) => getCDNPath(`/background/${name}`)

export const backgroundImages = [
  { id: 'background0', name: '背景0', src: getImgUrl('background0.png') },
  { id: 'background1', name: '背景1', src: getImgUrl('background1.jpg') },
  { id: 'background2', name: '背景2', src: getImgUrl('background2.jpg') },
  { id: 'background3', name: '背景3', src: getImgUrl('background3.png') },
  { id: 'background4', name: '背景4', src: getImgUrl('background4.png') },
  { id: 'background5', name: '背景5', src: getImgUrl('background5.jpg') },
]
