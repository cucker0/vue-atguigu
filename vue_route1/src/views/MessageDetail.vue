<template>
	<div class="msg-detail">
    <p>ID: {{ $route.params.id }}</p>
    <ul>
      <li>id: {{ msg.id }}</li>
      <li>title: {{ msg.title }}</li>
      <li>content: {{ msg.content }}</li>
    </ul>
  </div>
</template>

<script>
	export default {
		name: "MessageDetail",
    data () {
		  return {
		    msg: {
		      id: '',
          title: '',
          content: ''
        }
      }
    },
    mounted () {
		  setTimeout(()=>{
		    const allMsg = [
          {id: 1, title: 'message1', content: 'msg001'},
          {id: 2, title: 'message2', content: 'msg002'},
          {id: 3, title: 'message3', content: 'msg003'},
          {id: 4, title: 'message4', content: 'msg004'},
        ]
        this.msgs = allMsg
        const id = this.$route.params.id * 1    //转化成数字
        this.msg = this.msgs.find(m => {
          return m.id === id
        } )
      }, 1000)
    },
    watch: {
		  $route: function (val, oldval) {
		    // console.log(oldval)
        const id = val.params.id * 1    //转化成数字, val就是$route的最新值
        this.msg = this.msgs.find(m => {
          return m.id === id
        } )
      }
    }
	}
</script>

<style scoped>
  .msg-detail{
    border-top: #5e5e5e 1px solid;
    margin: 30px 0;
  }
</style>
