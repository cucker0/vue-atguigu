<template>
	<div id="app">
    <header class="site-header jumbotron">
      <div class="container">
        <div class="row">
          <div class="col-xs-12">
            <h1>请发表对Vue的评论</h1>
          </div>
        </div>
      </div>
    </header>

    <div class="container">
      <Add :addComment="addComment"/>
      <List v-bind:comments="comments" :delComment="delComment"/>
    </div>
  </div>
</template>

<script>
  import Add from '../components/Add'
  import List from'../components/List'
	export default {
		name: "CommentPage",
    data () {
		  return {
        comments: [
          { name: 'Bob', content: 'Vue还不错'},
          { name: 'Jack', content: '我喜欢Vue'},
          { name: 'Dany', content: 'hehe'}
        ]
      }
    },
    methods: {
		  addComment(comment){
        //添加评论
        this.comments.unshift(comment)
      },
      delComment(index){
		    //删除评论
        this.comments.splice(index, 1)
      }
    },
    components: {
      Add,
      List
    }
	}
</script>

<style scoped>
</style>
