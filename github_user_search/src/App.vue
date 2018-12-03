<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
  .w {
    width: 1026px;
  }

  * {
    margin: 0 auto;
    padding: 0;
  }

  .clearfix:before, .clearfix:after {
    content: '';
    display: table;
    clear: both;
  }

  .clearfix {
    zoom: 1;
  }

  body a {
    text-decoration:none;
  }

  li{
    list-style: none;
  }

  button {
    border: 0;
    background-color:transparent
  }
</style>
