/*
暴露类型
1 函数：一个功能
2 对象：可包含多个功能


 */
// export default function () {
//   // 函数
// }

const todos_key = 'todos_key'

export default {
  loadTodos(){
    return JSON.parse(window.localStorage.getItem(todos_key) || '[]')
  },
  saveTodos(todos){
    window.localStorage.setItem(todos_key, JSON.stringify(todos))
  }
}
