<template>
  <div>
    <Search/>
    <UserMain/>
  </div>

</template>

<script>
  import Search from './Search'
  import UserMain from './UserMain'

	export default {
		name: "Index",
    components: {
      Search,
      UserMain
    }
	}
</script>

<style scoped>

</style>
