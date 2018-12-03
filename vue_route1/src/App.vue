<template>
  <div>
    <div class="header w">
      <h2>Vue-router 1</h2>
    </div>
    <div class="container w clearfix">
      <div class="nav">
        <router-link to="/home">Home</router-link>
        <!--<a href="/home">Home</a>-->
        <router-link to="/about">About</router-link>
      </div>

      <div class="content">
        <!-- 缓存路由 加keep-alive标签  -->
        <keep-alive>
          <RouterView :info="info"></RouterView>
        </keep-alive>

      </div>
    </div>
  </div>

</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      info: '一丢丢... ...'
    }
  }
}
</script>

<style>
  *{
    margin: 0;
    padding: 0;
  }

  li {
    list-style: none;
  }

  a {
    text-decoration: none;
  }

  .w{
    width: 90%;
    margin: 0 auto;
  }

  .header {
    padding: 50px 0;
    background: #ccc;
  }

  .header h2{
    text-align: center;
  }

  .clearfix:before, .clearfix:after {
    content: '';
    display: table;
    clear: both;
  }

  .clearfix {
    zoom: 1;
  }

  .container {
    margin-top: 20px;
  }

  .container .nav {
    width: 20%;
    float: left;
    text-align: center;
  }

  .container .content {
    width: 80%;
    float: left;
  }

  .container .nav a {
    display: block;
    height: 30px;
    border: #ccc 1px solid;
    padding: 5px 10px;
    margin: 0 0 10px 0;
    font: 18px/30px "微软雅黑";
  }

  .router-link-active, a:active{
    color: royalblue;
    background: #ccc;
  }


</style>
