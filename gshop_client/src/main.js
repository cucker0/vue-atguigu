/*
* 入口JS
* */

import Vue from 'vue'
import App from './App'
import router from './router'

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App),
  router // 添加路由，每个组件中多一些router相关的标签：RouterView, RouterLink, RouterKeepalive
})
