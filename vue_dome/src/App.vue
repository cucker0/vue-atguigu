<template>
  <div id="app">
    <img class="logo" src="./assets/logo.png" />
    <HelloVue />
  </div>

</template>

<script>
import HelloVue from './components/HelloVue'

export default{
  data () {
    return {

    }
  },
  components: { HelloVue }
}
</script>

<style>
  .logo{
    width: 100px;
    height: 100px;
  }
</style>
