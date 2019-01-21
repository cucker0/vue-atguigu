<template>
	<div class="user-center">
    <HeaderTop title="用户信息">
      <nav class="back-nav" slot="left">
        <a class="back" @click="$router.replace('/msite')">
          <i class="iconfont icon-arrow_left"></i>
        </a>
      </nav>
    </HeaderTop>
    <div class="userinfo">
      <div v-if="userinfo">
        <span>用户ID:</span>
        <span>{{userinfo._id}}</span>
      </div>
      <div v-if="userinfo.name">
        <span>用户名</span>
        <span>{{userinfo.name}}</span>
      </div>
      <div v-if="userinfo.phone">
        <span>手机</span>
        <span>{{userinfo.phone}}</span>
      </div>

    </div>
  </div>
</template>

<script>
import HeaderTop from '../HeaderTop/HeaderTop'
import {mapState} from 'vuex'

export default {
  name: 'UserInfo',
  components: {
    HeaderTop
  },
  computed: {
    ...mapState(['userinfo'])
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixins.styl"
  .user-center
    width 100%
    height 100%
    overflow hidden
    .userinfo
      margin-top 50px
      div
        height 25px
        margin 4px 10px
    .back-nav //我的
      width 100%
      overflow hidden
      .back
        position: absolute
        top: 10px
        left: 0
        .icon-arrow_left
          display: block
          padding: 5px
          font-size: 20px
          color: #fff
</style>
