<template>
  <div class="todo-footer">
    <label>
      <!--<input type="checkbox" v-model="isCheckAll"/>-->
      <slot name="ischeck"></slot>
    </label>
    <!--<span>-->
      <!--<span>已完成{{isdoTotal}}</span> / 全部{{todos.length}}-->
    <!--</span>-->
    <slot name="status"></slot>
    <!--<button class="btn btn-danger" @click="delAllIsdoItem">清除已完成任务</button>-->
    <slot name="delItem"></slot>
  </div>
</template>

<script>
	export default {
		name: "TodoFooter",
    props: {
      todos: {
        type: Array
      },
      selectAllItem: Function,
      delAllIsdoItem: Function
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
  /*footer*/
  .todo-footer {
    height: 40px;
    line-height: 40px;
    padding-left: 6px;
    margin-top: 5px;
  }

  .todo-footer label {
    display: inline-block;
    margin-right: 20px;
    cursor: pointer;
  }

  .todo-footer label input {
    position: relative;
    top: -1px;
    vertical-align: middle;
    margin-right: 5px;
  }

  .todo-footer button {
    float: right;
    margin-top: 5px;
  }

</style>
