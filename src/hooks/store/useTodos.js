import { useStore } from 'vuex'
import { computed } from 'vue'
import { Utils } from 'bin-ui-next'

const { deepCopy } = Utils.util

export default function useTodos() {
  const $store = useStore()

  const todos = computed(() => $store.state.todos.todoList)
  const todoDone = computed(() => todos.value.filter(v => v.done))
  const todoLabel = computed(() => `${todoDone.value.length} / ${todos.value.length}`)
  const leftCount = computed(() => todos.value.length - todoDone.value.length) // 几项未完成

  async function saveTodos(list) {
    await $store.dispatch('todos/setTodos', deepCopy(list))
  }

  return {
    todos,
    todoDone,
    todoLabel,
    leftCount,
    saveTodos,
  }
}
