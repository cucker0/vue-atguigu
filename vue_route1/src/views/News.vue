<template>
  <div>
    <ul>
      <li v-for="(news, index) in newsArr" :key="index">
        <!--<a :href="news.url">{{ news.title }}</a>-->
        <router-link :to="`/home/news/detail?id=${news.id}`" exact>{{ news.title }}</router-link>
      </li>
    </ul>

    <div class="news-detail">
      <RouterView/>
    </div>
  </div>

</template>

<script>
	export default {
		name: "News",
    data () {
		  return {
		    newsArr: [
          {id:1, title: 'news001', url: 'http://news.baidu.com/?id=001'},
          {id:2, title: 'news002', url: 'http://news.baidu.com/?id=002'},
          {id:3, title: 'news003', url: 'http://news.baidu.com/?id=003'},
        ]
      }
    }
	}
</script>

<style scoped>
  .news-detail {
    margin: 30px 0;
  }
</style>
