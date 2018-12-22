<template>
  <div class="msite">
    <HeaderTop :title="address.name">
      <span class="header_search" slot="left">
        <i class="iconfont icon-sousuo"></i>
      </span>

      <span class="header_login" slot="right">
        <span class="header_login_text">登录|注册</span>
      </span>
    </HeaderTop>
    <!--首页导航-->
    <nav class="msite_nav">
      <div class="swiper-container">
        <div class="swiper-wrapper">
          <div class="swiper-slide" v-for="(foodCategorys, index) in foodCategorysArr" :key="index">
            <a href="javascript:" class="link_to_food" v-for="(foodCategory, index) in foodCategorys" :key="index">
              <div class="food_container">
                <img :src="foodImageBasicUrl + foodCategory.image_url">
              </div>
              <span>{{foodCategory.title}}</span>
            </a>
          </div>
        </div>
        <!-- Add Pagination 分页器-->
        <div class="swiper-pagination"></div>

      </div>
    </nav>
    <!--首页附近商家-->
    <div class="msite_shop_list">
      <div class="shop_header">
        <i class="iconfont icon-xuanxiang"></i>
        <span class="shop_header_title">附近商家</span>
      </div>
      <ShopList/>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import Swiper from 'swiper'
import 'swiper/dist/css/swiper.min.css'

import HeaderTop from '../../components/HeaderTop/HeaderTop'
import ShopList from '../../components/ShopList/ShopList'

export default {
  name: 'MSite',
  components: {
    HeaderTop, // 组件映射成标签, template中就可以使用这些标签
    ShopList
  },
  data () {
    return {
      foodImageBasicUrl: 'https://fuss10.elemecdn.com'
    }
  },
  computed: {
    ...mapState(['address', 'foodCategorys']), // state中的address
    foodCategorysArr () {
      /*
      根据 foodCategorys(一维数组)生成一个符合条件的二维数组（小数组里最多8个元素）,以符合轮播图的排版要求
      return 返回符合条件的二维数组
      */
      const {foodCategorys} = this
      const arr = [] // 定义外层数组
      let minArr = [] // 定义里面的小数组
      foodCategorys.forEach(c => {
        // 判断minArr长度是否等于8, =8进minArr重置为空的[]
        if (minArr.length === 8) {
          minArr = []
        }
        // minArr为空时追加到arr数组里
        if (minArr.length === 0) {
          arr.push(minArr)
        }
        minArr.push(c)
      })
      // 返回arr
      return arr
    }
  },
  mounted () {
    // 获取食品分类列表
    this.$store.dispatch('getFootCategorys')
    // 创建Swiper实例
    /* eslint-disable no-new */
    new Swiper('.swiper-container', {
      loop: true, // 循环模式选项
      // 如果需要分页器
      pagination: {
        el: '.swiper-pagination'
      }
    })
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixins.styl"
  .msite  //首页
    width 100%

    .msite_nav
      bottom-border-1px(#e4e4e4)
      margin-top 45px
      height 200px
      background #fff
      .swiper-container
        width 100%
        height 100%
        .swiper-wrapper
          width 100%
          height 100%
          .swiper-slide
            display flex
            justify-content center
            align-items flex-start
            flex-wrap wrap
            .link_to_food
              width 25%
              .food_container
                display block
                width 100%
                text-align center
                padding-bottom 10px
                font-size 0
                img
                  display inline-block
                  width 50px
                  height 50px
              span
                display block
                width 100%
                text-align center
                font-size 13px
                color #666
        .swiper-pagination
          >span.swiper-pagination-bullet-active
            background #02a774
    .msite_shop_list
      top-border-1px(#e4e4e4)
      margin-top 10px
      background #fff
      .shop_header
        padding 10px 10px 0
        .shop_icon
          margin-left 5px
          color #999
        .shop_header_title
          color #999
          font-size 14px
          line-height 20px

</style>
