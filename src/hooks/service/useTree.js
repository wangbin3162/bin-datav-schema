import { nextTick, ref } from 'vue'
import { throwError, typeOf } from '@/utils/util'

/**
 * 获取树结构hook
 * @param fetch 填充数据，可选api或者直接传入数组或对象
 * @param params 请求数据的参数
 * @param ctx setup ctx
 * @param titleKey
 */
export default function useTree(fetch, params = {}, ctx, titleKey = 'text') {
  const treeRef = ref(null)
  // 树节点原始数据
  const treeData = ref([])
  const query = ref('')
  // 树渲染loading
  const loading = ref(false)
  const hasChecked = ref(false)

  // fun：获取数据
  const getTreeData = async () => {
    if (!fetch) return
    try {
      setLoading(true)
      const data = await fetch(params)
      if (typeOf(data) === 'object') {
        treeData.value = [data]
      } else {
        treeData.value = data
      }
      ctx && ctx.emit('init-success')
    } catch (e) {
      // 响应时触发错误
      throwError('useTree/getTreeData', e)
    }
    setLoading(false)
  }

  // 重载树结构，可附加选中的节点keys
  const reloadTree = async (keys = [], expandKeys = []) => {
    await getTreeData()
    await nextTick()
    treeRef.value.setSelected(keys)
    treeRef.value.setExpand(expandKeys)
  }

  // 重载树结构，附加checked 回显用
  const reloadTreeWithCheck = async (keys = []) => {
    await getTreeData()
    await nextTick()
    treeRef.value && treeRef.value.setChecked(keys)
  }

  // fun：设置表格loading状态
  function setLoading(status) {
    loading.value = status
  }

  const getFlatState = () => {
    return treeRef.value.getFlatState()
  }

  const handleSelect = (selected, node, flatState) => {
    ctx && ctx.emit('select-change', node, flatState)
  }

  const handleChecked = (checked, node, indeterminate) => {
    hasChecked.value = checked.length > 0
    // 包含半选节点
    ctx && ctx.emit('check-change', checked, node, indeterminate)
  }

  // 过滤树节点
  const handleFilter = (value) => {
    treeRef.value && treeRef.value.filter(value)
  }
  // 过滤函数
  const filterNode = (value, node) => {
    if (!value) return true
    return node[titleKey].indexOf(value) !== -1
  }

  return {
    treeRef,
    query,
    loading,
    treeData,
    hasChecked,
    getFlatState,
    getTreeData,
    reloadTree,
    reloadTreeWithCheck,
    handleFilter,
    filterNode,
    handleSelect,
    handleChecked,
  }
}
