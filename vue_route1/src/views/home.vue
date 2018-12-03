<template>
	<div class="home">
    <h2>Home</h2>
    <div class="content-nav">
        <RouterLink to="/home/news">News</RouterLink>
        <RouterLink to="/home/message">Message</RouterLink>

    </div>

    <div>
      <RouterView/>
    </div>
  </div>
</template>

<script>
	export default {
		name: "home"
	}
</script>

<style scoped>
  .home {
    padding-left: 20px;
  }

  .content-nav {
    margin: 30px 0;
    border-bottom: #5e5e5e 1px solid;
  }

  .content-nav a {
    margin-right: 50px;
  }

</style>
