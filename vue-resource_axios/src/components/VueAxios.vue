<template>
  <div>
    <div v-if="!repo_name">Loading ...</div>
    <div v-else>
      最受欢迎的项目：<a :href="repo_url" target="_blank">{{ repo_name }}</a>
    </div>
  </div>
</template>

<script>
  // import axios from 'axios'      //也可以在组件中单独引入 axios
	export default {
		name: "VueAxios",
    data () {
      return {
        repo_name: '',
        repo_url: ''
      }
    },
    mounted () {
		  const url = 'https://api.github.com/search/repositories?q=vue&sort=stars'
      this.$axios.get(url).then(
        rep => {
          const ret = rep.data
          this.repo_name = ret.items[0].name
          this.repo_url = ret.items[0].owner.html_url
        },
        rep =>{
          alert('请求出错了。。。')
        }
      )

      // this.$axios.get(url).then(
      //   rep => {
      //     const ret = rep.data
      //     this.repo_name = ret.items[0].name
      //     this.repo_url = ret.items[0].owner.html_url
      //   }
      // ).catch(      //也可以用 catch 来设置error 回调函数
      //   alert('catch:请求错误')
      // )
    }
	}
</script>

<style scoped>

</style>
