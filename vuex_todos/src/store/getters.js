/*
*  所有基于state的多个计算属性get()方法的对象
* */

export default {
  //总个数
  totalCount (state) {
    return state.todos.length
  },

  //完成的个数
  completeCount (state) {
    return state.todos.reduce((preTotal, todo) => preTotal + (todo.isdo ? 1: 0), 0)
  },
  //判断是否全选中
  isCheckAll (state, getters) {
    return getters.completeCount === getters.totalCount && state.todos.length > 0
  }


}
