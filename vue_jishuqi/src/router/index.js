import Vue from 'vue'
import Router from 'vue-router'
import Jishuqi from '../components/Jishuqi'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Jishuqi',
      component: Jishuqi
    }
  ]
})
