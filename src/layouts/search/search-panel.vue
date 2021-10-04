<template>
  <Teleport to="body">
    <transition name="zoom-in" mode="out-in" @after-leave="showScroll">
      <div class="search-modal" @click.stop v-if="searchVisible">
        <div class="search-modal-content" v-click-outside="handleClose">
          <div class="search-modal-input__wrapper">
            <b-input ref="inputRef" size="large" v-model="query" placeholder="搜索" class="input-item">
              <template #prefix>
                <b-icon name="search" size="22"></b-icon>
              </template>
            </b-input>
          </div>
          <ul class="search-modal-list" v-no-data:[dataText]="filterList.length===0">
            <li
              v-for="item in filterList"
              :key="item.name"
              class="list-item"
            >
              <a @click="handleClick(item.name)">
                <i class="b-iconfont b-icon-group"></i>
                <span>{{ item.display }}</span>
                <i class="b-iconfont b-icon-enter"></i>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </transition>
  </Teleport>
</template>

<script>
import { nextTick, ref, watch } from 'vue'
import useMenu from '@/hooks/store/useMenu'
import useSetting from '@/hooks/store/useSetting'

export default {
  name: 'search-panel',
  setup() {
    const inputRef = ref(null)
    const dataText = ref('暂无搜索结果')
    const query = ref('')
    const filterList = ref([])

    const { searchVisible, toggleSearch } = useSetting()
    const { navMenuItems, getBreadcrumbData, handleMenuSelect } = useMenu()

    watch(searchVisible, (val) => {
      if (val) {
        open()
      }
    })

    watch(query, (val) => {
      const list = []
      const matchList = navMenuItems.value.filter(menu => {
        return menu.title.includes(val) || menu.name.toUpperCase().includes(val.toUpperCase())
      })
      matchList.forEach((matchItem) => {
        const data = getBreadcrumbData(matchItem.name)
        list.push({
          name: matchItem.name,
          display: data.map(v => v.title).join(' > '),
        })
      })
      filterList.value = list
    }, { immediate: true })

    function open() {
      nextTick(() => {
        hideScroll()
        inputRef.value && inputRef.value.focus()
      })
    }

    function handleClick(name) {
      handleMenuSelect(name)
      handleClose()
    }

    function handleClose() {
      toggleSearch()
    }

    function hideScroll() {
      document.body.classList.add('bin-popup-parent--hidden')
      document.body.style.paddingRight = '6px'
    }

    function showScroll() {
      query.value = ''
      document.body.classList.remove('bin-popup-parent--hidden')
      document.body.style = null
    }

    return {
      searchVisible,
      inputRef,
      query,
      filterList,
      dataText,
      open,
      handleClose,
      showScroll,
      handleClick,
    }
  },
}
</script>

<style scoped lang="stylus">
@import "../../assets/stylus/base/mixins.styl"
.search-modal {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 800;
  display: flex;
  width: 100%;
  height: 100%;
  padding-top: 50px;
  background-color: rgba(0, 0, 0, .25);
  justify-content: center;
  &-content {
    position: relative;
    width: 632px;
    margin: 0 auto auto auto;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: inset 1px 1px 0 0 hsla(0, 0%, 100%, 0.5), 0 3px 8px 0 #555a64;
    flex-direction: column;
  }
  &-input__wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px 16px 0;
    :deep(.bin-input-large) {
      height: 48px;
      border-radius: 6px;
      padding-left: 40px;
    }
    :deep(.bin-input-prefix) {
      left: 6px;
    }
  }
  &-list {
    max-height: 472px;
    padding: 8px 16px;
    padding-bottom: 20px;
    margin: 0 auto;
    margin-top: 14px;
    overflow: auto;
    .list-item {
      border-radius: 4px;
      display: flex;
      padding-bottom: 4px;
      position: relative;
      a {
        display: flex;
        align-items: center;
        width: 100%;
        height: 56px;
        box-shadow: 0 1px 3px 0 #d4d9e1;
        border-radius: 4px;
        color: rgba(0, 0, 0, .85);
        padding: 0 6px;
        > span {
          flex: 1;
        }
        i {
          font-size: 20px;
          margin: 0 8px;
        }
        &:hover {
          background: getColor()
          color: #fff;
        }
      }
    }
  }
}
</style>
