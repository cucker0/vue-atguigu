<template>
  <div>
    <div v-if="!repo_name">Loading ...</div>
    <div v-else>
      最受欢迎的项目：<a :href="repo_url" target="_blank">{{ repo_name }}</a>
    </div>
  </div>

</template>

<script>
	export default {
		name: "VueResource",
    data () {
		  return {
        repo_name: '',
        repo_url: ''
      }
    },
    mounted() {
		  const url = 'https://api.github.com/search/repositories?q=v&sort=stars'
      this.$http.get(url).then(
        response => {
          //请求成功，获取body数据
          // const ret = response.body      //这个获取数据也可以
          const ret = response.data
          // console.log(response.status)    //获取状态码
          this.repo_name = ret.items[0].name
          this.repo_url = ret.items[0].owner.html_url

        },
        reponse => {
          // error callback
          alert('请求失败')
        }
      )
    }
	}
</script>

<style scoped>

</style>
