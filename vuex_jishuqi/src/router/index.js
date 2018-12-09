import Vue from 'vue'
import Router from 'vue-router'
import Jishuqi from '../components/Jishuqi'
import Jishuqi_v2 from '../components/Jishuqi_v2'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/v1',
      name: 'Jishuqi',
      component: Jishuqi
    },
    {
      path: '/v2',
      name: 'Jishuqi_v2',
      component: Jishuqi_v2
    },
    {
      path: '/',
      redirect: '/v1'
    }
  ]
})
