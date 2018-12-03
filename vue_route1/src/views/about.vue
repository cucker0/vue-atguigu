<template>
  <div class="about">
    <h2>About</h2>
    <p>RouterView传的数据: {{ info }}</p>
    <input type="text" v-model="msg"/>
  </div>
</template>

<script>
	export default {
		name: "about",
    data () {
		  return {
        msg: ''
      }
    },
    props: {
      info:{
        type: String
      }
    }
	}
</script>

<style scoped>
  .about {
    padding-left: 20px;
  }
</style>
