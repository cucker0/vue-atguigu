/*
* 包含多个组件通知触发action间接更新状态的方法对象
* */

import {ADD_TODO, DELETE_TODO, SELECT_ALL_TODO, DEL_ALL_ISDO_TODO, RECIVE_TODOS} from './mutation-types'
import storageUtil from '../utils/storageUtil'

export default {
  //添加todo
  addTodo ({commit} ,todo) {
    //触发mutation
    commit (ADD_TODO, {todo})
  },

  //删除选中的todo
  delToto ({commit}, index) {
    commit (DELETE_TODO, index)
  },

  // 选择/取消所有的todo
  selectAllItem ({commit}, ischeck) {
    commit(SELECT_ALL_TODO, {ischeck})
  },

  //删除所有完成的todo
  delAllIsdoItem ({commit}) {
    commit(DEL_ALL_ISDO_TODO)
  },

  //从localStorage(浏览器缓存)加载todos
  reqTodos ({commit}) {

    const todos = storageUtil.loadTodos()
    setTimeout(()=>{
      const a = 'aaaa'
      commit(RECIVE_TODOS, {todos, a} )   //多个值传参方法
    }, 1000)
  },
}
