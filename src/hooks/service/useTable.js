import { onBeforeUnmount, onMounted, ref } from 'vue'
import { addResizeListener, removeResizeListener, throwError } from '@/utils/util'

/**
 * 表格分页等函数hook，可以支持数据参数，page配置等
 * @param fetch 请求函数
 * @param params 请求参数
 * @param isPagination 是否是分页数据，如是分页数据则会有专门的total赋值，否则不分页的话赋值为list.length
 * @param listKey 列表数据返回的key值，默认分页的话为rows，传入null的话直接从data中取得
 */
export default function useTable(fetch, params = {}, isPagination = true, listKey = 'rows') {
  // table 的容器 dom，用于计算宽高值
  const tableWrapRef = ref(null)
  const loading = ref(false) // list loading status
  // list 的 total
  const total = ref(0)
  const list = ref([])
  const wrapSize = {
    width: 0,
    height: 0,
  }

  // fun：获取数据
  async function getListData() {
    if (!fetch) return
    try {
      setLoading(true)
      const data = await fetch(params)
      list.value = listKey ? data[listKey] : data
      total.value = isPagination ? data.total || 0 : data.list.length
    } catch (e) {
      // 响应时触发错误
      throwError('userTable/getListData', e)
    }
    setLoading(false)
  }

  // fun：刷新表格
  async function handleSearch() {
    if (isPagination && params.page) {
      params.page = 1
    }
    await getListData()
  }

  // fun：设置表格loading状态
  function setLoading(status) {
    loading.value = status
  }

  // fun:page-change
  async function pageChange(page) {
    params.page = page
    await getListData()
  }

  // fun:page-size-change
  async function pageSizeChange(size) {
    params.page = 1
    params.size = size
    await getListData()
  }

  function updateWrapSize() {
    const wrap = tableWrapRef.value.value?.getBoundingClientRect()
    wrapSize.width = wrap.width
    wrapSize.height = wrap.height
  }

  onMounted(() => {
    addResizeListener(tableWrapRef.value, updateWrapSize)
  })

  onBeforeUnmount(() => {
    removeResizeListener(tableWrapRef.value, updateWrapSize)
  })

  return {
    tableWrapRef,
    loading,
    total,
    list,
    getListData,
    handleSearch,
    setLoading,
    pageChange,
    pageSizeChange,
  }
}
