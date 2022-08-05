import { computed, reactive, toRefs, unref } from 'vue'
import { useStore } from '@/store'
import { AGGREGATOR_FUN, SORT_FUN } from '@/hooks/schema/useModelEnum'
import { addClass, deepCopy, removeClass, throwError } from '@/utils/util'
import { getCubeById } from '@/api/modules/analysis-dashboard.api'
import { Message } from 'bin-ui-next'

export default function useDsApi(props, emit) {
  const status = reactive({
    loading: false,
    dimensionTree: {}, // 维度树
    measureTree: {}, // 度量树
    xColumns: [], // x轴、行轴
    yColumns: [], // y轴、列轴
    drill: [],
    filters: [],
    dragging: false,
  })
  const { schemaStore, storeToRefs } = useStore()
  const { selectedCom } = storeToRefs(schemaStore)
  const apiDataConfig = computed(() => selectedCom.value.apiData)
  const modelId = computed(() => apiDataConfig.value.config.modelId)
  const showDrill = computed(() => status.xColumns.findIndex(v => v.drillEnabled === 'Y') > -1)

  // 更新字段数据
  const updateFieldState = cubeSchema => {
    const { dimension, measure } = cubeSchema || {}
    // 维度、度量树
    status.dimensionTree = dimension || { title: '维度', nodeType: 'root', children: [] }
    status.measureTree = measure || { title: '度量', nodeType: 'root', children: [] }
    // 回显存储数据
    if (modelId.value !== props.selectedModelId) return
    status.xColumns = deepCopy(apiDataConfig.value.config.x)
    status.yColumns = deepCopy(apiDataConfig.value.config.y)
    status.drill = deepCopy(apiDataConfig.value.config.drill)
  }
  // 初始化数据表
  const initData = async () => {
    status.loading = true
    try {
      const cubeSchema = await getCubeById(props.selectedModelId)
      updateFieldState(cubeSchema)
    } catch (e) {
      throwError('useDsApi/initData', e)
    }
    status.loading = false
  }

  initData()

  const allowDrop = () => false

  const allowDrag = draggingNode => draggingNode.nodeType === 'attribute'

  const onDragEnter = e => addClass(e.target, 'drag-enter')

  const onDragLeave = e => removeClass(e.target, 'drag-enter')

  // 拖拽节点缓存
  let dragNodeType = ''
  let dragNode = null

  // 类别轴开始拖拽
  function handleDimensionDragStart(node) {
    status.dragging = true
    dragNodeType = 'D'
    dragNode = node
  }

  // 值轴开始拖拽
  function handleMeasureDragStart(node) {
    status.dragging = true
    dragNodeType = 'M'
    dragNode = node
  }

  // 组装轴字段数据
  function buildAttr() {
    return {
      tableId: dragNode.tableId,
      tableName: dragNode.tableName,
      field: dragNode.field,
      fieldId: dragNode.fieldId,
      title: dragNode.title,
      type: dragNode.type,
      dataType: dragNode.dataType,
      sortWay: '',
      drillEnabled: 'N',
    }
  }

  // 设置字段下钻
  function setDrill(index) {
    const length = status.xColumns.length
    for (let i = 0; i < length; i++) {
      status.xColumns[i].drillEnabled = i === index ? 'Y' : 'N'
    }
    const drillObj = status.xColumns[index]
    // 追加定义下钻数值
    status.drill = [
      {
        tableId: drillObj.tableId,
        tableName: drillObj.tableName,
        field: drillObj.field,
        fieldId: drillObj.fieldId,
        title: drillObj.title,
        type: drillObj.type,
        dataType: drillObj.dataType,
      },
    ]
  }

  // 移除一个下钻内容
  function removeDrill(index) {
    if (index === 0) {
      // 如果是第0个下钻内容，则需要清空下钻列，并同步修改所有x轴内容为下钻N
      status.drill = []
      for (let i = 0; i < status.xColumns.length; i++) {
        status.xColumns[i].drillEnabled = 'N'
      }
    } else {
      status.drill.splice(index, 1)
    }
  }

  // x轴类别轴放置
  function onDimensionDrop(e) {
    e.preventDefault()
    removeClass(e.target, 'drag-enter')
    if (dragNodeType === 'D') {
      if (status.xColumns.find(v => v.fieldId === dragNode.fieldId)) {
        Message.warning('已存在同名字段！无需重复配置。')
      } else {
        status.xColumns.push({
          ...buildAttr(),
        })
      }
    }
    dragNode = null
  }

  // y轴值轴放置
  function onMeasureDrop(e) {
    e.preventDefault()
    removeClass(e.target, 'drag-enter')
    if (dragNodeType === 'M') {
      // status.yColumns = []
      if (status.yColumns.find(v => v.fieldId === dragNode.fieldId)) {
        Message.warning('已存在同名字段！无需重复配置。')
      } else {
        status.yColumns.push({
          ...buildAttr(),
          aggregator: 'SUM',
        })
      }
    }
    dragNode = null
  }

  // drill下钻字段放置
  function onDrillDrop(e) {
    e.preventDefault()
    removeClass(e.target, 'drag-enter')
    if (dragNodeType === 'D') {
      if (status.drill.find(v => v.fieldId === dragNode.fieldId)) {
        Message.warning('已存在同名字段！无需重复配置。')
      } else {
        status.drill.push({
          tableId: dragNode.tableId,
          tableName: dragNode.tableName,
          field: dragNode.field,
          fieldId: dragNode.fieldId,
          title: dragNode.title,
          type: dragNode.type,
          dataType: dragNode.dataType,
        })
      }
    }
    dragNode = null
  }

  // x轴排序设置
  function sortChange({ index, key }) {
    status.xColumns[index].sortWay = key
  }

  // 聚合函数设置
  function aggrChange({ index, key }) {
    status.yColumns[index].aggregator = key
  }

  // 设置存储apiData
  function setApiDataConfig() {
    apiDataConfig.value.config.modelId = props.selectedModelId
    apiDataConfig.value.config.modelName = props.selectedModelName
    apiDataConfig.value.config.x = deepCopy(unref(status.xColumns))
    apiDataConfig.value.config.y = deepCopy(unref(status.yColumns))
    apiDataConfig.value.config.drill = deepCopy(unref(status.drill))
    emit('save')
  }

  return {
    ...toRefs(status),
    SORT_FUN,
    AGGREGATOR_FUN,
    showDrill,
    onDragEnter,
    onDragLeave,
    allowDrop,
    allowDrag,
    handleDimensionDragStart,
    handleMeasureDragStart,
    onDimensionDrop,
    onMeasureDrop,
    onDrillDrop,
    sortChange,
    aggrChange,
    setDrill,
    removeDrill,
    setApiDataConfig,
  }
}
