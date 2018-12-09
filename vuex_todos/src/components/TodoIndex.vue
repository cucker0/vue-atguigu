<template>
	<div class="todo-container">
    <div class="todo-wrap">
      <TodoHeader/>
      <TodoContent/>
      <todo-footer/>
    </div>

  </div>
</template>

<script>
  import TodoHeader from './TodoHeader'
  import TodoContent from './TodoContent'
  import TodoFooter from './TodoFooter'


	export default {
		name: "TodoIndex",
    components: {
      TodoHeader,
      TodoContent,
      TodoFooter
    },

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
