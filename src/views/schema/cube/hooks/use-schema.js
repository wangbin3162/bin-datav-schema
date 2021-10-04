import { reactive, ref, toRefs, h } from 'vue'
import { getSchema } from '@/api/modules/bi-cube.api'
import { deepCopy, throwError, compileFlatState } from '@/utils/util'
import fieldTypeIcon from '@/components/Service/LinkNode/field-type-icon.vue'
import settingDropdown from '../components/setting-dropdown.vue'

export default function useSchema(dataset) {
  const nodeEditRef = ref(null)
  const linkEditRef = ref(null)
  // ****************** [左侧表结构] ****************** //
  const tableList = ref([])
  // ****************** [拖拽节点数据] ****************** //
  const status = reactive({
    stateTree: {}, // 表节点树
    flatState: [], // 拉平的树结构
    dragging: false,
    loading: false,
    dimensionTree: {}, // 维度树
    dimensionTreeFlats: [], // 维度树拉平
    dimensionFields: [],
    measureTree: {}, // 度量树
    measureTreeFlats: [], // 度量树拉平
    measureFields: [],
  })
  // ****************** [编辑节点内容缓存] ****************** //
  const currentNodeKey = ref(-1)
  const currentParentNodeKey = ref(-1)
  // ****************** [编辑字段内容] ****************** //
  const fieldStatus = reactive({
    fieldModal: false,
    filedNode: {},
  })

  // 节点点击事件
  function handleNodeClick(nodeKey) {
    const node = status.flatState[nodeKey].node
    currentNodeKey.value = nodeKey
    nodeEditRef.value && nodeEditRef.value.open(dataset, node)
  }

  // 保存一个nodeKey的节点fields选中项
  function saveCheckedFields(nodeKey, selections) {
    const node = status.flatState[nodeKey].node
    // 设置字段选中状态
    node.fields.forEach(item => {
      item._checked = selections.includes(item.field)
    })
    fieldUpdateByTable()
  }

  // 保存已勾选的字段
  function saveSelectedFields(selectedFields) {
    saveCheckedFields(currentNodeKey.value, selectedFields)
  }

  // 保存join keys
  function saveJoinKeys(parentSelectedFields, selectedFields, tableInfo) {
    const { joinType, joinKeys } = tableInfo
    // 保存两个节点勾选项
    saveCheckedFields(currentParentNodeKey.value, parentSelectedFields)
    saveCheckedFields(currentNodeKey.value, selectedFields)
    const node = status.flatState[currentNodeKey.value].node
    node.joinType = joinType
    node.joinKeys = deepCopy(joinKeys)
  }

  // 连接桩点击事件
  function handleLinkClick(nodeKey, parentNodeKey) {
    const node = status.flatState[nodeKey].node
    const parentNode = status.flatState[parentNodeKey].node

    currentNodeKey.value = nodeKey
    currentParentNodeKey.value = parentNodeKey

    linkEditRef.value && linkEditRef.value.open(dataset, node, parentNode)
  }

  // 节点移除事件
  function handleNodeRemove(nodeKey, parentNodeKey) {
    const node = status.flatState[nodeKey].node
    // 执行移除节点操作
    if (node.nodeKey === 0) { // 根节点删除
      status.stateTree = {}
      updateStateTree()
      return
    }
    const parentNode = status.flatState[parentNodeKey].node
    const index = parentNode.children.indexOf(node)
    parentNode.children.splice(index, 1)
    updateStateTree()
    fieldUpdateByTable()
  }

  // 拖拽增加子节点
  function handleNodeDrop(parentNodeKey, tableId) {
    const parentNode = status.flatState[parentNodeKey].node
    const { fields: parentFields } = parentNode
    const table = tableList.value.find(v => v.id === tableId)
    const { id, title, tableName, fields } = table
    if (!table) return
    // 执行新增节点操作
    const children = parentNode.children || []
    const joinKeys = []
    // 拼接默认连接join
    if (parentFields.length && fields.length) {
      joinKeys.push({
        sourceKey: parentFields[0].field,
        targetKey: fields[0].field,
      })
    }
    children.push({
      id,
      title,
      tableName,
      fields: fields.map(i => ({ ...i, _checked: true })),
      joinType: 'LEFT_OUTER_JOIN',
      joinKeys,
    })
    parentNode.children = children
    updateStateTree()
    fieldUpdateByTable()
  }

  // 增加根节点
  function handleEmptyDrop(tableId) {
    const table = tableList.value.find(v => v.id === tableId)
    const { id, title, tableName, fields } = table
    if (!table) return
    status.stateTree = {
      id,
      title,
      tableName,
      fields: fields.map(i => ({ ...i, _checked: true })),
    }
    updateStateTree()
    fieldUpdateByTable()
  }

  // 维度度量树
  function renderContent({ root, node, data }) {
    const inline = [
      h('span',
        {
          class: `${data.type} t-ellipsis`,
          style: { width: 'calc(100% - 24px)' },
          flex: 'cross:center',
          title: `${data.title}-(${data.field})`,
        },
        [
          ...[data.nodeType !== 'root' ? h(fieldTypeIcon, {
            type: data.dataType,
            style: { marginRight: '4px' },
          }) : null],
          data.title,
        ],
      ),
    ]
    if (data.nodeType !== 'root') {
      inline.push(h(settingDropdown, { data, onCommand: handleDmCommand }))
    }
    return h('span', { style: { width: '100%', fontSize: '12px' }, flex: 'main:justify' }, inline)
  }

  // 维度度量，字段操作函数
  function handleDmCommand({ name, node }) {
    if (name === 'edit') {
      fieldStatus.fieldModal = true
      fieldStatus.filedNode = {
        field: node.field,
        title: node.title,
        nodeKey: node.nodeKey,
        type: node.type,
      }
    } else if (name === 'convert') {
      convertField(node)
    } else if (name === 'delete') {
      removeField(node)
    }
  }

  // 保存字段
  function saveField() {
    const { title, type, nodeKey } = fieldStatus.filedNode
    const realNode = type === 'D' ? status.dimensionTreeFlats[nodeKey].node : status.measureTreeFlats[nodeKey].node
    realNode.title = title
    fieldStatus.fieldModal = false
  }

  // 字段转换函数
  function convertField(node) {
    // 维度转换度量
    if (node.type === 'D') {
      // 维度树节点移除当前children
      const parentKey = status.dimensionTreeFlats[node.nodeKey].parent
      const parent = status.dimensionTreeFlats[parentKey].node
      if (parent !== undefined) {
        const index = parent.children.indexOf(node)
        parent.children.splice(index, 1)
      }
      // 度量树新增一个child
      const children = status.measureTree.children || []
      children.push({
        fieldId: node.fieldId,
        tableId: node.tableId,
        field: node.field,
        title: node.title,
        dataType: node.dataType,
        nodeType: 'attribute',
        type: 'M',
      })
      status.measureTree.children = children

      status.measureTree = deepCopy(status.measureTree)
    } else { // 度量转换维度
      // 度量树节点移除当前children
      const parentKey = status.measureTreeFlats[node.nodeKey].parent
      const parent = status.measureTreeFlats[parentKey].node
      if (parent !== undefined) {
        const index = parent.children.indexOf(node)
        parent.children.splice(index, 1)
      }
      // 维度树新增一个child
      const children = status.dimensionTree.children || []
      children.push({
        fieldId: node.fieldId,
        tableId: node.tableId,
        field: node.field,
        title: node.title,
        dataType: node.dataType,
        nodeType: 'attribute',
        type: 'D',
      })
      status.dimensionTree.children = children
      status.dimensionTree = deepCopy(status.dimensionTree)
    }
    updateFieldState({
      dimension: status.dimensionTree,
      measure: status.measureTree,
    })
  }

  // 移除一个字段项
  function removeField(node) {
    const { tableId, fieldId } = node
    // 查找上方表
    const tableNode = status.flatState.find(v => v.node.id === tableId)
    const tableKey = tableNode.nodeKey
    const fields = tableNode.node.fields.filter(i => i._checked && i.fieldId !== fieldId).map(v => v.field)

    saveCheckedFields(tableKey, fields)
  }

  // 更新树数据
  const updateStateTree = () => {
    status.flatState = compileFlatState(status.stateTree)
  }

  // 根据上方表节点更新字段
  const fieldUpdateByTable = () => {
    // 保存勾选字段后需要重新刷新字段维度度量状态
    const tableList = status.flatState.map(i => i.node)
    const dimension = []
    const measure = []
    tableList.forEach(tableNode => {
      tableNode.fields.forEach(f => {
        const data = {
          fieldId: f.fieldId,
          field: f.field,
          title: f.title,
          dataType: f.dataType,
          type: f.type,
          nodeType: 'attribute',
          tableId: tableNode.id,
        }
        if (f._checked) {
          if (f.type === 'D') {
            dimension.push(data)
          } else {
            measure.push(data)
          }
        }
      })
    })
    const field = {
      dimension: {
        title: '维度',
        nodeType: 'root',
        children: dimension,
      },
      measure: {
        title: '度量',
        nodeType: 'root',
        children: measure,
      },
    }
    updateFieldState(field)
  }

  // 更新字段数据
  const updateFieldState = (cubeSchema) => {
    const { dimension, measure } = cubeSchema || {}
    // 维度、度量树
    status.dimensionTree = dimension || { title: '维度', nodeType: 'root', children: [] }
    status.measureTree = measure || { title: '度量', nodeType: 'root', children: [] }
    status.dimensionTreeFlats = compileFlatState(status.dimensionTree)
    status.measureTreeFlats = compileFlatState(status.measureTree)
    status.dimensionFields = status.dimensionTreeFlats.filter(v => v.node.nodeType === 'attribute')
    status.measureFields = status.measureTreeFlats.filter(v => v.node.nodeType === 'attribute')
  }

  function allowDrop(draggingNode, dropNode, type) {
    if (dropNode.nodeType === 'attribute') {
      return type !== 'inner'
    } else {
      return dropNode.nodeType !== 'root'
    }
  }

  function allowDrag(draggingNode) {
    // 限制拖拽节点
    return draggingNode.nodeType === 'attribute'
  }

  function handleDrop(draggingNode, dropNode, dropType, ev) {
    updateFieldState({
      dimension: status.dimensionTree,
      measure: status.measureTree,
    })
  }

  // 初始化数据表
  const initData = async () => {
    status.loading = true
    try {
      const { physicalSchema, cubeSchema } = await getSchema(dataset)
      // 表节点树
      status.stateTree = physicalSchema
      updateStateTree()
      updateFieldState(cubeSchema)
    } catch (e) {
      throwError('cube-table-list/initTable', e)
    }
    status.loading = false
  }

  initData()

  return {
    nodeEditRef,
    linkEditRef,
    tableList,
    ...toRefs(status),
    ...toRefs(fieldStatus),
    currentNodeKey,
    currentParentNodeKey,
    allowDrop,
    allowDrag,
    handleDrop,
    handleNodeClick,
    handleNodeRemove,
    handleNodeDrop,
    handleLinkClick,
    handleEmptyDrop,
    saveSelectedFields,
    saveJoinKeys,
    renderContent,
    handleDmCommand,
    saveField,
  }
}
