/*
* 路由器对象
* */

/* eslint-disable */

import Vue from 'vue'
import Router from 'vue-router'
/*
* 所有默认情况下所有组件的js会打包成一个js文件（以app开头命名的js文件），对于顶层入口的一些路由可能包含的组件比较多，这时候可以按路由路径拆分，给一些顶层路由设置
* 路由组件悚加载，
* */
/*import MSite from '../pages/MSite/MSite'
import Search from '../pages/Search/Search'
import Order from '../pages/Order/Order'
import Profile from '../pages/Profile/Profile'*/
/*
* 路由懒加载
* */

const MSite = () => import('../pages/MSite/MSite') // MSite为一个函数对象，只有执行此函数才会加载该路由组件，这个函数在第一次请求对应的路由路径时才会执行
const Search = () => {
  return import('../pages/Search/Search')
}
const Order = () => import('../pages/Order/Order')
const Profile = () => import('../pages/Profile/Profile')
import Login from '../components/Login/Login'
import Shop from '../pages/Shop/Shop'
import ShopGoods from '../pages/Shop/ShopGoods/ShopGoods'
import ShopRatings from '../pages/Shop/ShopRatings/ShopRatings'
import ShopInfo from '../pages/Shop/ShopInfo/ShopInfo'
import Pay from '../components/Pay/Pay'

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
      name: 'Search',
      component: Search,
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
    },
    {
      path: '/shop/:id',
      component: Shop,
      children: [
        {
          path: 'goods',
          component: ShopGoods
        },
        {
          path: 'ratings',
          component: ShopRatings
        },
        {
          path: 'info',
          component: ShopInfo
        },
        {
          path: '',
          redirect: 'goods'
        }
      ]
    },
    {
      path: '/pay',
      name: 'Pay',
      component: Pay
    }
  ]
})
