/*
* 路由器对象
* */

import Vue from 'vue'
import Router from 'vue-router'
import MSite from '../pages/MSite/MSite'
import Seaarch from '../pages/Seaarch/Seaarch'
import Order from '../pages/Order/Order'
import Profile from '../pages/Profile/Profile'
import Login from '../components/Login/Login'

// 声明使用vue-router插件
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/msite',
      name: 'MSite', // 命名路由，可以在组件中RouterLink :to={name: MSite}使用
      component: MSite,
      meta: { // 默认为空
        showFooter: true
      }
    },
    {
      path: '/search',
      name: 'Seaarch',
      component: Seaarch,
      meta: {
        showFooter: true
      }
    },
    {
      path: '/order',
      name: 'Order',
      component: Order,
      meta: {
        showFooter: true
      }
    },
    {
      path: '/profile',
      component: Profile,
      meta: {
        showFooter: true
      }
    },
    {
      path: '/',
      redirect: '/msite'
    },
    {
      path: '/login',
      component: Login
    }
  ]
})
