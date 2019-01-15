<template>
  <div>
    <div class="shopcart">
      <div class="content">
        <div class="content-left" @click="toggleShow">
          <div class="logo-wrapper">
            <div class="logo" :class="{highlight: totalCount}">
              <i class="iconfont icon-shopping_cart" :class="{highlight: totalCount}"></i>
            </div>
            <div class="num" v-if="totalCount">{{totalCount}}</div>
          </div>
          <div class="price" :class="{highlight: totalCount}">￥{{totalPrice}}</div>
          <div class="desc">另需配送费￥{{shopInfo.deliveryPrice}}元</div>
        </div>
        <div class="content-right">
          <!-- 去结算 -->
          <div class="pay" :class="payClass" @click="toPay">
            {{payText}}
          </div>
        </div>
      </div>
      <transition name="move">
        <div class="shopcart-list" v-show="listShow">
          <div class="list-header">
            <h1 class="title">购物车</h1>
            <span class="empty" @click="clearCart">清空</span>
          </div>
          <div class="list-content">
            <ul>
              <li class="food" v-for="(food, index) in cartFoods" :key="index">
                <span class="name">{{food.name}}</span>
                <div class="price"><span>￥{{food.price}}</span></div>
                <div class="cartcontrol-wrapper">
                  <CardControl :food="food"/>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </transition>

    </div>
    <!-- 遮罩层 -->
    <transition name="fade">
      <div class="list-mask" v-show="listShow" @click="toggleShow"></div>
    </transition>

  </div>
</template>

<script>
import {mapState, mapGetters} from 'vuex'
import CardControl from '../CartControl/CartControl'
import BScroll from 'better-scroll'
import { MessageBox } from 'mint-ui'

export default {
  name: 'ShopCart',
  data () {
    return {
      isShow: false // 购物清单显示状态
    }
  },
  components: {
    CardControl
  },
  methods: {
    toggleShow () { // 购物清单显示开关
      if (this.totalCount > 0) {
        this.isShow = !this.isShow
      }
    },
    setIsShow2False () {
      this.isShow = false
    },
    clearCart () { // 清空购物车
      MessageBox.confirm('确定退出吗?').then(
        action => { // 确定
          this.$store.dispatch('clearCart')
        },
        action => { // 取消

        }
      )
    },
    // 结算
    toPay () {
      const {totalPrice} = this
      const {minPrice} = this.shopInfo
      if (totalPrice >= minPrice) { // 总价是否达到起送价
        this.$router.push('/pay')
      }
    }
  },
  computed: {
    ...mapState(['shopInfo', 'cartFoods']),
    ...mapGetters(['totalCount', 'totalPrice']),
    // 是否去支付的样式
    payClass () {
      const {totalPrice} = this
      const {minPrice} = this.shopInfo
      return totalPrice >= minPrice ? 'enough' : 'not-enough'
    },
    // 支付提示文本
    payText () {
      const {totalPrice} = this
      const {minPrice} = this.shopInfo
      // console.log('totalPrice:', totalPrice, minPrice)
      if (totalPrice === 0) { // 未选择任何物品
        return `￥${minPrice}起送`
      } else if (totalPrice < minPrice) { // 总价 < 起送价
        return `还差￥${minPrice - totalPrice}起送`
      } else {
        return '结算'
      }
    },
    // 计算购物清单及遮罩层是否显示
    /* eslint-disable */
    /*listShow () {
      // totalPrice = 0时 不显示
      if (this.totalCount === 0) {
        // this.isShow = false // 报错：Unexpected side effect in "listShow" computed property，此时用下面的方式，当然也可以写一个method，然后调用这个method
        this.setIsShow2False()
        return false
      }
      // 显示购物车清单列表时，绑定BScroll滑动
      if (this.isShow) {
        this.$nextTick(() => {
          if (!this.listContentScroll) { // 确保BScroll实例为单例，
            this.listContentScroll = new BScroll('.list-content', {
              click: true
            })
          } else {
            this.listContentScroll.refresh() // 刷新流动条，重新计算内容的高度；否则出现第一次滚动不了的情况
          }
        })
      }
      return this.isShow
    }*/

    listShow: {
      get () {
        if (this.totalCount === 0) { // 购物车物品为0时，设置isShow为false
          this.isShow = false
          return false
        }
        // 显示购物车清单列表时，绑定BScroll滑动
        if (this.isShow) {
          this.$nextTick(() => {
            if (!this.listContentScroll) { // 确保listContentScroll实例为单例
              this.listContentScroll = new BScroll('.list-content', {
                click: true
              })
            } else {
              this.listContentScroll.refresh() // 重新刷新高度
            }
          })
        }
        return this.isShow
      },
      set () {
        console.log('listShow set()')
      }
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixins.styl"

  .shopcart
    position fixed
    left 0
    bottom 0
    z-index 50
    width 100%
    height 48px
    .content
      display flex
      background #141d27
      font-size 0
      color rgba(255, 255, 255, 0.4)
      .content-left
        flex 1
        .logo-wrapper
          display inline-block
          vertical-align top
          position relative
          top -10px
          margin 0 12px
          padding 6px
          width 56px
          height 56px
          box-sizing border-box
          border-radius 50%
          background #141d27
          .logo
            width 100%
            height 100%
            border-radius 50%
            text-align center
            background #2b343c
            &.highlight
              background $green
            .icon-shopping_cart
              line-height 44px
              font-size 24px
              color #80858a
              &.highlight
                color #fff
          .num
            position absolute
            top 0
            right 0
            width 24px
            height 16px
            line-height 16px
            text-align center
            border-radius 16px
            font-size 9px
            font-weight 700
            color #ffffff
            background rgb(240, 20, 20)
            box-shadow 0 4px 8px 0 rgba(0, 0, 0, 0.4)
        .price
          display inline-block
          vertical-align top
          margin-top 5px
          line-height 24px
          padding-right 12px
          box-sizing border-box
          font-size 16px
          font-weight 700
          color #fff
          &.highlight
            color #fff
        .desc
          display inline-block
          vertical-align bottom
          margin-bottom 15px
          margin-left -45px
          font-size 10px
      .content-right
        flex 0 0 105px
        width 105px
        .pay
          height 48px
          line-height 48px
          text-align center
          font-size 12px
          font-weight 700
          color #fff
          display block
          &.not-enough
            background #2b333b
          &.enough
            background #00b43c
            color #fff
    .ball-container
      .ball
        position fixed
        left 32px
        bottom 22px
        z-index 200
        transition all 0.4s cubic-bezier(0.49, -0.29, 0.75, 0.41)
        .inner
          width 16px
          height 16px
          border-radius 50%
          background $green
          transition all 0.4s linear
    .shopcart-list
      position absolute
      left 0
      top 0
      z-index -1
      width 100%
      transform translateY(-100%)
      &.move-enter-active, &.move-leave-active
        transition 0.3s
      &.move-enter, &.move-leave-to
        transform translateY(0)
      .list-header
        height 40px
        line-height 40px
        padding 0 18px
        background #f3f5f7
        border-bottom 1px solid rgba(7, 17, 27, 0.1)
        .title
          float left
          font-size 14px
          color rgb(7, 17, 27)
        .empty
          float right
          font-size 12px
          color rgb(0, 160, 220)

      .list-content
        padding 0 18px
        max-height 217px
        overflow hidden
        background #fff
        .food
          position relative
          padding 12px 0
          box-sizing border-box
          bottom-border-1px(rgba(7, 17, 27, 0.1))
          .name
            line-height 24px
            font-size 14px
            color rgb(7, 17, 27)
          .price
            position absolute
            right 90px
            bottom 12px
            line-height 24px
            font-size 14px
            font-weight 700
            color rgb(240, 20, 20)
          .cartcontrol-wrapper
            position absolute
            right 0
            bottom 6px

  .list-mask
    position fixed
    top 0
    left 0
    width 100%
    height 100%
    z-index 40
    backdrop-filter blur(10px)
    opacity 1
    background rgba(7, 17, 27, 0.6)
    &.fade-enter-active, &.fade-leave-active
      transition all 0.5s
    &.fade-enter, &.fade-leave-to
      opacity 0
      background rgba(7, 17, 27, 0)
</style>
