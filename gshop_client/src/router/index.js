/*
* 路由器对象
* */

import Vue from 'vue'
import Router from 'vue-router'
import MSite from '../pages/MSite/MSite'
import Seaarch from '../pages/Seaarch/Seaarch'
import Order from '../pages/Order/Order'
import Profile from '../pages/Profile/Profile'

// 声明使用vue-router插件
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/msite',
      component: MSite
    },
    {
      path: '/search',
      component: Seaarch
    },
    {
      path: '/order',
      component: Order
    },
    {
      path: '/profile',
      component: Profile
    },
    {
      path: '/',
      redirect: '/msite'
    }
  ]
})
