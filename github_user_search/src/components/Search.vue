<template>
  <div class="w header">

    <input class="search" v-model="search_key" @keyup.enter="search"/>
    <button @click="search">搜索</button>
  </div>
</template>

<script>
  import PubSub from 'pubsub-js'

	export default {
		name: "Search",
    data () {
		  return {
        search_key: '',

      }
    },
    methods: {
      search () {
        const search_key = this.search_key.trim()
        if (search_key) {
          PubSub.publish('search', search_key)
          this.search_key = ''
        }
      }
    }
	}
</script>

<style scoped>
  .header {
    /*height: 300px;*/
    background: #ddd;
    padding: 100px 0;
    text-align: center;
  }

  .search{
    width: 600px;
    height: 30px;
    padding: 0 10px;
    margin: 50px 0 0 0;
  }

  .header button{
    width: 50px;
    height: 32px;
    border: 2px deepskyblue solid;
    background: skyblue;
  }
</style>
