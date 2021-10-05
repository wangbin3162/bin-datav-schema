export default {
  state: {
    canvas: {
      width: 1920,
      height: 1080,
      backgroundColor: '#0d2a42',
    },
    canvasData: [], // 画布中的组件，默认插入一个用于调试可动态添加，暂时写死，后期用lowdb缓存
    selectedCom: {}, // 单选选中的可拖拽组件
  },
  mutations: {},
  actions: {},
}
