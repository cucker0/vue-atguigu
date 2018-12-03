<template>
  <div>
    <p class="msg">{{msg}}</p>
  </div>
</template>

<script>
export default{
  data () {
    return {
      msg: 'hehe vue'
    }
  }
}
</script>

<style scoped>
  .msg{
    color: skyblue;
  }
</style>
