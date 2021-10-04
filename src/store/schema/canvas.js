export default {
  state: {
    canvasData: [], // 画布中的组件，默认插入一个用于调试可动态添加，暂时写死，后期用lowdb缓存
    curComponent: null, // 单选选中的可拖拽组件
    curComponentIndex: 0, // 单选选中的可拖拽组件索引
  },
  mutations: {},
  actions: {},
}
