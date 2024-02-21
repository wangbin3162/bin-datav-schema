import { reactive, toRefs } from 'vue'
import { MessageBox, Message } from 'bin-ui-design'
import { throwError } from '@/utils/util'
import {
  createFolder,
  getKanbanDir,
  modifyFolder,
  removeFolder,
} from '@/api/modules/analysis-dashboard.api'

const defaultValue = {
  pid: '1',
  name: '缺省目录',
  directory: 'Y',
}

export default function useFolder() {
  const folderData = reactive({
    selectedPid: defaultValue.pid, // 选中的内容
    selectedName: defaultValue.name, // 选中的分组名称
    folderList: [],
    adding: false,
  })

  const toggleProject = ({ id, name }) => {
    folderData.selectedPid = id
    folderData.selectedName = name
  }

  const onAddInputBlur = e => {
    if (!folderData.adding) {
      return
    }

    const name = (e.target.value || '').trim()
    if (!name) {
      folderData.adding = false
    }
  }

  const addGroup = async e => {
    if (!folderData.adding) {
      return
    }
    const name = (e.target.value || '').trim()
    if (name) {
      try {
        await createFolder({ ...defaultValue, name })
        folderData.adding = false
        getFolders()
        Message.success('新增成功！')
      } catch (error) {
        throwError('useModelFolder/addGroup', error)
      }
    } else {
      folderData.adding = false
    }
  }

  // 编辑失焦，如果和之前的名称一样则不进行修改
  const onEditInputBlur = (e, group) => {
    if (!group.editing) {
      return
    }

    const newName = (e.target.value || '').trim()
    if (!newName || group.name === newName) {
      group.editing = false
    }
  }

  // 编辑分组
  const editGroup = async (e, group) => {
    if (!group.editing) {
      return
    }
    const newName = (e.target.value || '').trim()
    if (newName && group.name !== newName) {
      try {
        await modifyFolder({ id: group.id, name: newName })
        group.name = newName
        toggleProject({ id: group.id, name: newName })
        Message.success('修改成功！')
      } catch (error) {
        throwError('useModelFolder/editGroup', error)
      }
      group.editing = false
    } else {
      group.editing = false
    }
  }

  // 提示移除一个分组
  const confirmDeleteGroup = ({ id, name }) => {
    MessageBox.confirm({
      type: 'error',
      title: '提示',
      message: `确定要删除 [ ${name} ] 吗？`,
    })
      .then(async () => {
        try {
          await removeFolder(id)
          toggleProject({ id: defaultValue.pid, name: defaultValue.name })
          getFolders()
          Message.success('删除成功！')
        } catch (error) {
          throwError('useModelFolder/confirmDeleteGroup', error)
        }
      })
      .catch(() => {})
  }

  // 获取模型分组列表
  const getFolders = () => {
    getKanbanDir().then(res => {
      folderData.folderList = (res.children || []).map(v => ({ id: v.id, name: v.text }))
    })
  }

  getFolders()

  return {
    ...toRefs(folderData),
    toggleProject,
    confirmDeleteGroup,
    onAddInputBlur,
    onEditInputBlur,
    editGroup,
    addGroup,
  }
}
