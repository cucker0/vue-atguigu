<template>
  <div class="main w clearfix">
    <h2 v-if="firts_status">请输入要搜索的用户名</h2>
    <h2 v-if="load_status">Loading ...</h2>
    <h2 v-if="error_msg">{{error_msg }}</h2>
    <div class="users">
      <div v-for="(user, index) in users" :key="index">
        <a  target="_blank" :href="user.url"><img :src="user.avatar_url"><p>{{ user.name }}</p></a>
      </div>
    </div>

  </div>
</template>

<script>
  import PubSub from 'pubsub-js'
  import axios from 'axios'

	export default {
    data () {
      return {
        firts_status: true,
        load_status: false,
        error_msg: '',
        name: "UserMain",
        users: null,    //数据结构： [ {name: '', url:'', avatar_url:''} ],
      }
    },
    mounted () {
      PubSub.subscribe('search', (msg, search_key)=>{
        const url = "https://api.github.com/search/users?q=aa"
        //更新状态
        this.error_msg = ''
        this.users = null
        this.firts_status = false
        this.load_status = true

        //发起请求
        axios.get(url).then(
          //请求成功
          rep =>{
            const ret = rep.data
            const users = ret.items.map((item) => ({
              name: item.login,
              url: item.html_url,
              avatar_url: item.avatar_url
            })
            )
            //更新状态
            this.load_status =false
            this.users = users
          }
        ).catch( error =>{
          //请求出错
          this.error_msg = '请求出错'
          this.load_status = false
          }
      )
      })
    }
	}
</script>

<style scoped>
 .main .users div{
   width: 330px;
   height: 300px;
   /*background: #bfa;*/
   float: left;
   border: 1px #5bc0de solid;
   margin: 5px;
   text-align: center;
 }

.users a{
  display: inline-block;
  margin-top: 100px;
}

 .users a img{
   width: 100px;
 }


</style>
