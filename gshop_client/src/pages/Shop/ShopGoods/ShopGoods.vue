<template>
  <div>
    <div class="goods">
      <div class="menu-wrapper" ref="menuWrapper">
        <ul>
          <!-- current -->
          <li class="menu-item" v-for="(good, index) in goods" :key="index" :class="{current: index === currentIndex2}"
              @click="clickMenuItem(index)">
            <span class="text bottom-border-1px">
              <img class="icon" :src="good.icon" v-if="good.icon">
              {{good.name}}
            </span>
          </li>
        </ul>
      </div>

      <div class="foods-wrapper" ref="foodsWrapper">
        <ul ref="foodsUI">
          <li class="food-list-hook" v-for="(good, index) in goods" :key="index" >
            <h1 class="title">{{good.name}}</h1>
            <ul>
              <li class="food-item bottom-border-1px" v-for="(food, index) in good.foods" :key="index" @click="showFood(food)">
                <div class="icon">
                  <img width="57" height="57" :src="food.icon">
                </div>
                <div class="content">
                  <h2 class="name">{{food.name}}</h2>
                  <p class="desc">{{food.description}}</p>
                  <div class="extra">
                    <span class="count">月售 {{food.sellCount}} 份</span>
                    <span>好评率 {{food.rating}}%</span></div>
                  <div class="price">
                    <span class="now">￥{{food.price}}</span>
                    <span class="old" v-if="food.oldPrice">￥{{food.oldPrice}}</span>
                  </div>
                  <div class="cartcontrol-wrapper">
                    <CartControl :food="food"></CartControl>
                  </div>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>

    <Food :food="food" ref="food"></Food>

    <ShopCart></ShopCart>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import BScroll from 'better-scroll' // http://ustbhuangyi.github.io/better-scroll/doc/api.html
import CartControl from '../../../components/CartControl/CartControl'
import Food from '../../../components/Food/Food'
import ShopCart from '../../../components/ShopCart/ShopCart'

export default {
  name: 'ShopGoods',
  data () {
    return {
      scrollY: 0, // 右侧滑动的Y轴坐标（滑动过程中实时变化）
      tops: [], // 所有右侧分类li的top组成的数组（列表第一次显示后就不再变化）
      food: {}, // 被点击的food对象
      menuWrapperHeight: 0, // menuWrapper标签高度
      goodsTops: [], // 左侧menu-item所有li的top组成的数据
      goodsScrollY: 0 // 左侧menu-item 滑动的Y轴坐标
    }
  },
  components: {
    CartControl,
    Food,
    ShopCart
  },
  computed: {
    ...mapState(['goods']),
    // 计算得到当前分类的下标
    currentIndex () {
      // 得到条件数据
      const {scrollY, tops} = this
      // 根据条件计算生产一个结果
      const index = tops.findIndex((top, index) => {
        // scrollY >= 当前top && < 下一个top
        return scrollY >= top && scrollY < tops[index + 1]
      })

      // 返回结果
      console.log('index:', index)
      this.menuItemToScroll(index) // 左侧goods菜单若被被遮住，自动向上滚动
      return index
    },
    currentIndex2 () { // 计算得到当前分类的下标 版本2
      const {scrollY, tops} = this
      for (var i = 0; i < tops.length; i++) {
        if (scrollY >= tops[i] && scrollY < tops[i + 1]) {
          this.menuItemToScroll(i) // 左侧goods菜单若被被遮住，自动向上滚动
          return i
        }
      }
    }
  },
  mounted () {
    this.$store.dispatch('getGoods', {foodId: this.$route.params.id}) // 请求获取goods
      .then(() => { // 数据更新后执行
        console.log('test dispatch ...')
        this.$nextTick(() => { // 列表数据更新显示后执行
          this._initScroll()
          this._initTops()
          this._initGoodsTops()
        })
      })
  },
  methods: {
    // 初始化滚动条
    _initScroll () {
      // 列表显示之后创建 (pc上使用谷歌浏览器测试发现一个bug,先以pc模式打开网站，浏览器f12切换到手机设备，
      // 然后访问http://localhost:8080/#/shop/goods，发现左侧、右侧菜单都无法滑动，只有再刷新一次就可以了)
      // 如果F12 先选择手机设备模式，再打开网站正常。
      this.goodsScroll = new BScroll('.menu-wrapper', {
        click: true,
        probeType: 2
      })
      this.foodsScroll = new BScroll('.foods-wrapper', {
        click: true,
        probeType: 2 // 1:会非实时（屏幕滑动超过一定时间后）派发scroll 事件 2:会在屏幕滑动的过程中实时的派发 scroll 事件,当松开手后惯性滑动不会 3:惯性滑动中也会派发scroll事件
      })
      // 给右侧foods列表绑定scroll监听
      this.foodsScroll.on('scroll', ({x, y}) => {
        console.log(x, y)
        this.scrollY = Math.abs(y)
      })
      // 给右侧foods列表绑定scroll停止滑动监听
      this.foodsScroll.on('scrollEnd', ({x, y}) => {
        console.log('scrollEnd:', x, y)
        this.scrollY = Math.abs(y)
      })
    },
    // 初始化tops
    _initTops () {
      // 1.初始化tops
      const tops = []
      let top = 0
      tops.push(top)
      // 2.收集
      // const lis = document.getElementsByClassName('food-list-hook') // 查找食物分类li的标签,document是在整个dom中查找
      const lis = this.$refs.foodsUI.getElementsByClassName('food-list-hook') // 查找食物分类li的标签，此时lis为一个伪数组
      // Array.prototype.slice.call() // 把伪数组变成真数组
      Array.prototype.slice.call(lis).forEach(li => {
        top += li.clientHeight
        tops.push(top)
      })
      // 3.更新数据
      this.tops = tops
      console.log('tops:', tops)
    },
    // 初始化左侧goods分类列表tops
    _initGoodsTops () {
      const tops = []
      let top = 0
      const lis = this.$refs.menuWrapper.getElementsByClassName('menu-item')
      Array.prototype.slice.call(lis).forEach(li => {
        top += li.clientHeight
        tops.push(top)
      })
      this.goodsTops = tops
      console.log('goodsTops:', tops)
      // 获取 menuWrapper标签的高度
      this.menuWrapperHeight = this.$refs.menuWrapper.clientHeight
    },
    // 点击左侧goods列表，使右侧列表滑动到指定的坐标位置
    clickMenuItem (index) {
      console.log(this.tops[index])
      const scrollY = this.tops[index]
      if (this.scrollY !== scrollY) {
        this.scrollY = scrollY // 立即让点击的分类项class改变成当前分类样式
        this.foodsScroll.scrollTo(0, -scrollY, 300) // 平滑滑动右侧food列表
      }
    },
    // 显示点击的food
    showFood (food) {
      // 更新food
      this.food = food
      // 显示food组件(在父组件中调用子组件对象方法，通过refs找到子组件对象)
      this.$refs.food.toggleShow()
    },
    // 判断左侧的gooods菜单当前活动的项是否能显示，在底部不能显示时，需要向上滚动到能显示的地方。
    menuItemToScroll (index) {
      const {menuWrapperHeight, goodsTops} = this
      if (goodsTops[index] > menuWrapperHeight) { // 当前goods项被底部遮住
        const offset = goodsTops[index] - menuWrapperHeight
        this.goodsScrollY = -offset
        this.goodsScroll.scrollTo(0, -offset, 300) // 左侧goods菜单向上移动
      } else { // 左侧goods菜单最前面内容一屏能显示出来
        if (this.goodsScrollY !== 0) {
          this.goodsScroll.scrollTo(0, 0, 300) // 滚动到起始位置
          this.goodsScrollY = 0
        }
      }
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../../common/stylus/mixins.styl"
  .goods
    display: flex
    position: absolute
    top: 195px
    bottom: 46px
    width: 100%
    background: #fff;
    overflow: hidden
    .menu-wrapper
      flex: 0 0 80px
      width: 80px
      background: #f3f5f7
      .menu-item
        display: table
        height: 54px
        width: 56px
        padding: 0 12px
        line-height: 14px
        &.current
          position: relative
          z-index: 10
          margin-top: -1px
          background: #fff
          color: $green
          font-weight: 700
          .text
            border-none()
        .icon
          display: inline-block
          vertical-align: top
          width: 12px
          height: 12px
          margin-right: 2px
          background-size: 12px 12px
          background-repeat: no-repeat
        .text
          display: table-cell
          width: 56px
          vertical-align: middle
          bottom-border-1px(rgba(7, 17, 27, 0.1))
          font-size: 12px
    .foods-wrapper
      flex: 1
      .title
        padding-left: 14px
        height: 26px
        line-height: 26px
        border-left: 2px solid #d9dde1
        font-size: 12px
        color: rgb(147, 153, 159)
        background: #f3f5f7
      .food-item
        display: flex
        margin: 18px
        padding-bottom: 18px
        bottom-border-1px(rgba(7, 17, 27, 0.1))
        &:last-child
          border-none()
          margin-bottom: 0
        .icon
          flex: 0 0 57px
          margin-right: 10px
        .content
          flex: 1
          .name
            margin: 2px 0 8px 0
            height: 14px
            line-height: 14px
            font-size: 14px
            color: rgb(7, 17, 27)
          .desc, .extra
            line-height: 10px
            font-size: 10px
            color: rgb(147, 153, 159)
          .desc
            line-height: 12px
            margin-bottom: 8px
          .extra
            .count
              margin-right: 12px
          .price
            font-weight: 700
            line-height: 24px
            .now
              margin-right: 8px
              font-size: 14px
              color: rgb(240, 20, 20)
            .old
              text-decoration: line-through
              font-size: 10px
              color: rgb(147, 153, 159)
          .cartcontrol-wrapper
            position: absolute
            right: 0
            bottom: 12px
</style>
