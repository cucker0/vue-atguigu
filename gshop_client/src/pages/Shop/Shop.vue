<template>
  <div>
    <ShopHeader></ShopHeader>
    <div class="tab">
      <div class="tab-item">
        <!-- route使用replace模式，不是默认的push模式 -->
        <router-link :to="`/shop/${$route.params.id}/goods`" replace>点餐</router-link>
      </div>
      <div class="tab-item">
        <router-link :to="`/shop/${$route.params.id}/ratings`" replace>评价</router-link>
      </div>
      <div class="tab-item">
        <router-link :to="`/shop/${$route.params.id}/info`">商家</router-link>
      </div>

    </div>组件路由组件对象
    <!--  -->
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
import ShopHeader from '../../components/ShopHeader/ShopHeader'
// import ShopGoods from './ShopGoods/ShopGoods'
// import ShopRatings from './ShopRatings/ShopRatings'
// import ShopInfo from './ShopInfo/ShopInfo'

export default {
  name: 'Shop',
  components: {
    ShopHeader
    // ShopGoods,
    // ShopRatings,
    // ShopInfo
  },
  mounted () {
    this.$store.dispatch('getShopInfo', {shopId: this.$route.params.id})
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixins.styl"
  .tab
    height 40px
    line-height 40px
    background #fff
    bottom-border-1px(rgba(7, 17, 27, 0.1))
    .tab-item
      float left
      width: 33.33333%
      text-align center
      font-size 14px
      color rgb(77, 85, 93)
      a
        display block
        position relative
        &.router-link-active
          color #02a774
          &::after
            content ''
            position absolute
            left 50%
            bottom 1px
            width 35px
            height 2px
            transform translateX(-50%)
            background #02a774
</style>
