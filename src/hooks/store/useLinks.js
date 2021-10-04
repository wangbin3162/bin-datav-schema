import { useStore } from 'vuex'
import { computed } from 'vue'
import { Utils } from 'bin-ui-next'

const { deepCopy } = Utils.util

export default function useLinks() {
  const $store = useStore()

  const links = computed(() => $store.state.links.links)

  async function addLink(link) {
    const linkList = deepCopy(links.value)
    // 新增成功
    if (linkList.findIndex(v => v.link === link.link) === -1) {
      linkList.push(link)
      await $store.dispatch('links/setLinks', linkList)
      return true
    }
    throw new Error('不能添加相同地址的链接')
  }

  async function closeLink(link) {
    const linkList = deepCopy(links.value)
    const index = linkList.findIndex(v => v.link === link)
    if (index > -1) { // 找到了这个link
      linkList.splice(index, 1)
      await $store.dispatch('links/setLinks', linkList)
      return true
    }
  }

  return {
    links,
    addLink,
    closeLink,
  }
}
