<template>
  <div id="app">
    <RouterView/>
    <FooterGuide v-if="$route.meta.showFooter"/> <!-- 根据当前路由$route.meta里定义的showFooter值来判断是否显示 -->
  </div>
</template>

<script>
import FooterGuide from './components/FooterGuide/FooterGuide'
import {mapActions} from 'vuex'
export default {
  name: 'App',
  components: {
    FooterGuide
  },
  mounted () {
    // this.$store.dispatch('getAddress') // 使用macActionsv跟这种都可以
    this.getAddress()
    // this.$store.dispatch('getShops')
    this.getUserinfo() // 根据cookie信息获取用户信息
  },
  methods: {
    ...mapActions(['getAddress', 'getUserinfo'])
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  #app
    width 100%
    height 100%
    background #f5f5f5
</style>
