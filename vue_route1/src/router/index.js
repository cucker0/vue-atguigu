import Vue from 'vue'
import Router from 'vue-router'
import Home from '../views/home'
import About from '../views/about'
import News from '../views/News'
import Message from '../views/Message'
import MessageDetail from '../views/MessageDetail'
import NewsDetail from '../views/NewsDetail'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      component: Home,
      children: [
        {
          path: 'news',
          component: News,
          children: [
            {
              path: 'detail',
              component: NewsDetail
            }
          ]
        },
        {
          path: '/home/message',
          component: Message,
          children: [
            {
              path: '/home/message/detail/:id',       //:点位符号，路由传参数两种形式：params、query
              //{"_custom":{"type":"router","abstract":true,"value":{"path":"/home/news/detail","query":{"id":"1"},"params":{},"fullPath":"/home/news/detail?id=1","meta":{}}}}
              component: MessageDetail
            }
          ]
        },
        {
          path: '',
          redirect: '/home/news'
        }
      ]
    },
    {
      path: '/about',
      component: About
    }
  ]
})
