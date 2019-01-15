<template>
  <div class="star" :class="'star-' + size">
    <span class="star-item" v-for="(sc, index) in startClassArr" :key="index" :class="sc"></span>
  </div>
</template>

<script>
// 评分星星图标class名常量
const CLASS_ON = 'on'
const CLASS_HALF = 'half'
const CLASS_OFF = 'off'

export default {
/*
*  评分值星图组件
* */
  name: 'Star',
  props: {
    score: {
      type: Number,
      default: 5
    },
    size: {
      type: Number,
      default: 24
    }
  },
  computed: {
    startClassArr () {
      /*
      * 评分星图标class数组
      * score：评分
      * 规则：共5颗星，小于0.5分显示灰色星，大于= 0.5 显示半颗亮星
      * classArr举例：['on', 'on', 'on', 'half', 'off']
      * return: classArr
      * */
      const classArr = []
      const {score} = this // 相关于 score = this.score
      const scoreInteger = Math.floor(score) // 取出得分整数部分，也就是要亮星的个数
      // 生成n个CLASS_ON，这里的n >= 0，下面的n也相同
      for (let i = 0; i < scoreInteger; i++) {
        classArr.push(CLASS_ON)
      }
      // 生成1个或0个CLASS_HALF
      if (score - scoreInteger >= 0.5) {
        classArr.push(CLASS_HALF)
      }
      // 生成n个CLASS_OFF
      while (classArr.length < 5) {
        classArr.push(CLASS_OFF)
      }
      return classArr
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixins.styl"
  .star //2x图 3x图
    float left
    font-size 0
    .star-item
      display inline-block
      background-repeat no-repeat
    &.star-48
      .star-item
        width 20px
        height 20px
        margin-right 22px
        background-size 20px 20px
        &:last-child
          margin-right: 0
        &.on
          bg-image('./images/stars/star48_on')
        &.half
          bg-image('./images/stars/star48_half')
        &.off
          bg-image('./images/stars/star48_off')
    &.star-36
      .star-item
        width 15px
        height 15px
        margin-right 6px
        background-size 15px 15px
        &:last-child
          margin-right 0
        &.on
          bg-image('./images/stars/star36_on')
        &.half
          bg-image('./images/stars/star36_half')
        &.off
          bg-image('./images/stars/star36_off')
    &.star-24
      .star-item
        width 10px
        height 10px
        margin-right 3px
        background-size 10px 10px
        &:last-child
          margin-right 0
        &.on
          bg-image('./images/stars/star24_on')
        &.half
          bg-image('./images/stars/star24_half')
        &.off
          bg-image('./images/stars/star24_off')
</style>
