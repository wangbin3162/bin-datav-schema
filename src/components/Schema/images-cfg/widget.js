import { getCDNPath } from '@/utils/env'

const getImgUrl = (name) => getCDNPath(`/widget/${name}`)

export const widgetImages = [
  {
    id: 'earth1',
    name: '地球',
    src: getImgUrl('earth1.png'),
    css: { 'background-position': 'center', 'background-size': 'contain' },
  },
  {
    id: 'widget1',
    name: '部件1',
    src: getImgUrl('widget1.png'),
    css: { 'background-position': 'center', 'background-size': 'contain' },
  },
  {
    id: 'widget2',
    name: '部件2',
    src: getImgUrl('widget2.png'),
    css: { 'background-position': 'center', 'background-size': 'auto' },
  },
  {
    id: 'widget3',
    name: '部件3',
    src: getImgUrl('widget3.png'),
    css: { 'background-position': 'center', 'background-size': 'auto' },
  },
  {
    id: 'widget4',
    name: '部件4',
    src: getImgUrl('widget4.png'),
    css: { 'background-position': 'center', 'background-size': 'auto' },
  },
  {
    id: 'widget5',
    name: '部件5',
    src: getImgUrl('widget5.png'),
    css: { 'background-position': 'center', 'background-size': 'contain' },
  },
  {
    id: 'widget6',
    name: '部件6',
    src: getImgUrl('widget6.png'),
    css: { 'background-position': 'center', 'background-size': 'contain' },
  },
  {
    id: 'widget7',
    name: '部件7',
    src: getImgUrl('widget7.png'),
    css: { 'background-position': 'center', 'background-size': 'contain' },
  },
  {
    id: 'widget8',
    name: '部件8',
    src: getImgUrl('widget8.png'),
    css: { 'background-position': 'center', 'background-size': 'auto' },
  },
  {
    id: 'widget9',
    name: '部件9',
    src: getImgUrl('widget9.png'),
    css: { 'background-position': 'center', 'background-size': 'auto' },
  },
  {
    id: 'widget10',
    name: '部件10',
    src: getImgUrl('widget10.png'),
    css: { 'background-position': 'center', 'background-size': 'auto' },
  },
  {
    id: 'widget11',
    name: '部件11',
    src: getImgUrl('widget11.png'),
    css: { 'background-position': 'center', 'background-size': 'contain' },
  },
  {
    id: 'widget12',
    name: '部件12',
    src: getImgUrl('widget12.png'),
    css: { 'background-position': 'center', 'background-size': 'contain' },
  },
  {
    id: 'widget13',
    name: '部件13',
    src: getImgUrl('widget13.png'),
    css: { 'background-position': 'center', 'background-size': 'contain' },
  },
  {
    id: 'widget14',
    name: '部件14',
    src: getImgUrl('widget14.png'),
    css: { 'background-position': 'center', 'background-size': 'auto' },
  },
  {
    id: 'widget15',
    name: '部件15',
    src: getImgUrl('widget15.png'),
    css: { 'background-position': 'center', 'background-size': 'auto' },
  },
]
