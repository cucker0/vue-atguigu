/*
*  多个由attion触发直接更新状态的方法对象
* */

import {ADD_TODO, DELETE_TODO, SELECT_ALL_TODO, DEL_ALL_ISDO_TODO, RECIVE_TODOS} from './mutation-types'

export default {
/*  ADD_TODO (state, {todo}) {    // 这里的  ADD_TODO 相当于字符串 'ADD_TODO'  与引入的常量 ADD_TODO对应的值'add_todo' 不相同，所有对应不上
    state.todos.unshift(todo)
  },*/

  [ADD_TODO] (state, {todo}) {    // [ADD_TODO] 以变量的值，即 取常量 ADD_TODO对应的值  'add_todo' 作为函数名
    state.todos.unshift(todo)
  },
  [DELETE_TODO] (state, index) {
    state.todos.splice(index, 1)
  },
  [SELECT_ALL_TODO](state, {ischeck}){
    state.todos.forEach(todo => todo.isdo = ischeck)
  },
  //删除已完成的todo
  [DEL_ALL_ISDO_TODO] (state) {
    state.todos = state.todos.filter(todo => !todo.isdo)
  },
  //接收todos
  [RECIVE_TODOS] (state, {todos, a}) {    //多个值接收方法
    console.log(a)
    state.todos = todos
  }
}
