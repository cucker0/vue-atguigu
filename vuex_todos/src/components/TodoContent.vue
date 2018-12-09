<template>
  <ul class="todo-main">
    <TodoListItem v-for="(todo, index) in todos" :key="index" :todo="todo" :index="index"/>
  </ul>
</template>

<script>
  import TodoListItem from './TodoListItem'
  import {mapState} from 'vuex'
  import storageUtil from '../utils/storageUtil'

	export default {
		name: "TodoContent",
    data () {
		  return {
      }
    },
    components: {
      TodoListItem
    },
    computed: {
      ...mapState(['todos'])    //  或{todos: 'todos'}
    },
    watch: {
      todos: {
        deep: true,
        handler: storageUtil.saveTodos
      }
    }
	}
</script>

<style scoped>
  /*main*/
  .todo-main {
    margin-left: 0px;
    border: 1px solid #ddd;
    border-radius: 2px;
    padding: 0px;
  }

  .todo-empty {
    height: 40px;
    line-height: 40px;
    border: 1px solid #ddd;
    border-radius: 2px;
    padding-left: 5px;
    margin-top: 10px;
  }


</style>
