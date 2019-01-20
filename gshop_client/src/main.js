/*
* 入口JS
* */

import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import { Button } from 'mint-ui'
import './mock/mockServer' // 引入mockServer
import VueLazyload from 'vue-lazyload'
import loading from './common/images/loading.gif'
import error from './common/images/error.jpg'
import './filters' // 引入自定义过滤器

Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: error,
  loading: loading,
  attempt: 1
})

Vue.component(Button.name, Button) // 注册全局的 <mt-button> 组件标签

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App),
  router, // 添加路由，每个组件中多一些router相关的标签：RouterView, RouterLink, RouterKeepalive
  store
})
