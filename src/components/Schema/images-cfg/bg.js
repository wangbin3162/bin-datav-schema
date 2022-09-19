import { getCDNPath } from '@/utils/env'

const getImgUrl = name => getCDNPath(`/background/${name}`)

export const bgImages = [
  { id: 'bg1', name: '背景1', src: getImgUrl('bg1.jpg') },
  { id: 'bg2', name: '背景2', src: getImgUrl('bg2.jpg') },
  { id: 'bg3', name: '背景3', src: getImgUrl('bg3.png') },
  { id: 'bg4', name: '背景4', src: getImgUrl('bg4.png') },
  { id: 'bg5', name: '背景5', src: getImgUrl('bg5.png') },
  { id: 'bg6', name: '背景6', src: getImgUrl('bg6.png') },
  { id: 'bg6', name: '背景7', src: getImgUrl('bg7.png') },
  { id: 'bg6', name: '背景8', src: getImgUrl('bg8.png') },
  { id: 'bg6', name: '背景9', src: getImgUrl('bg9.png') },
  { id: 'bg6', name: '背景10', src: getImgUrl('bg10.png') },
  { id: 'bg6', name: '背景11', src: getImgUrl('bg11.png') },
  { id: 'bg6', name: '背景12', src: getImgUrl('bg12.png') },
  { id: 'bg6', name: '背景13', src: getImgUrl('bg13.png') },
]
