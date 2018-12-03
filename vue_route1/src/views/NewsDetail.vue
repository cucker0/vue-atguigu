<template>
  <ul>
    <li>id:{{ news.id }}</li>
    <li>title:{{ news.title }}</li>
    <li>content:{{ news.content }}</li>
  </ul>
</template>

<script>
	export default {
		name: "NewsDetail",
    data () {
      return {
        news: {
          id: '',
          title: '',
          content: ''
        }
      }
    },
    mounted () {
		  setTimeout(()=>{
		    const id = this.$route.query.id * 1
        this.allNews = [
          {id:1, title: 'news001', content: 'news001 content'},
          {id:2, title: 'news002', content: 'news002 content'},
          {id:3, title: 'news003', content: 'news003 content'},
        ]
        this.news = this.allNews.find( (n)=>{
          return n.id === id
        } )
      }, 1000)
    },
    watch: {
      $route: function (val) {
        const id = val.query.id * 1
        this.news = this.allNews.find( (n)=>{
          return n.id === id
        } )
      }
    }
	}
</script>

<style scoped>

</style>
