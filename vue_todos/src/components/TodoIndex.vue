<template>
	<div class="todo-container">
    <div class="todo-wrap">
      <!--绑定数据 通过prop传，可多层传-->
      <!--<TodoHeader :todos="todos" :addTodo="addTodo"/>-->

      <!--绑定事件监听方法，只用户父子组件一层的-->
      <!--<TodoHeader :todos="todos" @addTodo="addTodo"/>-->

      <!-- 使用vm.on方法 -->
      <TodoHeader ref="tdheader"/>

      <TodoContent :todos="todos" :delToto="delToto"/>
      <!--<todo-footer :todos="todos" :delAllIsdoItem="delAllIsdoItem" :selectAllItem="selectAllItem"/>-->
      <todo-footer :todos="todos">
        <input type="checkbox" v-model="isCheckAll" slot="ischeck"/>
        <span slot="status">
          <span>已完成{{isdoTotal}}</span> / 全部{{todos.length}}
        </span>
        <button class="btn btn-danger" @click="delAllIsdoItem" slot="delItem">清除已完成任务</button>
      </todo-footer>
    </div>

  </div>
</template>

<script>
  import TodoHeader from './TodoHeader'
  import TodoContent from './TodoContent'
  import TodoFooter from './TodoFooter'
  import PubSub from 'pubsub-js'        //消息订阅/发布 可以任务组件间通过，如父子，祖先与后代，兄弟组件间等，不受限制。
  import storageUtil from '../utils/storageUtil'

	export default {
		name: "TodoIndex",
    data () {
		  return {
        //   todos: [
        //     {name: '买衣服', isdo: true},
        //     {name: '看视频', isdo: false},
        //     {name: '打电话', isdo: true},
        //   ]
        //从localStorage读取数据
        // todos: JSON.parse(window.localStorage.getItem('todos_key') || '[]')
          todos: storageUtil.loadTodos()
        }

    },
    components: {
      TodoHeader,
      TodoContent,
      TodoFooter
    },
    methods: {
      addTodo(todo){
        this.todos.unshift(todo)
      },
      delToto(index) {
        this.todos.splice(index, 1)
      },
      selectAllItem(val){
        if (val) {
          this.todos.forEach(todo => todo.isdo = true)
        }else {
          this.todos.forEach(todo => todo.isdo = false)
        }
      },
      delAllIsdoItem(){
        this.todos = this.todos.filter(todo => !todo.isdo)
      }
    },
    watch: {
		  todos: {
		    deep: true,     //开启深度监视
        // handler: function (val) {
        //   //将最新的todos值JSON字符串保存到localStorage
        //   // 这里只是客户端利用了浏览器的缓存，清除浏览器缓存，数据就不没有了
        //   window.localStorage.setItem('todos_key', JSON.stringify(val))
        //   storageUtil.saveTodos(val)
        //
        // }

        handler: storageUtil.saveTodos,
        //相当于
        // handler:   function(todos){
        //   window.localStorage.setItem(todos_key, JSON.stringify(todos))
        // }
      }
    },
    mounted() { //执行异步代码
      this.$refs.tdheader.$on('addTodo', this.addTodo)

      // 订阅消息
      PubSub.subscribe('deleteTodo', (msg, index) => {
        this.delToto(index)
      })
    },
    computed: {
      isdoTotal(){
        // 方法1：
        // let todos_filter, count
        // todos_filter = this.todos.filter(function (todo) {
        //   return todo.isdo
        // })
        // count = todos_filter.length
        // return count

        //方法2
        //reduce统计
        return this.todos.reduce((preTotal, todo) => preTotal + (todo.isdo ? 1: 0), 0)
      },
      isCheckAll: {
        get(){
          return this.isdoTotal === this.todos.length && this.todos.length > 0
        },
        set(newVal){  //newVal为当前checkbox的最新值
          this.selectAllItem(newVal)
        }
      }
    }
	}
</script>

<style scoped>
  /*app*/
  .todo-container {
    width: 600px;
    margin: 0 auto;
  }
  .todo-container .todo-wrap {
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 5px;
  }
</style>
