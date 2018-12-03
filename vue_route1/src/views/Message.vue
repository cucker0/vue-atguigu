<template>
  <div>
    <ul>
      <li v-for="(msg, index) in msgs" :key="msg.id">
        <!--<a :href="msg.url">{{ msg.title }}</a>-->
        <RouterLink :to="`/home/message/detail/${msg.id}`">{{ msg.title }}</RouterLink>
        <button @click="pushShow(msg.id)">push查看</button>
        <button @click="replaceShow(msg.id)">replace查看</button>
      </li>
    </ul>
    <button @click="back">back返回</button>
    <button @click="go">前进</button>

    <div class="msg-content">
      <RouterView/>
    </div>
  </div>

</template>

<script>
	export default {
		name: "Message",
    data () {
		  return {
		    msgs: ''
      }
    },
    mounted (){
		  setTimeout (()=>{
		    const m = [
          {id: 1, title: 'message1', url: 'http://msg.baidu.com/id=1'},
          {id: 2, title: 'message2', url: 'http://msg.baidu.com/id=2'},
          {id: 3, title: 'message3', url: 'http://msg.baidu.com/id=3'},
          {id: 4, title: 'message4', url: 'http://msg.baidu.com/id=4'},
        ]
        this.msgs = m
      }, 1000)
    },
    methods: {
		  pushShow (id) {
		    this.$router.push(`/home/message/detail/${id}`)     //相当于点击路由链接（可以返回到当前路由界面）
      },
      replaceShow (id) {
        this.$router.replace(`/home/message/detail/${id}`)    //用新路由替换当前路由（不可以返回到当前路由界面）
      },
      back () {
		    this.$router.back()     // 返回上一个记录的路由
      },
      go () {
		    this.$router.go(1)      // 前进,  -1表示返回
      }
    }
	}
</script>

<style scoped>

</style>
