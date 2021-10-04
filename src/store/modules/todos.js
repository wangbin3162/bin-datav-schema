import { getTodoList, setTodoList } from '@/config/datastore'

export default {
  namespaced: true,
  state: {
    todoList: getTodoList()
  },
  mutations: {
    SET_LIST: (state, list) => {
      state.todoList = list
      setTodoList(list)
    }
  },
  actions: {
    setTodos: ({ commit }, list) => {
      commit('SET_LIST', list)
    }
  }
}
