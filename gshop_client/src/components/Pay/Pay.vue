<template>
  <div class="pay">
    <HeaderTop title="结帐">
      <nav class="back-nav" slot="left">
        <a class="back" @click="$router.replace('/msite')">
          <i class="iconfont icon-arrow_left"></i>
        </a>
      </nav>
    </HeaderTop>

  </div>
</template>

<script>
import HeaderTop from '../../components/HeaderTop/HeaderTop'

export default {
  name: 'Pay',
  components: {
    HeaderTop
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixins.styl"
  .back-nav //我的
    margin 0
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
