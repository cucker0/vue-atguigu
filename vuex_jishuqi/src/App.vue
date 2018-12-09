<template>
  <div>
    <div class="nav">
      <RouterLink to="/v1">版本1</RouterLink>
      <RouterLink to="/v2">版本2</RouterLink>
    </div>
    <div id="app">
      <router-view/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>

</style>
