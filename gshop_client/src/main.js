/*
* 入口JS
* */

import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import { Button } from 'mint-ui'
import './mock/mockServer' // 引入mockServer

Vue.component(Button.name, Button) // 注册全局的 <mt-button> 组件标签

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App),
  router, // 添加路由，每个组件中多一些router相关的标签：RouterView, RouterLink, RouterKeepalive
  store
})
