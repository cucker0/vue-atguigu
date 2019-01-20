<template>
  <section class="search">
    <HeaderTop title="搜索"></HeaderTop>
    <form class="search_form" @click.prevent="shopsSearch">
      <input type="search" placeholder="请输入商家名称" class="search_input" v-model="keyword">
      <input type="submit" class="search_submit">
    </form>
    <div class="list" v-show="!noSearchShops" ref="shoplist">
      <ul class="list_container">
        <!--<router-link :to="{path:'/shop', query:{id: item.id}}" tag="li" v-for="item in searchShops" :key="item.id" class="list_li">-->
        <router-link class="list_li" :to="{path: '/shop/' + shop.id}" tag="li" v-for="(shop, index) in searchShops" :key="index">
          <section class="item_left">
            <img class="restaurant_img" :src="imageBasicUrl + shop.image_path">
          </section>
          <section class="item_right">
            <div class="item_right_text">
              <p>
                <span>{{shop.name}}</span>
              </p>
              <p>月售 {{shop.recent_order_num}} 单</p>
              <p>{{shop.float_minimum_order_amount}}元起送 / 距离{{shop.distance}}公里</p>
            </div>
          </section>
        </router-link>
      </ul>
    </div>
    <div class="search_none" v-if="noSearchShops">
      <span class="note">
        很抱歉！无搜索结果
      </span>
    </div>
  </section>
</template>

<script>
import HeaderTop from '../../components/HeaderTop/HeaderTop'
import {mapState} from 'vuex'
import BScroll from 'better-scroll'

export default {
  name: 'Search',
  data () {
    return {
      keyword: '', // 搜索商家信息关键字,
      imageBasicUrl: 'http://cangdu.org:8001/img/', // 图片基础URL
      noSearchShops: false // 是否显示搜索商家信息结果为空的提示信息， false：不提示 true:提示
    }
  },
  components: {
    HeaderTop
  },
  computed: {
    ...mapState(['searchShops'])
  },
  methods: {
    // 搜索商家信息
    shopsSearch () {
      this.noSearchShops = false
      const keyword = this.keyword.trim()
      if (keyword) {
        this.$store.dispatch('getSearchShops', {keyword, callback: this.setNoSearchShops})
        // 如果这里不用回调函数去设置 noSearchShops 值，也可以用watch方法设置noSearchShops值
      }
      this.shopListScroll.refresh() // 重新计算 better-scroll高度
    },
    // 设置noSearchShops
    setNoSearchShops () {
      if (this.searchShops.length) {
        this.noSearchShops = false
      } else {
        this.noSearchShops = true
      }
    }
  },
  mounted () {
    // eslint-disable-next-line
    this.shopListScroll = new BScroll(this.$refs.shoplist, {
      click: true
    })
  },
  watch: {
    // 监视searchShops改变
    /* eslint-disable */
    /*searchShops (val) {
		  if (val.length) {
			this.noSearchShops = false
		  } else {
			this.noSearchShops = true
		  }
		}*/
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixins.styl"
  .search // 搜索
    width 100%
    height 100%
    overflow hidden
    .search_form
      clearFix()
      margin-top 45px
      background-color #fff
      padding 12px 8px
      input
        height 35px
        padding 0 4px
        border-radius 2px
        font-weight bold
        outline none
        &.search_input
          float left
          width 79%
          border 4px solid #f2f2f2
          font-size 14px
          color #333
          background-color #f2f2f2
        &.search_submit
          float right
          width 18%
          border 4px solid #02a774
          font-size 16px
          color #fff
          background-color #02a774

    .list
      position: absolute
      top: 106px
      bottom: 46px
      width: 100%
      overflow: hidden
      .list_container
        background-color: #fff;
        .list_li
          display: flex;
          justify-content: center;
          padding: 10px
          border-bottom: 1px solid $bc;
          .item_left
            margin-right: 10px
            .restaurant_img
              width 50px
              height 50px
              display block
          .item_right
            font-size 12px
            flex 1
            .item_right_text
              p
                line-height 12px
                margin-bottom 6px
                &:last-child
                  margin-bottom 0
    .search_none
      margin: 0 auto
      height: 50px
      color: #333
      background-color: #fff
      text-align: center
      margin-top: 0.125rem
      .note
        line-height: 50px
</style>
